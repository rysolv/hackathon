import { defineStore } from "pinia";

export const useMainStore = defineStore("mainStore", {
  state: () => {
    return {
      date: {
        year: {
          value: 1970,
          min: 1970,
          max: 2050,
          isSet: false,
        },
        month: {
          value: 1,
          min: 1,
          max: 12,
          isSet: false,
        },
        day: {
          value: 1,
          min: 1,
          max: 31,
          isSet: false,
        },
        hour: {
          value: 0,
          min: 0,
          max: 23,
          isSet: false,
        },
        minute: {
          value: 0,
          min: 0,
          max: 59,
          isSet: false,
        },
        second: {
          value: 0,
          min: 0,
          max: 59,
          isSet: false,
        },
      },
    };
  },
  getters: {
    allDataSet() {
      return (
        this.date.year.isSet &&
        this.date.month.isSet &&
        this.date.day.isSet &&
        this.date.hour.isSet &&
        this.date.minute.isSet &&
        this.date.second.isSet
      );
    },
    getDate() {
      return new Date(
        this.date.year.value,
        this.date.month.value - 1,
        this.date.day.value,
        this.date.hour.value,
        this.date.minute.value,
        this.date.second.value
      ).toLocaleString("en-US");
    },
    getMonth() {
      switch (this.getMonthMiddle) {
        case 1:
          this.date.day.max = 31;
          return "January";
        case 2:
          this.date.day.max = this.date.year.value % 4 === 0 ? 29 : 28;
          return "February";
        case 3:
          this.date.day.max = 31;
          return "March";
        case 4:
          this.date.day.max = 30;
          return "April";
        case 5:
          this.date.day.max = 31;
          return "May";
        case 6:
          this.date.day.max = 30;
          return "June";
        case 7:
          this.date.day.max = 31;
          return "July";
        case 8:
          this.date.day.max = 31;
          return "August";
        case 9:
          this.date.day.max = 30;
          return "September";
        case 10:
          this.date.day.max = 31;
          return "October";
        case 11:
          this.date.day.max = 30;
          return "November";
        case 12:
          this.date.day.max = 31;
          return "December";
        default:
          return "";
      }
    },
    getYearMiddle() {
      return Math.round((this.date.year.min + this.date.year.max) / 2);
    },
    getMonthMiddle() {
      return Math.round((this.date.month.min + this.date.month.max) / 2);
    },
    getDayMiddle() {
      return Math.round((this.date.day.min + this.date.day.max) / 2);
    },
    getHourMiddle() {
      return Math.round((this.date.hour.min + this.date.hour.max) / 2);
    },
    getMinuteMiddle() {
      return Math.round((this.date.minute.min + this.date.minute.max) / 2);
    },
    getSecondMiddle() {
      return Math.round((this.date.second.min + this.date.second.max) / 2);
    },
    yearMinButtonDisabled() {
      return this.date.year.min === this.getYearMiddle || this.date.year.isSet === true;
    },
    yearMaxButtonDisabled() {
      return this.date.year.max === this.getYearMiddle || this.date.year.isSet === true;
    },
    monthMinButtonDisabled() {
      return this.date.month.min === this.getMonthMiddle || this.date.month.isSet === true;
    },
    monthMaxButtonDisabled() {
      return this.date.month.max === this.getMonthMiddle || this.date.month.isSet === true;
    },
    dayMinButtonDisabled() {
      return this.date.day.min === this.getDayMiddle || this.date.day.isSet === true;
    },
    dayMaxButtonDisabled() {
      return this.date.day.max === this.getDayMiddle || this.date.day.isSet === true;
    },
    hourMinButtonDisabled() {
      return this.date.hour.min === this.getHourMiddle || this.date.hour.isSet === true;
    },
    hourMaxButtonDisabled() {
      return this.date.hour.max === this.getHourMiddle || this.date.hour.isSet === true;
    },
    minuteMinButtonDisabled() {
      return this.date.minute.min === this.getMinuteMiddle || this.date.minute.isSet === true;
    },
    minuteMaxButtonDisabled() {
      return this.date.minute.max === this.getMinuteMiddle || this.date.minute.isSet === true;
    },
    secondMinButtonDisabled() {
      return this.date.second.min === this.getSecondMiddle || this.date.second.isSet === true;
    },
    secondMaxButtonDisabled() {
      return this.date.second.max === this.getSecondMiddle || this.date.second.isSet === true;
    },
  },
  actions: {
    setMin(payload) {
      this.date[payload.type].min = payload.value;
    },
    setMax(payload) {
      this.date[payload.type].max = payload.value;
    },
    setDate(payload) {
      this.date[payload.type].value = payload.value;
      this.date[payload.type].isSet = true;
    },
  },
});
