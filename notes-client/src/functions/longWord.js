const longWord = (texts) => {
  let maxLength = 14;
  let wordsArr = texts.join(" ").split(/ |\n/);
  let longWord = wordsArr.find((word) => {
    return word.length > maxLength;
  });
  if (longWord) {
    return true;
  } else {
    return false;
  }
};

export default longWord;