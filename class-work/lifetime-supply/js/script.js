document.querySelector('#click-me').onclick = function () {
	//alert('test!')
	var age = document.querySelector('#age').value
	var maxAge = document.querySelector('#max-age').value
	var drink = document.querySelector('#item').value
	var rate = document.querySelector('#num-per-day').value
	
	age = parseInt(age);
	maxAge = parseInt(maxAge);
	rate = parseInt(rate);

	var lifeDrink = (maxAge - age) * rate * 365;
	
	document.querySelector('#solution').innerHTML = lifeDrink;
	document.querySelector('#drink').innerHTML = drink;
}

