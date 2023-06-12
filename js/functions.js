const checkLength = (str, maxLenght) => str.length <= maxLenght;

console.log('Проверка строки на соответствие заданной длине');
console.log(checkLength('проверяемая строка', 20));
console.log(checkLength('проверяемая строка', 18));
console.log(checkLength('проверяемая строка', 10));


const checkPalindrom = (str) => {
  const newStr = str.toLowerCase().replaceAll(' ', '');
  console.log(newStr);
  const reversedStr = newStr.split('').reverse().join('');
  console.log(reversedStr);

  return newStr === reversedStr;
};

console.log('Проверка палиндромов');
console.log(checkPalindrom('топот')); // true
console.log(checkPalindrom('ДовОд')); // true
console.log(checkPalindrom('Кекс')); // false
console.log(checkPalindrom('Лёша на полке клопа нашёл ')); // true


const getNumber = (str) => {
  let result = '';
  const string = str.toString();

  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += parseInt(string.at(i), 10);
    }
  }

  return (parseInt(result, 10));
};

console.log('Извлечение всех цифр из строки');
console.log(getNumber('2023 год')); // 2023
console.log(getNumber('ECMAScript 2022')); // 2022
console.log(getNumber('1 кефир, 0.5 батона')); // 105
console.log(getNumber('агент 007')); // 7
console.log(getNumber('а я томат')); // NaN
console.log(getNumber(2023)); // 2023
console.log(getNumber(-1)); // 1
console.log(getNumber(1.5)); //15
