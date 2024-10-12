import Anthropic from "@anthropic-ai/sdk"
import fs from "node:fs"
import "dotenv/config"

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
})

/**
 *
 * @param {string} mood
 */
async function generateVersesBasedOnMood(mood) {
	const msg = await anthropic.messages.create({
		model: "claude-3-5-sonnet-20240620",
		max_tokens: 2000,
		system:
			"Generate as many bible verses as possible to encourage a user based on their mood. Return an array without explanation. Separate the verse and reference with an hyphen.",
		messages: [{ role: "user", content: [{ type: "text", text: mood }] }],
	})
	const message = msg.content[0].text

	await fs.writeFile(`./moods/${mood.toLowerCase()}.json`, message, err => {
		if (err) {
			console.error(
				`😥 Unable to store data in file. You can use the data manually.`
			)
			console.log(message)
		} else {
			console.log(`✅ Successfully created file for ${mood} mood`)
			// file written successfully
		}
	})
}

const generateBibleVerses = async () => {
	const MOODS = [
		"Happy",
		"Grateful",
		"Calm",
		"Optimistic",
		"Energized",
		"Indifferent",
		"Bored",
		"Sad",
		"Angry",
		"Anxious",
		"Irritable",
		"Lonely",
		"Frustrated",
		"Depressed",
	]

	MOODS.slice(0, 1).forEach(async mood => {
		await generateVersesBasedOnMood(mood)
	})
}

generateBibleVerses()
