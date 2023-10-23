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

function getMinutes (data) {
  const getTime = data.split(':');
  const convertHoursToMinutes = (parseInt(getTime[0], 10)) * 60;
  const minutes = parseInt(getTime[1], 10);
  return convertHoursToMinutes + minutes;
}

function meetNotWorkingDay (startWork, finishWork, meet, meetDuration) {
  const startWorkMinutes = getMinutes(startWork);
  const finishWorkMinutes = getMinutes(finishWork);
  const meetMinutes = getMinutes(meet);
  const result = finishWorkMinutes - meetMinutes;
  if (meetMinutes >= startWorkMinutes && meetMinutes < finishWorkMinutes && result >= meetDuration) {
    return true;
  }
  return false;
}

meetNotWorkingDay('8:00', '17:30', '08:00', 900);
