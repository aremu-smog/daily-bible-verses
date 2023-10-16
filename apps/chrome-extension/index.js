const todaysDate = document.querySelector("#todays-date")
window.addEventListener("load", e => {
	const currentDate = getTodaysDate()
	todaysDate.innerText = currentDate
})

/**
 * Get today's date
 * @returns {string} today's date in form: Monday 16 October, 2023
 */
const getTodaysDate = () => {
	const today = new Date()
	const dateString = today.toDateString()
	return dateString
}

/**
 *
 */
