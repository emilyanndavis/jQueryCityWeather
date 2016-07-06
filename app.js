(function () {

	$('#addCityBtn').on('click', function () {

		var zip = $('#newZipCode').val();

		// get the city & weather data
		getCity(zip, function(cityData){
			console.log(cityData);

			getWeather(zip, function(weatherData){
				console.log(weatherData);

				// add a city panel to the list	
				var template = $('#cityTemplate').text()
					.replace('{{ city }}', cityData.city)
					.replace('{{ state }}', cityData.state)
					.replace('{{ temp }}', weatherData.temp)
					.replace('{{ conditions }}', weatherData.conditions);

				$('#cityList').append($(template));
			});

		});

	});


	function getCity(zip, callback) {
		
		var urlBase = 'http://api.zippopotam.us/us/';
		var url = urlBase + zip;

		// use jQuery get to get the zip code data	
		// transform the data to camelCase property names	
		$.get(url, function(response){
			callback({
				city: response.places[0]['place name'],
				state: response.places[0].state
			});

		});

	}

	function getWeather(zip, callback) {

		var urlBase = 'http://api.openweathermap.org/data/2.5/';
		var appId = 'bd82255fd0a21fa1238699b9eda2ee35';
		var url = urlBase + 'weather?appid=' + appId + '&units=imperial&zip=' + zip;

		// use jQuery get to get the zip code weather data
		$.get(url, function(response){
			callback({
				temp: Math.round(response.main.temp),
				conditions: response.weather[0].description
			});
		});

	}

})();