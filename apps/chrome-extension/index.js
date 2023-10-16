const todaysDate = document.querySelector("#todays-date")
const todaysVerse = document.querySelector("#bible-verse")
const todaysBibleReference = document.querySelector("#bible-reference")

window.addEventListener("load", async e => {
	const currentDate = getTodaysDate()
	todaysDate.innerText = currentDate
	const { bibleVerse, bibleReference } = await getVerse()

	todaysVerse.innerText = bibleVerse
	todaysBibleReference.innerText = bibleReference
})

/**
 * Get today's date
 * @returns {string} today's date in form: Monday 16 October, 2023
 */
const getTodaysDate = () => {
	const today = new Date()
	const dateString = today.toDateString()
	return dateString
}

/**
 * @typedef {Object} verse
 * @param {string} bibleReference
 * @param {string} bibleVerse
 *
 * @returns {verse}
 */
const getVerse = async () => {
	let bibleVerse
	let bibleReference

	const currentDate = new Date()
	const day = currentDate.getDate()
	const month = currentDate.getMonth()
	const monthString = MONTHS[month]

	const dayStringIndex = `${monthString} ${day}`

	console.log({ dayStringIndex })
	await fetch("./verses.json")
		.then(res => res.json())
		.then(data => {
			const verseOfTheDay = data[dayStringIndex]?.split("-")
			bibleVerse = verseOfTheDay[0]
			bibleReference = verseOfTheDay[1]
		})
	return { bibleVerse, bibleReference }
}

const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
]