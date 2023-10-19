const todaysDate = document.querySelector("#todays-date")
const todaysVerse = document.querySelector("#bible-verse")
const todaysBibleReference = document.querySelector("#bible-reference")

const mainWrapper = document.querySelector("body")
const themeToggleButton = document.querySelector("#theme-button")
const tweetThisButton = document.querySelector("#tweet-button")

const playButton = document.querySelector("#play-button")
const playButtonLoader = document.querySelector(".play-audio__loader")

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

tweetThisButton.addEventListener("click", async () => {
	const { bibleReference, bibleVerse } = await getVerse()
	const text = `VerseOfTheDay. ${bibleVerse} - ${bibleReference} `

	window.open(
		`https://twitter.com/intent/tweet?text=${text}&via=aremu_smog`,
		"popup",
		"width=600,height=600"
	)
})

playButton.addEventListener("click", async () => {
	const { bibleReference, bibleVerse } = await getVerse()

	const fullText = `${bibleReference}. ${bibleVerse}`
	const noOfWords = fullText.split(" ").length

	const averageWordsPerMinute = 190 // 180 - 220 based off the doc

	const chosenRate = 0.5

	const animationDuration = (noOfWords / averageWordsPerMinute) * 60

	chrome.tts.speak(fullText, {
		rate: chosenRate,
		onEvent: e => {
			if (e.type === "start") {
				playButton.classList.add("play-audio")
				playButtonLoader.style.transitionDuration = `${animationDuration.toFixed(
					1
				)}s`
				playButtonLoader.style.width = "100%"
			}
			if (e.type === "end") {
				playButton.classList.remove("play-audio")
				playButtonLoader.style.transitionDuration = `0s`
				playButtonLoader.style.width = "0%"
			}
		},
	})
})

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
