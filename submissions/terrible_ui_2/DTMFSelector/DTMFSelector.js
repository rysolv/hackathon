const KEY_IDS = {
	65: {key: "a", hz: 697},
	83: {key: "s", hz: 770},
	68: {key: "d", hz: 852},
	70: {key: "f", hz: 941},
	74: {key: "j", hz: 1209},
	75: {key: "k", hz: 1337},
	76: {key: "l", hz: 1477}
};
const FREQ_MAP = {
	697: 199,
	770: 197,
	852: 193,
	941: 191,
	1209: 181,
	1337: 179,
	1477: 173
};
const IS_KEY_DOWN = {};
const KEY_DEFINITION = [
	{ multiFreq: [697, 1209], numeral: '1' },
	{ multiFreq: [697, 1337], numeral: '2' },
	{ multiFreq: [697, 1477], numeral: '3' },
	{ multiFreq: [770, 1209], numeral: '4' },
	{ multiFreq: [770, 1337], numeral: '5' },
	{ multiFreq: [770, 1477], numeral: '6' },
	{ multiFreq: [852, 1209], numeral: '7' },
	{ multiFreq: [852, 1337], numeral: '8' },
	{ multiFreq: [852, 1477], numeral: '9' },
	{ multiFreq: [941, 1209], numeral: '*' },
	{ multiFreq: [941, 1337], numeral: '0' },
	{ multiFreq: [941, 1477], numeral: '#' },
];
const NUMERAL_MAP = {};
const RESULT_KEYS = {};
const audioContext = new AudioContext();
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const volume = 0.2;
let activeFrequency = 1;
let dtmfResult = '';
let dtmfDisplay = null;
computeNumeralHookups();

function computeNumeralHookups(){
	for (let item of KEY_DEFINITION) {
		let product = 1;
		for (let f of item.multiFreq) {
			if (f in FREQ_MAP === false) {
				console.error('Missing frequency map for ' + f + 'hz to map numeral ' + item.numeral);
			} else {
				product *= FREQ_MAP[f];
			}
		}
		NUMERAL_MAP[product] = item.numeral;
	}
}

function updateDTMFResult(){
	if (activeFrequency in NUMERAL_MAP){
		dtmfResult = NUMERAL_MAP[activeFrequency];
	} else {
		dtmfResult = '';
	}
	updateDTMFDisplay();
}

function updateDTMFDisplay(){
	if (dtmfResult){
		dtmfDisplay.children().first().text(dtmfResult);
		dtmfDisplay = dtmfDisplay.next();
	}
	highlightKey(dtmfResult);
}

function highlightKey(dtmfResult) {
	for (let [key, entry] of Object.entries(RESULT_KEYS)){
		if (key === dtmfResult){
			entry.classList.add('key_display_down');
		} else {
			entry.classList.remove('key_display_down');
		}
	}
}

function getTriangleWave(hz) {
	const durationCeilSeconds = 2.17;
	let waveform = [];
	let sampleLength = 1/audioContext.sampleRate;
	let waveLength = Math.floor(durationCeilSeconds * hz) / hz; //complete wave cycles
	let triangle = (t) => 4 * Math.abs(hz * t - Math.floor(hz * t - 1/4) - 3/4) - 1
	for (let i = 0, t = 0; t < waveLength; t += sampleLength, i++) {
		waveform[i] = triangle(t) * volume;
	}
	return new Float32Array(waveform);
}

function createTone(freq){
	let wave = getTriangleWave(freq);
	let buffer = audioContext.createBuffer(1, wave.length, audioContext.sampleRate)
	buffer.copyToChannel(wave, 0)
	return buffer;
}

function activateKey(key){
		if(key){
			keyDownStyle(key.element);
			key.audioSource = audioContext.createBufferSource()
			key.audioSource.connect(audioContext.destination);
			key.audioSource.buffer = key.tone;
			key.audioSource.start(0);
			activeFrequency *= FREQ_MAP[key.hz];
			updateDTMFResult();
		}
}

function deactivateKey(key){
	if (key) {
		keyUpStyle(key.element);
		key.audioSource.stop();
		activeFrequency /= FREQ_MAP[key.hz];
		updateDTMFResult();
	}
}

function keyDownStyle(element) {
	element.addClass("key_down");
}

function keyUpStyle(element) {
	element.removeClass("key_down");
}

function resetDtmfDisplay() {
	dtmfDisplay = $("#phone_number_display").children().first();
	$(".phone_number_display_item_text_container").html('&nbsp;');
}

$(document).ready(function() {
	$(".key_display").each(function(i,e) {
		RESULT_KEYS[e.innerHTML] = e;
	})

	$("#tone_selector button").click(function(){
		let toneState = TONE_SELECTION[$(this).attr("id").substring(4)];
		if (toneState.isOn) {
			toneState.isOn = false;
			$(this).addClass("tone_btn_up");
			$(this).removeClass("tone_btn_down");
		} else {
			toneState.isOn = true;
			$(this).addClass("tone_btn_down");
			$(this).removeClass("tone_btn_up");
		}
	});

	resetDtmfDisplay();

	$("#btn_reset").click(function(e) {
		resetDtmfDisplay();
	});

	$(".entry_display_key").each(function(i, e) {
		let key = Object.values(KEY_IDS).find(el => el.key === e.dataset.key);
		if (key) {
			key.element = $(this);
			key.tone = createTone(key.hz);
			$(this).mousedown(e => activateKey(key));
			$(this).mouseup(e => deactivateKey(key));
		}
	});

	$(document).keydown(function(event){
		if (!IS_KEY_DOWN[event.which]){
			IS_KEY_DOWN[event.which] = true;
			let key = KEY_IDS[event.which];
			if (key) {
				activateKey(key);
			}
		}
  });

	$(document).keyup(function(event){
		let key = KEY_IDS[event.which];
		IS_KEY_DOWN[event.which] = false;
		if (key) {
			deactivateKey(key);
		}
	});
});
