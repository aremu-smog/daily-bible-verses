const todaysDate = document.querySelector("#todays-date")
const todaysVerse = document.querySelector("#bible-verse")
const todaysBibleReference = document.querySelector("#bible-reference")

const mainWrapper = document.querySelector("body")
const themeToggleButton = document.querySelector("#theme-button")

window.addEventListener("load", async e => {
	const currentDate = getTodaysDate()
	todaysDate.innerText = currentDate
	const { bibleVerse, bibleReference } = await getVerse()

	todaysVerse.innerText = bibleVerse
	todaysBibleReference.innerText = bibleReference

	await setTheme()
})

themeToggleButton.addEventListener("click", () => {
	const isDarkMode = mainWrapper.classList.contains("dark")

	if (isDarkMode) {
		mainWrapper.classList.remove("dark")
		themeToggleButton.innerText = "Dark Mode"
		setCurrentTheme("light")
	} else {
		mainWrapper.classList.add("dark")
		themeToggleButton.innerText = "Light Mode"
		setCurrentTheme("dark")
	}
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
 * @typedef {Object} VerseOfTheDay
 * @property {string} bibleReference
 * @property {string} bibleVerse
 *
 * @returns {VerseOfTheDay}
 */
const getVerse = async () => {
	let bibleVerse
	let bibleReference

	const currentDate = new Date()
	const day = currentDate.getDate()
	const month = currentDate.getMonth()
	const monthString = MONTHS[month]

	const dayStringIndex = `${monthString} ${day}`

	/**
	 * verses.json was generated by ChatGPT
	 */
	await fetch("./verses.json")
		.then(res => res.json())
		.then(data => {
			const verseOfTheDay = data[dayStringIndex]?.split("-")
			bibleVerse = verseOfTheDay[0]
			bibleReference = verseOfTheDay[1]
		})
	return { bibleVerse, bibleReference }
}

const getCurrentTheme = async () => {
	let theme
	await chrome.storage.local.get(["theme"]).then(result => {
		theme = result.theme
	})

	return theme
}

/**
 *
 * @param {string} theme
 */
const setCurrentTheme = theme => {
	chrome.storage.local.set({ theme }).then(() => {
		console.log("Theme set successfully")
	})
}

const setTheme = async () => {
	const currentTheme = await getCurrentTheme()

	const isDarkMode = currentTheme === "dark"

	if (isDarkMode) {
		mainWrapper.classList.add("dark")
		themeToggleButton.innerText = "Light Mode"
	} else {
		mainWrapper.classList.remove("dark")
		themeToggleButton.innerText = "Dark Mode"
	}
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
