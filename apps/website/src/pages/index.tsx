import { Geist, Geist_Mono } from "next/font/google"
import { ElevenLabsClient } from "elevenlabs"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

const client = new ElevenLabsClient({
	apiKey: "sk_b52fc65675c9fde78b82b4ee69898b2e954ca980f495e1e5",
})
const { html_snippet } = await client.audioNative.create({
	name: "verse of the day",
})
export default function Home() {
	return (
		<div
			className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}>
			{html_snippet}
		</div>
	)
}
