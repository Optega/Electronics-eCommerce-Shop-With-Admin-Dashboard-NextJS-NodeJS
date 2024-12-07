// helper function for converting URL category name to friendly and more readable name
// For example "smart-watches" after this function will be "smart watches"
const formatCategorySlug = (categoryTitle: string) => {
  const categoryTitleArray = categoryTitle.split("-");
  return categoryTitleArray.join(" ");
};

// helper function for converting category name to URL category name
// For example "smart watches" after this function will be "smart-watches"
const convertCategoryTitleToSlugFriendly = (categoryTitle: string) => {
  const transliteratedText = transliterate(categoryTitle);
  const categoryTitleArray = transliteratedText.split(" ");

  return categoryTitleArray.join("-").toLocaleLowerCase();
};

function transliterate(input: string): string {
  const map: { [key: string]: string } = {
    а: "a",
    б: "b",
    в: "v",
    г: "h",
    ґ: "g",
    д: "d",
    е: "e",
    є: "ye",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    ї: "yi",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ь: "",
    ю: "yu",
    я: "ya",
    А: "A",
    Б: "B",
    В: "V",
    Г: "H",
    Ґ: "G",
    Д: "D",
    Е: "E",
    Є: "Ye",
    Ж: "Zh",
    З: "Z",
    И: "Y",
    І: "I",
    Ї: "Yi",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "Kh",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Shch",
    Ь: "",
    Ю: "Yu",
    Я: "Ya",
  };

  return input
    .split("")
    .map((char) => map[char] || char)
    .join("");
}

export { formatCategorySlug, convertCategoryTitleToSlugFriendly };
