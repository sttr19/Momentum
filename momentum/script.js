const time = document.querySelector('.time');
const dayMonth = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const error = document.querySelector('.weather-error');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let randomNum;

function showTime() {
	const date = new Date();
	const currentTime = date.toLocaleTimeString();
	time.textContent = currentTime;
	setTimeout(showTime, 1000);
	showDate();
	showGreeting();
}

function showDate() {
	const options = {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	};
	const date = new Date();
	const currentDate = date.toLocaleDateString('en-US', options);
	dayMonth.textContent = currentDate;
}



function showGreeting() {
	const timeOfDay = getTimeOfDay();
	const greetingText = `Good ${timeOfDay}`;
	greeting.textContent = greetingText;
}

function getTimeOfDay() {
	const date = new Date();
	const hours = date.getHours();
	if (12 > hours && hours >= 6) return 'morning';
	if (18 > hours && hours >= 12) return 'afternoon';
	if (24 > hours && hours >= 18) return 'evening';
	if (6 > hours && hours >= 0) return 'night';
}

function setLocalStorage() {
	localStorage.setItem('name', name.value);
	localStorage.setItem('cityIn', city.value);
}


function getLocalStorage() {
	if (localStorage.getItem('name')) {
		name.value = localStorage.getItem('name');
	}

	if (localStorage.getItem('cityIn')) {
		city.value = localStorage.getItem('cityIn');
		getWeather();
	}
}


const timeOfDay = getTimeOfDay();
let bgNum = getRandomNum(1, 20);

function setBg() {
	const img = new Image();
	img.src = `https://raw.githubusercontent.com/sttr19/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
	img.onload = () => {
		document.body.style.background = `url(${img.src})`;
	}
	//document.body.style.background = `url('https://raw.githubusercontent.com/sttr19/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
	//document.body.style.background = `url('https://raw.githubusercontent.com/sttr19/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg')`;
	//console.log(bgNum);
	//img.onload = () => {
	//document.body.style.background = `url('https://raw.githubusercontent.com/sttr19/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
	//};
}

function getRandomNum(from, to) {
	let numbLessTen = '';
	from = Math.ceil(from);
	to = Math.floor(to);
	const numb = (Math.floor(Math.random() * (to - from + 1)) + from).toString();
	if (numb.length < 2) return numbLessTen = numb.padStart(2, 0);
	else return numb;
}
setBg();
showTime();



async function getWeather() {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=3c6553618b8f977f300c991580ad2661&units=metric`;
	const res = await fetch(url);
	const data = await res.json();
	weatherIcon.className = 'weather-icon owf';
	weatherIcon.classList.add(`owf-${data.weather[0].id}`);
	temperature.textContent = `${Math.round(data.main.temp)}°C`;
	weatherDescription.textContent = data.weather[0].description;
	wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
	humidity.textContent = `Humidity: ${data.main.humidity}%`;
	error.innerHTML = '';
	if (data.cod != '200' || city.value === ' ') {
		error.innerHTML = `Error! Nothing to geocode for ${city.value} !`
	};
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

city.addEventListener("change", getWeather);

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

function getSlideNext() {
	randomNum = parseInt(bgNum);
	if (randomNum < 20) {
		randomNum += 1;
	} else {
		randomNum = 1;
	}
	bgNum = randomNum.toString();
	if (bgNum.length < 2) {
		bgNum=bgNum.padStart(2, 0);
	} 
	setBg();
};

function getSlidePrev() {
	randomNum = parseInt(bgNum);
	if (randomNum != 1) randomNum -= 1;
	else randomNum = 20;
	bgNum = randomNum.toString();
	if (bgNum.length < 2) {
		bgNum=bgNum.padStart(2, 0);
	} 
	setBg();
};