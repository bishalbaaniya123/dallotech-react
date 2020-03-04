export const formatter = (word) => {
  if (!word) {
    return '';
  }
  let splitted = word.split('_');
  let formattedWord = '';
  for (let j = 0; j < splitted.length; j++) {
    formattedWord += splitted[j].charAt(0)
      .toUpperCase() + splitted[j].slice(1)
      .toLowerCase() + ' ';
  }
  formattedWord = formattedWord.slice(0, -1);

  return formattedWord;
};

export const sizeFormatted = (containerSize) => {

  if (containerSize === 'FEET_20') {
    containerSize = '20\'';
  } else if (containerSize === 'FEET_40') {
    containerSize = '40\'';
  } else if (containerSize === 'FEET_40_HQ') {
    containerSize = '40\'HQ';
  }
  return containerSize;
};
