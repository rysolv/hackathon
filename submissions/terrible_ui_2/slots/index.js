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
	lock.classList.add('lockButton');

	lock.onclick = () => {
		numbers[i].locked = !numbers[i].locked;
		lock.style.backgroundColor = numbers[i].locked ? 'green' : 'red';
		console.log(numbers[i].locked);
	};

	lockRow.append(lock);
});

// Get Lever and add start function
const lever = document.getElementById('ball');
lever.onclick = () => {
	console.log('Start game');
	startGame();
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
