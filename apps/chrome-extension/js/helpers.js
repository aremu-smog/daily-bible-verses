// Anything that doesn't interact with the dom

/**
 * @param {string} theme
 */
const setCurrentTheme = (theme) => {
  chrome.storage.local.set({ theme }).then(() => {
    console.log("Theme set successfully");
  });
};

/**
 * Get the current theme from storage
 * @returns {string} theme
 */

const getCurrentTheme = async () => {
  let theme;
  await chrome.storage.local.get(["theme"]).then((result) => {
    theme = result.theme;
  });

  return theme;
};

/**
 *
 * @param {Date} date
 * @returns {number}
 */

const dayOfYear = (date) =>
  Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
/**
 * @typedef {Object} VerseOfTheDay
 * @property {string} bibleReference
 * @property {string} bibleVerse
 *
 * @returns {VerseOfTheDay}
 */
const getVerse = async () => {
  const availableBibleVersions = Object.keys(BIBLE_VERSIONS);

  const currentBibleVersion = availableBibleVersions[0];

  /**
   * @type {BibleVersion}
   */
  const selectedBibleVersion = BIBLE_VERSIONS[currentBibleVersion];

  let bibleVerse;
  let bibleReference;

  const currentDate = new Date();

  const bibleVerseIndex = dayOfYear(currentDate) - 1;
  const bibleVersionAbbreviation = selectedBibleVersion.abbreviation;

  const bibleVersionToShow = bibleVersionAbbreviation
    ? `(${bibleVersionAbbreviation})`
    : "";

  await fetch(selectedBibleVersion.verses)
    .then((res) => res.json())
    .then((data) => {
      const verseOfTheDay = data[bibleVerseIndex]?.split(" - ");
      bibleVerse = verseOfTheDay[0];
      bibleReference = `${verseOfTheDay[1]} ${bibleVersionToShow}`;
    });
  return { bibleVerse, bibleReference };
};

/**
 * Get today's date
 * @returns {string} today's date in form: Monday 16 October, 2023
 */
const getTodaysDate = () => {
  const today = new Date();
  const dateString = today.toDateString();
  return dateString;
};

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
];
