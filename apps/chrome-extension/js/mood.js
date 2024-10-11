/**
 * Select a bible verse based on the users mood
 */

const MOOD_EMOJIS = {
	happy: "😊",
	grateful: "🙏",
	calm: "😌",
	optimistic: "🌟",
	energized: "⚡",
	indifferent: "😐",
	bored: "😒",
	sad: "😢",
	angry: "😠",
	anxious: "😰",
	irritable: "😤",
	lonely: "🕯️",
	frustrated: "😫",
	depressed: "😞",
}

moodSelector.addEventListener("change", async e => {
	const selectedMood = e.target.value
	const emojiMood = MOOD_EMOJIS[selectedMood] ?? "❤️"
	moodIcon.innerText = emojiMood
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
