const compareLengthValue = (string, value) => string.length <= value;

compareLengthValue('проверяемая строка', 20);
compareLengthValue('проверяемая строка', 18);
compareLengthValue('проверяемая строка', 10);

function isPalindrome(startString) {
  const normalString = startString.replaceAll(' ', '').toLowerCase();
  let reverseString = '';

  for (let i = normalString.length - 1; i >= 0; i--) {
    reverseString += normalString[i];
  }
  return normalString === reverseString;
}

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
