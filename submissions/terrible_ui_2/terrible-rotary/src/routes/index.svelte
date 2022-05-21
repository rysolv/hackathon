<script lang="ts">
import { onMount } from 'svelte';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import '../app.css';

const PHONE_NUMBER = '0212345678';
// $: digits = [...PHONE_NUMBER];
let phoneNumber = '';
$: digits = [...phoneNumber];

const degInterval = 10;

let alpha: number;
let beta = tweened(0, {
		duration: 400,
		easing: cubicOut,
	});
let gamma: number;
$: betaProp = $beta + 'deg';

let indicator: HTMLDivElement;
let circleWidth: number;
let circleHeight: number;
let boxX: number;
let boxY: number;
let firstX: number;
let firstY: number;
let numeralHeld = undefined;
let prevX: number;
let prevY: number;
let rotateAllowed = false;
let prevBeta = 0;

const handleOrientation = (event: DeviceOrientationEvent) => {
  if (event.beta == null || event.gamma == null) {
    return;
  }

  // beta = event.beta;
  gamma = event.gamma;
};

/*
once beta passes 105, trigger an input


for mouse:
when hovering over a number, highlight it to indicate draggable
each numeral limits the amount beta can rotate (to simulate stop)


on input, add a number to the phone number

button in center to clear

*/


$: console.log(numeralHeld);

beta.set(0);

const numeralDown = ({clientX, clientY}, i) => {
  const {x, y} = indicator.getBoundingClientRect();

  boxX = x;
  boxY = y;
  firstX = clientX;
  firstY = clientX;
  prevX = clientX;
  prevY = clientY;
  // console.log(clientX, clientY);
  // console.log(i, ' got held');
  numeralHeld = i;
};

const numeralUp = () => {
  // $beta = 0;
  beta.set(0);
  numeralHeld = undefined;
};

const addToNumber = (num) => {
  if (phoneNumber.length >= 10) {
    return;
  }

  phoneNumber = [...phoneNumber, num].join('');
}

const handleMouseMove = ({clientX, clientY}) => {
  if (numeralHeld === undefined) {
    return;
  }

  const right = clientX > prevX;
  const down = clientY > prevY;

  if ($beta > 335 || $beta < 0) {
    return;
  }

  switch(numeralHeld) {
    case 0:
      if ($beta >= 335) {
        addToNumber(numeralHeld);
        numeralHeld = undefined;
        return;
      }
      break;
    case 1:
      if ($beta >= 105) {
        addToNumber(numeralHeld);
        numeralHeld = undefined;
        return;
      }
      break;
    case 2:
      if ($beta >= 130) {
        addToNumber(numeralHeld);
        numeralHeld = undefined;
        return;
      }
      break;
    case 3:
      if ($beta >= 155) {
        addToNumber(numeralHeld);
        numeralHeld = undefined;
        return;
      }
      break;
    case 4:
      if ($beta >= 180) {
        addToNumber(numeralHeld);
        numeralHeld = undefined;
        return;
      }
      break;
    case 5:
      if ($beta >= 205) {
        addToNumber(numeralHeld);
        numeralHeld = undefined;
        return;
      }
      break;
    case 6:
      if ($beta >= 230) {
        addToNumber(numeralHeld);
        numeralHeld = undefined;
        return;
      }
      break;
    case 7:
      if ($beta >= 255) {
        addToNumber(numeralHeld);
        numeralHeld = undefined;
        return;
      }
      break;
    case 8:
      if ($beta >= 280) {
        addToNumber(numeralHeld);
        numeralHeld = undefined;
        return;
      }
      break;
    case 9:
      if ($beta >= 305) {
        addToNumber(numeralHeld);
        numeralHeld = undefined;
        return;
      }
      break;
  }

  beta.set(clientX - firstX);


  
  prevX = clientX;
  prevY = clientY;
}
</script>

<svelte:window on:deviceorientation={handleOrientation} on:mousemove={handleMouseMove} on:mouseup={numeralUp}/>


