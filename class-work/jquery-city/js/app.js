// 1. Create .click() handlers for each of the thumbnails: #first, #second, #third, #fourth
// 2. Use .attr() to change the `src` attribute of #bigimage to correspond to image that was clicked


// 1 target all thumbnails with a click event
// 2 get src attribute of whatever image clicked on 
// 3 update big image with new src

$('.thumb').click(function () {
	var newImage = $(this).attr('src');
	$('#bigimage').attr('src', newImage);
})


//function change () {
//	$('#bigimage').attr('src', 'img/1.jpg');
//}

//function second () {
//	$('#bigimage').attr('src', 'img/2.jpg');
//}

//function third () {
//	$('#bigimage').attr('src', 'img/3.jpg')
//}

//function fourth () {
//	$('#bigimage').attr('src', 'img/4.jpg')
//}

