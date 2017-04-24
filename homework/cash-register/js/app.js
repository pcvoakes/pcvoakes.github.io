// User flow:
// 1: user enters numerical value into #newEntry
// 2: user pushes enter key (submits the form), the new line is appended to the <tbody id="entries">
// 3: #total is updated to reflect the sum of all the #entries
//
// Instructions:
// 1: Add a .submit event to the form; use an anonymous function to handle the sumbit
// Inside the anonymous function:
// 2: Remeber to prevent the default action on the form!
// 3: Create a variable to store the user input from #newEntry
// 4: Remember to call parseFloat() on this variable! It needs to be a number.
// 5: Append a new <tr></tr> to the <tbody id="entries"> containing two <td>'s, one of which contains the new variable: <tr><td></td><td>NEW VALUE</td></tr>
// 6: Figure out a way to update the number in #total (Hint: look back at the calculator box example)
// 7: Empty the input in #newEntry (clear it out)
// 8: If the user does not enter a number, do not calculate

var total = 0

//Answer to 1
$('#entry').submit(function (event) {
	//Answer to 2
	event.preventDefault();

	//Answer to 3
	var cost = $('#newEntry').val();
	//Answer to 4
	cost = parseFloat(cost);

	//Taking care of 8
	if (isNaN(cost) === false) {
		//Answer to 5
		$('#entries').append('<tr><td></td><td>$' + cost + '</td></tr>')
		//Answer to 6
		total = total + cost
		$('#total').text('$' + total.toFixed(2));
		//Answer to 7
		$('#newEntry').val("");		
	} else {
		alert('Hey! Numbers Only!!')
	}
})