<div class="null" style:--beta={betaProp}>
  <address class="digits">
    <!-- <a href="tel:{PHONE_NUMBER}"> -->
    {#each digits as digit, i}
      {@const rotation = -45 + degInterval * i}
      <span class="digit" style:--rotation="{rotation}deg">{digit}</span>
    {/each}
    <!-- </a> -->
  </address>
  <div class="indicator" bind:clientWidth={circleWidth} bind:clientHeight={circleHeight} bind:this={indicator}>
    {#each [0, 9, 8, 7, 6, 5, 4, 3, 2, 1] as digit, i}
      {@const rotation = -180 + 25 * i}
      <span class="numeral" style:--rotation="{rotation}deg">
        <span class="offset" style:--rotation="{-rotation}deg">{digit}</span>
      </span>
    {/each}
  </div>
  <img class="dial" src="/dial.svg" alt="" />
  <div class="dial-interaction">
    {#each {length: 10} as _, i}
      <div class="interaction-{i}" on:mousedown={e => numeralDown(e, i)} />
    {/each}
  </div>
</div>

<style>
.null {
  --radius: 20rem;
  --border-width: 0.5rem;
  position: relative;
  width: var(--radius);
  aspect-ratio: 1 / 1;
  transform: rotate();
  /* pointer-events: none; */
  user-select: none;
}

.digits {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: center;
  /* transform: rotate(var(--beta)); */
  z-index: 5;
  cursor: cell;
  pointer-events: none;
}

.digits a {
  display: contents;
  text-decoration: none;
}

.digit {
  position: absolute;
  display: inline-block;
  width: var(--radius);
  aspect-ratio: 1 / 1;
  text-align: center;
  vertical-align: middle;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 2em;
  color: white;
  transform: rotate(var(--rotation)) scale(1.5);
  /* transform:  rotate(var(--rotation)); */
  transform-origin: center;
}

.indicator {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: hsl(271 90% 88%);
  border: var(--border-width) solid hsl(236 79% 75%);
  /* filter: drop-shadow(0 10px 5px rgb(40, 40, 40)); */
  transform: rotate(var(--beta));
  transform-origin: center;
  /* border: 1px solid limegreen; */
  /* box-sizing: border-box; */
  pointer-events: none;
  user-select: none;
}

.indicator .numeral {
  position: absolute;
  display: inline-block;
  width: var(--radius);
  aspect-ratio: 1 / 1;
  text-align: center;
  vertical-align: middle;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 2em;
  color: white;
  transform-origin: center;
  transform: rotate(var(--rotation)) scale(0.925);
  pointer-events: none;
  user-select: none;
}

.indicator .offset {
  display: inline-block;
  transform: rotate(var(--rotation));
  user-select: none;
}

.dial {
  position: absolute;
  /* top: calc(var(--border-width) + 0px);
  left: calc(var(--border-width) + 0px); */
  top: var(--border-width);
  left: var(--border-width);
  width: 100%;
  aspect-ratio: 1 / 1;
  /* opacity: 0.6; */
  pointer-events: none;
}

.null::after {
  content: '';
  position: absolute;
  bottom: calc(var(--radius) * 0.1);
  right: calc(var(--radius) * 0.225);
  width: 2.5rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border-width: 0 0 0 4px;
  border-style: solid;
  /* border-color: lime; */
  z-index: 15;
  transform-origin: center;
  transform: rotate(-35deg);
}

.dial-interaction {
  position: absolute;
  top: 0;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: var(--border-width) solid rgb(129, 135, 220);
  transform: rotate(var(--beta));
  transform-origin: center;
  z-index: 20;
}

.dial-interaction > div {
  --s: 2.5rem;
  position: absolute;
  width: var(--s);
  aspect-ratio: 1 / 1;
  /* background-color: red; */
  /* opacity: 0.6; */
}

.interaction-1 {
  transform: translate(calc(var(--s) * 5.8), calc(var(--s) * 1.2));
}
.interaction-2 {
  transform: translate(calc(var(--s) * 4.625), calc(var(--s) * 0.4));
}
.interaction-3 {
  transform: translate(calc(var(--s) * 3.2), calc(var(--s) * 0.2));
}
.interaction-4 {
  transform: translate(calc(var(--s) * 1.9), calc(var(--s) * 0.65));
}
.interaction-5 {
  transform: translate(calc(var(--s) * 0.825), calc(var(--s) * 1.6));
}
.interaction-6 {
  transform: translate(calc(var(--s) * 0.3), calc(var(--s) * 2.875));
}
.interaction-7 {
  transform: translate(calc(var(--s) * 0.35), calc(var(--s) * 4.3));
}
.interaction-8 {
  transform: translate(calc(var(--s) * 0.975), calc(var(--s) * 5.55));
}
.interaction-9 {
  transform: translate(calc(var(--s) * 2.1), calc(var(--s) * 6.4));
}
.interaction-0 {
  transform: translate(calc(var(--s) * 3.5), calc(var(--s) * 6.75));
}

</style>
