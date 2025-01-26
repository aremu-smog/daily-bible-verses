import { ElevenLabsClient, play } from "elevenlabs"

const client = new ElevenLabsClient({
	apiKey: process.env.ELEVEN_LABS_API_KEY,
})

try {
	const audio = await client.textToSpeech.convert("21m00Tcm4TlvDq8ikWAM", {
		model_id: "eleven_multilingual_v2",
		text: "And let us not be weary in our well doing; for in due season we shall reap if we faint not.",
	})
	console.log({ audio })
	await play(audio)
} catch (e) {
	console.error({ e })
}
