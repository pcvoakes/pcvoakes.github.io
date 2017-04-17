$('#farenheit').keyup(function() {
	var farenheit = $('#farenheit').val();
	if (farenheit != "") {	
		farenheit = parseFloat(farenheit);
		var celsius = (farenheit - 32) / 1.8;
		$("#celsius").val(celsius.toFixed(2));
		console.log(celsius)
	} else {
		$('#celsius').val("");
	}
	if (farenheit === "") {
		$('body').css('background-color', 'rgb(255, 255, 255)')
	} else if (farenheit <= 40) {	
		$('body').css('background-color', 'rgb(120, 146, 183)');
	} else if(farenheit <= 60) {
		$('body').css('background-color', 'rgb(217, 212, 54)');
	} else if (farenheit <=70) {
		$('body').css('background-color', 'rgb(219, 131, 7)');
	} else if (farenheit <= 80) {
		$('body').css('background-color', 'rgb(217, 44, 4)');
	} else if (farenheit >= 90) {
		$('body').css('background-color', 'rgb(146, 3, 2)');
	}	
 })

$('#celsius').keyup(function() {
	var celsius = $('#celsius').val();
	if (celsius != "") {
		celsius = parseFloat(celsius);
		var farenheit = (celsius * 1.8) + 32;
		$("#farenheit").val(farenheit.toFixed(2));
		console.log(farenheit);
	} else {
		$('#farenheit').val("");
	}
})

		
