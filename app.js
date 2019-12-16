window.addEventListener('load', () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let temperatureSection = document.querySelector('.temperature');
	let temperatureP = document.querySelector('.temperature p');
	let locationTimezone = document.querySelector('.location-timezone');


	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude

			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/c5acfd2eb54259a1863d5b792e194b4a/${lat},${long}`;
		
			fetch(api)
				.then(response => response.json())
				.then(data => {
					const {temperature, summary, icon} = data.currently;

					// Set DOM Elements from API call
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;

					// Set icon
					setIcons(icon, document.querySelector('.icon'));

					// Change Temperature C/F
					changeTemperature(temperature, temperatureSection);

				})
				.catch(error => console.log(error));
		});
	} 

	function setIcons(icon, iconId) {
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, '_').toUpperCase();

		skycons.play();
		return skycons.set(iconId, Skycons[currentIcon]);
	}

	function changeTemperature(temp, section) {
		let celsius = (temp - 32) * (5/9);

		section.addEventListener('click', () => {
			if (temperatureP.textContent === 'F') {
				temperatureDegree.textContent = Math.floor(celsius);
				temperatureP.textContent = 'C';
			} else {
				temperatureDegree.textContent = temp;
				temperatureP.textContent = 'F';
			}
		})
	}
});