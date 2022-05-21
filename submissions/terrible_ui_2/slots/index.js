const numbers = [
	{
		value: 2,
		locked: false,
	},
	{
		value: 2,
		locked: false,
	},
	{
		value: 2,
		locked: false,
	},
	{
		value: 2,
		locked: false,
	},
	{
		value: 2,
		locked: false,
	},
	{
		value: 2,
		locked: false,
	},
	{
		value: 2,
		locked: false,
	},
	{
		value: 2,
		locked: false,
	},
	{
		value: 2,
		locked: false,
	},
	{
		value: 2,
		locked: false,
	},
];

// Globals
const scrollInterval = 75;
const spinning = true;

// Get all columns
const columns = document.getElementsByClassName('column');

// Add locks for each number
const lockRow = document.getElementById('lockRow');
numbers.forEach((el, i) => {
	const lock = document.createElement('div');
	lock.classList.add('lockButton', 'unlocked');

	if (i === 3 || i === 6) {
		const lockSpace = document.createElement('div');
		lockSpace.classList.add('lockSpace');
		lockRow.append(lockSpace);
	}

	lock.onclick = () => {
		numbers[i].locked = !numbers[i].locked;

		if (numbers[i].locked) {
			lock.classList.add('locked');
			lock.classList.remove('unlocked');
		} else {
			lock.classList.add('unlocked');
			lock.classList.remove('locked');
		}
	};

	lockRow.append(lock);
});

// Get Lever and add start function
const ball = document.getElementById('ball');
const shaft = document.getElementById('shaft');
ball.onclick = () => {
	// ball pull animation
	ball.classList.remove('bounce');
	ball.offsetWidth = ball.offsetWidth;
	ball.classList.add('bounce');

	shaft.classList.remove('shrink');
	shaft.offsetWidth = shaft.offsetWidth;
	shaft.classList.add('shrink');

	console.log('Start game');
	startGame();
};

// Get submit button
const submit = document.getElementById('submit');
submit.onclick = () => {
	const number = numbers.reduce((acc, el, i) => {
		if (i === 3 || i === 6) {
			acc.push('-');
		}
		acc.push(el.value);
		return acc;
	}, []);

	alert(`Submitted ${number.join('')}`);
};

// Spin wheel
async function startGame() {
	const limit = Math.floor(Math.random() * 20) + 10;
	let offset = 0;

	const promiseArray = [];

	for (let i = 0; i < columns.length; i++) {
		promiseArray.push(runColumn(columns[i], limit + offset, i));
		offset += Math.floor(Math.random() * 5) + 1;
	}

	await Promise.all(promiseArray);
}

// Prepend 0-9 in a loop to the div
// Run the number loop limit times
async function runColumn(element, limit, i) {
	let display = numbers[i].value + 2;

	// let display = 0;
	let loop = 0;

	return new Promise((resolve, reject) => {
		// Don't start loop if number is locked
		if (numbers[i].locked) return resolve();

		// Scroll number limit times, and set number.value
		const numberScroll = setInterval(() => {
			// Keep looping 0-9
			if (display > 9) display = 0;

			// Append each new div to column
			let div = document.createElement('div');
			div.classList.add('number');
			div.innerHTML = display;
			element.prepend(div);

			// Set number to display (-1 since it's the middle number)
			if (loop === limit - 2) numbers[i].value = display;

			// Increment display num + i
			display++;
			loop++;

			// Break when i hits limit
			if (loop >= limit) {
				clearInterval(numberScroll);
				return resolve();
			}
		}, scrollInterval);
	});
}
