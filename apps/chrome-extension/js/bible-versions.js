/**
 * @typedef {Object} BibleVersion
 * @property {string} verses - Path to JSON file containing verses
 * @property {string} fullname - Fullname of the bible version
 * @property {string} abbreviation - Short form name of the bible verse e.g KJV
 *
 * /
 
/** 
 * @typedef {Object} BibleVersions
 * @property {BibleVersion} kjv
 * @property {BibleVersion} chatgpt
 */
const BIBLE_VERSIONS = {
  chatgpt: {
    verses: "./verses/chatgpt.json",
    fullname: "ChatGPT",
    abbreviation: "",
  },
  kjv: {
    verses: "./verses/kjv.json",
    fullname: "King James Version",
    abbreviation: "KJV",
  },
};
