window.addEventListener("load", async e => {
	const currentDate = getTodaysDate()
	todaysDate.innerText = currentDate
	const { bibleVerse, bibleReference } = await getVerse()

	todaysVerse.innerText = bibleVerse
	todaysBibleReference.innerText = bibleReference

	await setTheme()

	displayTime()

	setInterval(() => {
		displayTime()
	}, 1000)
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
	const bibleReference = todaysBibleReference.innerText
	const bibleVerse = todaysVerse.innerText

	const hashSymbol = "%23" // url encoded value of #
	const text = `${hashSymbol}VerseOfTheDay. ${bibleVerse} - ${bibleReference} `

	window.open(
		`https://twitter.com/intent/tweet?text=${text}&via=aremu_smog`,
		"popup",
		"width=600,height=600"
	)
})

playButton.addEventListener("click", async () => {
	const bibleReference = todaysVerse.innerText
	const bibleVerse = todaysBibleReference.innerText

	const fullText = `${bibleVerse}. ${bibleReference}`
	const bibleVerseLength = bibleVerse.split(" ").length
	const bibleReferenceParts = bibleReference.split(" ")
	/*
	We assume that the last parts of the bible reference are numbers which should be treated as words an not together
	 */
	const bibleReferenceNumbers = bibleReferenceParts.at(-1).length - 1 // subtracting the colon which is not read
	const bibleReferenceLength =
		bibleReferenceNumbers + bibleReferenceParts.length // subtracting one cos of the numbers part

	const noOfWords = bibleVerseLength + bibleReferenceLength

	const averageWordsPerMinute = 190 // 180 - 220 based off the doc

	const chosenRate = 0.5

	const animationDuration = (noOfWords / averageWordsPerMinute) * 60

	chrome.tts.speak(fullText, {
		rate: chosenRate,
		// voiceName: "Moira",
		onEvent: e => {
			if (e.type === "start") {
				playButton.classList.add("play-audio")
				playButton.setAttribute("disabled", "disabled")
				playButtonLoader.style.transitionDuration = `${animationDuration.toFixed(
					1
				)}s`
				playButtonLoader.style.width = "100%"
			}
			if (e.type === "end") {
				playButton.classList.remove("play-audio")
				playButton.removeAttribute("disabled")
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

const displayTime = () => {
	const now = new Date()
	const hour = now.getHours()
	const minute = now.getMinutes()

	const hourString = `${hour}`
	const minuteString = `${minute}`

	timerHour.textContent = hourString.length < 2 ? `0${hourString}` : hourString
	timerMinute.textContent =
		minuteString.length < 2 ? `0${minuteString}` : minuteString
}
