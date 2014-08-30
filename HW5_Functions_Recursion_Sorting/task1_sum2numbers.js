function sumTwoNumbers(number1, number2) {
	var sum = number1 + number2;
	var result;
	isNaN(sum) ? result =  "ГРЕШКА: невалидни числа" : result  = sum;
	return result;
}

