
// a zodiac sign's starting month & date, ending month & date, and the day after which it switches from month1 to month2
function createZodiac (month1, date1, month2, date2, breakpoint) {
    return {
        month1: month1,
        date1: date1,
        month2: month2,
        date2: date2,
        breakpoint: breakpoint
    }
}

const zodiacSigns = {
    aries: createZodiac('March', 21, 'April', 19, 11),
    taurus: createZodiac('April', 20, 'May', 20, 11),
    gemini: createZodiac('May', 21, 'June', 20, 11),
    cancer: createZodiac('June', 21, 'July', 22, 10),
    leo: createZodiac('July', 23, 'August', 22, 9),
    virgo: createZodiac('August', 23, 'September', 22, 9),
    libra: createZodiac('September', 23, 'October', 22, 8),
    scorpio: createZodiac('October', 23, 'November', 21, 9),
    sagittarius: createZodiac('November', 22, 'December', 21, 9),
    capricorn: createZodiac('December', 22, 'January', 19, 11),
    aquarius: createZodiac('January', 20, 'February', 18, 12),
    pisces: createZodiac('February', 19, 'March', 20, 10) // assumes 28 days
}

let chosenZodiac;

const zodiacIcons = document.querySelectorAll('#zodiac-signs img');
const dayPicker = document.getElementById('day-picker');

zodiacIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
        displayDayPicker();
        chosenZodiac = icon.id;
        alertChosenZodiac();
    })
})

zodiacIcons.forEach((icon) => {
    icon.addEventListener('mouseover', () => {
        let randomR = Math.floor(Math.random()*256);
        let randomG = Math.floor(Math.random()*256);
        let randomB = Math.floor(Math.random()*256);
        let random = `rgb(${randomR}, ${randomG}, ${randomB})`;
        icon.style.backgroundColor = random;
    })
})

// Day Picker

const dayContainer = document.getElementById('day-container')
const timePicker = document.getElementById('time-picker');
let chosenDay;

// all zodiacs have 30 days; overflow is determined by breakpoint
for (let i = 1; i <= 30; i++) {
    let newDay = document.createElement('div');
    newDay.className = 'day-box';
    newDay.innerText = i;
    newDay.addEventListener('click', (e) => {
        setDay(e.target.innerText);
        timePicker.classList.remove('hidden');
        generateRandomTime();
    })
    dayContainer.appendChild(newDay);
}

function displayDayPicker() {
    dayPicker.classList.remove('hidden');
}

function setDay(number) {
    chosenDay = Number(number);
}

// Time Picker

const randomTime = document.getElementById('random-time');
const earlyBtn = document.getElementById('early');
const lateBtn = document.getElementById('late');
const approveBtn = document.getElementById('approve-time');
const results = document.getElementById('results');

let earliestTime = '00:01';
let latestTime = '24:00';
let chosenTime;
let clickCount = 0;

function setEarliestTime(time) {
    earliestTime = randomTime.innerText;
}

function setLatestTime(time) {
    latestTime = randomTime.innerText;
}

earlyBtn.addEventListener('click', () => {
    setEarliestTime(randomTime.innerText);
    generateRandomTime();
    clickCount++;
    if (clickCount > 5) {
        alert('The zodiac is displeased by your specificity.');
    }
})

lateBtn.addEventListener('click', () => {
    setLatestTime(randomTime.innerText);
    generateRandomTime();
    clickCount++;
    if (clickCount > 5) {
        alert('You\'re awfully fussy for a mortal.');
    }
})

approveBtn.addEventListener('click', () => {
    chosenTime = randomTime.innerText;
    results.classList.remove('hidden');
    populateResult();
})

function generateRandomTime() {
    const minHour = Number(earliestTime.substring(0, 2));
    const maxHour = Number(latestTime.substring(0, 2)) +1;
    let hour = Math.floor(Math.random()* (maxHour - minHour) + minHour);
    
    let minMinute = 0;
    let maxMinute = 60;
    if (hour == Number(earliestTime.substring(0, 2))) {
        minMinute = Number(earliestTime.substring(3));
    }
    if (hour == Number(latestTime.substring(0, 2))) {
        maxMinute = Number(latestTime.substring(3)); // would be -1, but have to +1 for Math.random anyway
    }
    let minutes = Math.floor(Math.random()*(maxMinute - minMinute) + minMinute);
    if (minutes > 59) {
        minutes = 59;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (hour < 10) {
        hour = `0${hour}`;
    }

    randomTime.innerText = `${hour}:${minutes}`;
    console.log('the random time is ' + randomTime.innerText + ' and the earliest is ' + earliestTime + ' and the latest is ' + latestTime);
}

// Final result

 function parseZodiacDate() {
    let month;
    let day;
    if (chosenDay <= zodiacSigns[chosenZodiac].breakpoint) {
        month = zodiacSigns[chosenZodiac].month1;
        day = zodiacSigns[chosenZodiac].date1 + chosenDay-1; // if start is March 21, day 1 is March 21 and day 2 is March 22
    } else {
        month = zodiacSigns[chosenZodiac].month2;
        day = chosenDay - zodiacSigns[chosenZodiac].breakpoint;
    }
    return `${month} ${day}`;
}

function populateResult() {
    const finalDateTime = document.getElementById('final-date-time');
    finalDateTime.innerText = `${parseZodiacDate()} ${chosenTime}`;
}

// Popups

const revealDatesBtn = document.getElementById('reveal-dates-btn');
revealDatesBtn.addEventListener('click', () => {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-div';
    alertDiv.innerText = 'If you do not understand the nuances of the zodiac, you are not worthy of using this site.';
    const accept = document.createElement('button');
    accept.innerText = 'I apologize for my foolishness';
    accept.style.display = 'block';
    revealDatesBtn.parentElement.appendChild(alertDiv);
    alertDiv.appendChild(accept);
    accept.addEventListener('click', () => {
        alertDiv.parentElement.removeChild(alertDiv);
    })
})

const zodiacAlert = document.getElementById('zodiac-alert');

function alertChosenZodiac() {
    const chosenIcon = document.getElementById(chosenZodiac);
    chosenIcon.className = 'alerted-icon';
    zodiacAlert.innerText = `You have chosen ${chosenZodiac.toUpperCase()}. There is no turning back.`;
    zodiacAlert.classList.remove('hidden');
}

const clearAll = document.getElementById('clear-all');

clearAll.addEventListener('click', () => {
    chosenZodiac = null;
    chosenTime = null;
    chosenDay = null;
    earliestTime = '00:01';
    latestTime = '24:00';
    clickCount = 0;
    timePicker.classList += 'hidden';
    dayPicker.classList += 'hidden';
    results.classList += 'hidden';
    const images = document.querySelectorAll('#zodiac-signs img');
    images.forEach((img) => {
        img.classList.remove('alerted-icon');
    })
    zodiacAlert.classList += 'hidden';
})