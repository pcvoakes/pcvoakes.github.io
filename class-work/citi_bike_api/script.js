var map = new google.maps.Map(document.querySelector('#map'), {
	center: {
		lat: 40.7128,
		lng: -74.0059
  	},
  	zoom: 12,
});

var marker = new google.maps.Marker({
	position: {
		lat: 40.7128,
		lng: -74.0059
	},
	map: map,
});


$.ajax({
  	type: 'GET',
  	url: 'http://api.citybik.es/citi-bike-nyc.json',
  	success: function (response) {
  		// console.log(response);	
  		var firstStation = response[0];

  		console.log(response[0]);


  		response.forEach(function (station) {
			//$('#container');
  			//	.append('<div>' + station.name + '</div>');
  			//	.append('<div>Bikes Available: ' + station.bikes + '</div>');
  			//	.append('<div>Spaces Free: ' + station.free + '</div>');
  			//	.append('<hr>');
  			var marker = new google.maps.Marker({
  				position: {
  					lat: station.lat / 1000000,
  					lng: station.lng / 1000000,
  				},
  				map: map,
  				title: station.name,
  			})
  		})
	},
});
