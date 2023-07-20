// const checkLength = (str, maxLenght) => str.length <= maxLenght;

// console.log('Проверка строки на соответствие заданной длине');
// console.log(checkLength('проверяемая строка', 20));
// console.log(checkLength('проверяемая строка', 18));
// console.log(checkLength('проверяемая строка', 10));


// const checkPalindrom = (str) => {
//   const newStr = str.toLowerCase().replaceAll(' ', '');
//   console.log(newStr);
//   const reversedStr = newStr.split('').reverse().join('');
//   console.log(reversedStr);

//   return newStr === reversedStr;
// };

// console.log('Проверка палиндромов');
// console.log(checkPalindrom('топот')); // true
// console.log(checkPalindrom('ДовОд')); // true
// console.log(checkPalindrom('Кекс')); // false
// console.log(checkPalindrom('Лёша на полке клопа нашёл ')); // true


// const getNumber = (str) => {
//   let result = '';
//   const string = str.toString();

//   for (let i = 0; i < string.length; i++) {
//     if (!Number.isNaN(parseInt(string.at(i), 10))) {
//       result += parseInt(string.at(i), 10);
//     }
//   }

//   return (parseInt(result, 10));
// };

// console.log('Извлечение всех цифр из строки');
// console.log(getNumber('2023 год')); // 2023
// console.log(getNumber('ECMAScript 2022')); // 2022
// console.log(getNumber('1 кефир, 0.5 батона')); // 105
// console.log(getNumber('агент 007')); // 7
// console.log(getNumber('а я томат')); // NaN
// console.log(getNumber(2023)); // 2023
// console.log(getNumber(-1)); // 1
// console.log(getNumber(1.5)); //15

// const getTimeInMinutes = (time) => {
//   const newTimeFormat = Number(time.split(':')[0]) * 60 + Number(time.split(':')[1]);
//   return newTimeFormat;
// };

// const checkIsMeetTimOver = (startWorkDay, endWorkDay, startMeet, meetDuration) => {
//   const startWorkDayInMinutes = getTimeInMinutes(startWorkDay);
//   const endWorkDayInMinutes = getTimeInMinutes(endWorkDay);
//   const startMeetInMinutes = getTimeInMinutes(startMeet);
//   return ((startWorkDayInMinutes <= startMeetInMinutes + meetDuration) && (endWorkDayInMinutes >= startMeetInMinutes + meetDuration));
// };

// console.log('Выходит ли встреча за рамки рабочего дня');
// console.log(checkIsMeetTimOver('08:00', '17:30', '14:00', 90)); // true
// console.log(checkIsMeetTimOver('8:0', '10:0', '8:0', 120)); // true
// console.log(checkIsMeetTimOver('08:00', '14:30', '14:00', 90)); // false
// console.log(checkIsMeetTimOver('14:00', '17:30', '08:0', 90)); // false
// console.log(checkIsMeetTimOver('8:00', '17:30', '08:00', 900)); // false
