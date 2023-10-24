import { useCallback } from "react"
import { StatusBar } from "expo-status-bar"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useFonts } from "expo-font"
import verses from "./verses.json"
import Tts from "react-native-tts"

export default function App() {
	const [fontsLoaded] = useFonts({
		"System-Blank": require("./assets/fonts/FTSystemTrial-BlankRegular.otf"),
	})

	const currentDate = new Date()

	const todaysDate = currentDate.toLocaleDateString("en-us", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			console.log("Font loaded 🎉")
		}
	}, [fontsLoaded])

	if (!fontsLoaded) {
		return null
	}

	const { bibleVerse, bibleReference } = getVerse()
	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			<View style={{ flex: 0.1 }} />
			<View style={{ flex: 0.7 }}>
				<Text style={styles.bibleReference}>{todaysDate}</Text>
				<Text style={styles.bibleVerse}>{bibleVerse}</Text>
				<Text style={styles.bibleReference}>{bibleReference}</Text>
			</View>
			<View style={{ flex: 0.1 }}>
				<Pressable style={styles.button}>
					<Text style={styles.buttonText}>Share Verse</Text>
				</Pressable>
				<Pressable style={styles.button} onPress={playVerseAudio}>
					<Text style={styles.buttonText}>Listen Now</Text>
				</Pressable>
			</View>
			<StatusBar style='auto' />
		</View>
	)
}

const playVerseAudio = () => {
	Tts.speak("Hello there!")
}

const getVerse: () => {
	bibleVerse: string
	bibleReference: string
} = () => {
	let bibleVerse
	let bibleReference

	const currentDate = new Date()
	const day = currentDate.getDate()
	const month = currentDate.getMonth()
	const monthString = MONTHS[month]

	const dayStringIndex = `${monthString} ${day}` as keyof typeof verses

	const verseOfTheDay = verses[dayStringIndex]?.split("-")
	bibleVerse = verseOfTheDay[0]
	bibleReference = verseOfTheDay[1]

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

const color = {
	black: "#222222",
	white: "#f8f8f8",
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.black,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 8,
	},
	bibleVerse: {
		fontSize: 28,
		color: color.white,
		textAlign: "center",
		fontFamily: "System-Blank",
		fontWeight: "400",
		lineHeight: 36,
	},
	bibleReference: {
		fontSize: 12,
		color: color.white,
		textTransform: "uppercase",
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 4,
		borderStyle: "solid",
		borderColor: color.white,
		borderWidth: 1,
		marginVertical: 12,
		alignSelf: "center",
	},

	button: {
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderColor: color.white,
		borderRadius: 36,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontSize: 18,
		color: color.white,
		fontFamily: "System-Blank",
	},
})
