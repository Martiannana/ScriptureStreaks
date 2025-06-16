import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const bibleBooks = {
  genesis: 50,
  exodus: 40,
  leviticus: 27,
  numbers: 36,
  deuteronomy: 34,
  joshua: 24,
  judges: 21,
  ruth: 4,
  "1-samuel": 31,
  "2-samuel": 24,
  "1-kings": 22,
  "2-kings": 25,
  "1-chronicles": 29,
  "2-chronicles": 36,
  ezra: 10,
  nehemiah: 13,
  esther: 10,
  job: 42,
  psalms: 150,
  proverbs: 31,
  ecclesiastes: 12,
  "song-of-solomon": 8,
  isaiah: 66,
  jeremiah: 52,
  lamentations: 5,
  ezekiel: 48,
  daniel: 12,
  hosea: 14,
  joel: 3,
  amos: 9,
  obadiah: 1,
  jonah: 4,
  micah: 7,
  nahum: 3,
  habakkuk: 3,
  zephaniah: 3,
  haggai: 2,
  zechariah: 14,
  malachi: 4,
  matthew: 28,
  mark: 16,
  luke: 24,
  john: 21,
  acts: 28,
  romans: 16,
  "1-corinthians": 16,
  "2-corinthians": 13,
  galatians: 6,
  ephesians: 6,
  philippians: 4,
  colossians: 4,
  "1-thessalonians": 5,
  "2-thessalonians": 3,
  "1-timothy": 6,
  "2-timothy": 4,
  titus: 3,
  philemon: 1,
  hebrews: 13,
  james: 5,
  "1-peter": 5,
  "2-peter": 3,
  "1-john": 5,
  "2-john": 1,
  "3-john": 1,
  jude: 1,
  revelation: 22,
};

const verses = [
  {
    text: "For I know the plans I have for you...",
    reference: "Jeremiah 29:11",
  },
  {
    text: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
  },
  {
    text: "The Lord is my shepherd; I shall not want.",
    reference: "Psalms 23:1",
  },
  {
    text: "Trust in the Lord with all your heart...",
    reference: "Proverbs 3:5",
  },
  { text: "For God so loved the world...", reference: "John 3:16" },
];

const getDefaultVerse = () => {
  const randomIndex = Math.floor(Math.random() * verses.length);
  return verses[randomIndex];
};

const getRandomVerse = async () => {
  try {
    const books = Object.keys(bibleBooks);
    const book = books[Math.floor(Math.random() * books.length)];
    const maxChapter = bibleBooks[book];
    const chapter = Math.floor(Math.random() * maxChapter) + 1;

    const chapterUrl = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-kjv/books/${book}/chapters/${chapter}.json`;
    const chapterResponse = await axios.get(chapterUrl, { timeout: 5000 });

    if (!chapterResponse.data || !chapterResponse.data.data) {
      throw new Error("Invalid chapter data received");
    }

    const verses = chapterResponse.data.data;
    const versesNo = Math.max(1, Math.floor(verses.length / 2));
    const verse = Math.floor(Math.random() * versesNo) + 1;

    const verseUrl = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-kjv/books/${book}/chapters/${chapter}/verses/${verse}.json`;
    console.log(verseUrl);
    const verseResponse = await axios.get(verseUrl, { timeout: 5000 });

    if (!verseResponse.data || !verseResponse.data.text) {
      throw new Error("Invalid verse data received");
    }

    const formattedVerse = {
      text: verseResponse.data.text.trim(),
      reference: `${book
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")} ${chapter}:${verse}`,
      lastUpdated: new Date().toISOString(),
    };

    return formattedVerse;
  } catch (error) {
    console.error("Error in getRandomVerse:", error.message);
    // Use local verse as fallback
    const localVerse = getDefaultVerse();
    return {
      ...localVerse,
      lastUpdated: new Date().toISOString(),
    };
  }
};

const loadDailyVerse = async () => {
  console.log("Getting daily verse");
  try {
    const savedVerse = await AsyncStorage.getItem("dailyVerse");
    if (savedVerse) {
      const parsedVerse = JSON.parse(savedVerse);
      const lastUpdated = new Date(parsedVerse.lastUpdated);
      const now = new Date();
      console.log({ now, lastUpdated });

      if (now.getTime() - lastUpdated.getTime() >= 24 * 60 * 60 * 1000) {
        const newVerse = await getRandomVerse();
        if (newVerse) {
          await AsyncStorage.setItem("dailyVerse", JSON.stringify(newVerse));
          return newVerse;
        }
      }
      return parsedVerse;
    }

    const newVerse = await getRandomVerse();
    if (newVerse) {
      await AsyncStorage.setItem("dailyVerse", JSON.stringify(newVerse));
      return newVerse;
    }

    // If we have a saved verse but couldn't get new one, return the old one
    if (savedVerse) {
      return JSON.parse(savedVerse);
    }

    // Final fallback
    const fallbackVerse = getDefaultVerse();
    return {
      ...fallbackVerse,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error in loadDailyVerse:", error.message);
    const fallbackVerse = getDefaultVerse();
    return {
      ...fallbackVerse,
      lastUpdated: new Date().toISOString(),
    };
  }
};

export { loadDailyVerse, getRandomVerse };
