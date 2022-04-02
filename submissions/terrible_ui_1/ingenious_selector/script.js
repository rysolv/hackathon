const inputEl = document.getElementById("time-range");
const parsedSpan = document.getElementById("parsed-time");

const parseInput = async () => {
    const value = inputEl.value;

    const date = new Date(parseInt(value));

    parsedSpan.innerText = date.toUTCString();
};

parseInput();
inputEl.addEventListener("change", () => parseInput());

const videoContainerEl = document.getElementById("video-container");
setTimeout(() => {
    videoContainerEl.style.display = "flex";
}, 8000);

console.log('Made by Zeeshan');