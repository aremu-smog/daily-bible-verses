import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.bibleVerse}>
				This is the day that the Lord has made; let us rejoice and be glad in
				it.
			</Text>
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#222222",
		alignItems: "center",
		justifyContent: "center",
	},
	bibleVerse: {
		fontSize: 24,
		color: "#f8f8f8",
	},
})
