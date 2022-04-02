<template>
  <div class="grid">
    <h1>Date Picker</h1>
    <h2>{{ store.getDate }}</h2>
    <div class="container" v-if="!store.allDataSet">
      <div v-show="!store.date.year.isSet">
        <h3>Is this your year?</h3>
        <p>{{ store.getYearMiddle }}</p>
        <span>
          <button
            :disabled="store.yearMinButtonDisabled"
            @click="store.setMin({ type: 'year', value: store.getYearMiddle })"
          >
            Too Low
          </button>
          <button
            :disabled="store.date.year.isSet"
            @click="store.setDate({ type: 'year', value: store.getYearMiddle })"
          >
            Yes
          </button>
          <button
            :disabled="store.yearMaxButtonDisabled"
            @click="store.setMax({ type: 'year', value: store.getYearMiddle })"
          >
            Too High
          </button>
        </span>
      </div>
      <div v-show="!store.date.month.isSet">
        <h3>Is this your Month?</h3>
        <p>{{ store.getMonth }}</p>
        <span>
          <button
            :disabled="store.monthMinButtonDisabled"
            @click="store.setMin({ type: 'month', value: store.getMonthMiddle })"
          >
            Too Low
          </button>
          <button
            :disabled="store.date.month.isSet"
            @click="store.setDate({ type: 'month', value: store.getMonthMiddle })"
          >
            Yes
          </button>
          <button
            :disabled="store.monthMaxButtonDisabled"
            @click="store.setMax({ type: 'month', value: store.getMonthMiddle })"
          >
            Too High
          </button>
        </span>
      </div>
      <div v-show="!store.date.day.isSet">
        <h3>Is this your Day?</h3>
        <p>{{ store.getDayMiddle }}</p>
        <span>
          <button
            :disabled="store.dayMinButtonDisabled"
            @click="store.setMin({ type: 'day', value: store.getDayMiddle })"
          >
            Too Low
          </button>
          <button
            :disabled="store.date.day.isSet"
            @click="store.setDate({ type: 'day', value: store.getDayMiddle })"
          >
            Yes
          </button>
          <button
            :disabled="store.dayMaxButtonDisabled"
            @click="store.setMax({ type: 'day', value: store.getDayMiddle })"
          >
            Too High
          </button>
        </span>
      </div>
      <div v-show="!store.date.hour.isSet">
        <h3>Is this your Hour?</h3>
        <p>{{ store.getHourMiddle }}</p>
        <span>
          <button
            :disabled="store.hourMinButtonDisabled"
            @click="store.setMin({ type: 'hour', value: store.getHourMiddle })"
          >
            Too Low
          </button>
          <button
            :disabled="store.date.hour.isSet"
            @click="store.setDate({ type: 'hour', value: store.getHourMiddle })"
          >
            Yes
          </button>
          <button
            :disabled="store.hourMaxButtonDisabled"
            @click="store.setMax({ type: 'hour', value: store.getHourMiddle })"
          >
            Too High
          </button>
        </span>
      </div>
      <div v-show="!store.date.minute.isSet">
        <h3>Is this your Minute?</h3>
        <p>{{ store.getMinuteMiddle }}</p>
        <span>
          <button
            :disabled="store.minuteMinButtonDisabled"
            @click="store.setMin({ type: 'minute', value: store.getMinuteMiddle })"
          >
            Too Low
          </button>
          <button
            :disabled="store.date.minute.isSet"
            @click="store.setDate({ type: 'minute', value: store.getMinuteMiddle })"
          >
            Yes
          </button>
          <button
            :disabled="store.minuteMaxButtonDisabled"
            @click="store.setMax({ type: 'minute', value: store.getMinuteMiddle })"
          >
            Too High
          </button>
        </span>
      </div>
      <div v-show="!store.date.second.isSet">
        <h3>Is this your Second?</h3>
        <p>{{ store.getSecondMiddle }}</p>
        <span>
          <button
            :disabled="store.secondMinButtonDisabled"
            @click="store.setMin({ type: 'second', value: store.getSecondMiddle })"
          >
            Too Low
          </button>
          <button
            :disabled="store.date.second.isSet"
            @click="store.setDate({ type: 'second', value: store.getSecondMiddle })"
          >
            Yes
          </button>
          <button
            :disabled="store.secondMaxButtonDisabled"
            @click="store.setMax({ type: 'second', value: store.getSecondMiddle })"
          >
            Too High
          </button>
        </span>
      </div>
    </div>
    <div class="container" v-if="store.allDataSet">
      <div>
        <h3>You're all set!</h3>
        <p></p>
        <button @click="store.$reset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "./stores/mainStore";

const store = useMainStore();
const types = ["year", "month", "day", "hour", "minute", "second"];
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #0f172a;
  color: #f8fafc;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
}

div.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 36px 1fr;
  grid-template-areas:
    "header"
    "date "
    ".";
}

h1 {
  grid-area: header;
  font-size: 36px;
  font-weight: 800;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  background-color: #334155;
}

h2 {
  grid-area: date;
  font-size: 24px;
  font-weight: 800;
  margin: 5px auto;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
}

button {
  background-color: #475569;
  border: none;
  color: #f8fafc;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  text-transform: uppercase;
  border-radius: 8px;
  width: 25%;
  margin: 0 10px;
  margin-bottom: 30px;
}

button:hover {
  background-color: #64748b;
}

button:active {
  background-color: #64748b;
}

button:disabled {
  background-color: #334155;
  color: #64748b;
}

p {
  padding: 10px 0px;
  font-size: 24px;
}

.container {
  margin: 2% auto;
  width: 85%;
  background-color: #1e293b;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

#yearContainer {
  grid-area: year;
}

#monthContainer {
  grid-area: month;
}

#dayContainer {
  grid-area: day;
}

#hourContainer {
  grid-area: hour;
}

#minuteContainer {
  grid-area: minute;
}

#secondContainer {
  grid-area: second;
}

@media screen and (max-width: 480px) {
  div.grid {
    display: flex;
    flex-direction: column;
  }
  .container {
    width: 91%;
    margin-top: 0px;
  }
}
</style>
