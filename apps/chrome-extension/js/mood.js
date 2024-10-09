/**
 * Select a bible verse based on the users mood
 */

const moodSelector = document.querySelector("#mood")

moodSelector.addEventListener("change", async e => {
	const selectedMood = e.target.value
	if (selectedMood) {
		const versesForMoodPath = `./verses/moods/${selectedMood}.json`

		try {
			await fetch(versesForMoodPath)
				.then(res => res.json())
				.then(verses => {
					const noOfVerses = verses.length
					const randomIndex = Math.floor(Math.random() * noOfVerses)

					const verse = verses[randomIndex]
					const verseArray = verse.split(" - ")

					todaysVerse.innerText = verseArray[0]
					todaysBibleReference.innerText = verseArray[1]
				})
				.catch(error => {
					console.log("Unable to add verse based on mood")
				})
		} catch {
			console.log("Something went wrong")
		}
	}
})
