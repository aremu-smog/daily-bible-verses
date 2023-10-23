import { useCallback } from "react"
import { StatusBar } from "expo-status-bar"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useFonts } from "expo-font"

export default function App() {
	const [fontsLoaded] = useFonts({
		"System-Blank": require("./assets/fonts/FTSystemTrial-BlankRegular.otf"),
	})

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			console.log("Font loaded 🎉")
		}
	}, [fontsLoaded])

	if (!fontsLoaded) {
		return null
	}
	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			<View style={{ flex: 0.1 }} />
			<View style={{ flex: 0.7 }}>
				<Text style={styles.bibleReference}>MON OCT 23, 2023</Text>
				<Text style={styles.bibleVerse}>
					And we know that in all things God works for the good of those who
					love him, who have been called according to his purpose.
				</Text>
				<Text style={styles.bibleReference}>Romans 8:28</Text>
			</View>
			<View style={{ flex: 0.1 }}>
				<Pressable style={styles.button}>
					<Text style={styles.buttonText}>Share Verse</Text>
				</Pressable>
			</View>
			<StatusBar style='auto' />
		</View>
	)
}

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
