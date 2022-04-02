class Board {
    STATE_LOSS = 0;
    STATE_WIN = 1;

    constructor(divId, name, rows, cols, speed, values) {
        // Passed in values
        this.divId = divId;
        this.name = name;
        this.rows = rows;
        this.cols = cols;
        this.speed = speed;
        this.values = values;

        // Board details
        this.completed = false;
        this.reverse = false;

        this.reset();

        this.create();
    }

    completeBoard(gameState) {
        if(gameState == this.STATE_WIN) {
            addTimeToOutput(this, true);
            this.completed = true;
        }
        else if(gameState == this.STATE_LOSS) {
            document.getElementById("gameStatusOutput").textContent = "You lost! Please try again.";
    
            toggleGameState();
        }
    }

    getSelectedCellIdInRow(row) {
        for(let i = 0; i < this.cols; i++) {
            if(this.cells[row][i] == 1) {
                return i;
            }
        }

        return -1;
    }

    // Returns the index of the highest stacked row
    getHighestRowId(won) {
        return this.lastCompletedRow + (won ? 0 : 1);
    }

    // Returns the index of the highest stacked column
    getHighestColId(won) {
        return this.getSelectedCellIdInRow(this.lastCompletedRow + (won ? 0 : 1));
    }

    getValue(row, col) {
        return this.values[row][col];
    }

    /* Returns the current row's speed. Returns
       a specific speed value if the board has
       multiple speeds set or a constant if not. */
    getRowSpeed(row) {
        if(Array.isArray(this.speed)) {
            return this.speed[row];
        }
        else {
            return this.speed;
        }
    }

    checkStack() {
        // If the player is placing their first block, don't check the stack
        // as any column is a valid spot
        if(this.lastCompletedRow == (this.rows - 1)) {
            return;
        }

        let colId = this.getSelectedCellIdInRow(this.lastCompletedRow);

        let stackingCorrectly = true;
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(j != colId && this.cells[i][j] == 1) {
                    stackingCorrectly = false;
                }
            }
        }

        if(stackingCorrectly && this.completed) {
            this.completeBoard(this.STATE_WIN);
        }
        else if(!stackingCorrectly) {
            this.completeBoard(this.STATE_LOSS);
        }

        console.log(stackingCorrectly);
    }

    handleClick() {
        // If all rows have been checked, the board is completed
        if(this.lastCompletedRow - 1 < 0) {
            this.completed = true;
        }

        this.checkStack();

        this.lastCompletedRow--;

        continueButton.disabled = false;
    }

    updateBoard() {
        if(this.completed)
            return;

        if(++this.ticksSinceLastUpdate >= this.getRowSpeed(this.lastCompletedRow)) {

            // Find and save the selected cell in the active row
            let selectedCellInRow = 0;
            for(let i = 0; i < this.cols; i++) {
                if(this.cells[this.lastCompletedRow][i] == 1) {
                    selectedCellInRow = i;
                    break;
                }
            }

            // Clear out the entire active row
            this.cells[this.lastCompletedRow].fill(0);

            if(!this.reverse && selectedCellInRow + 1 >= this.cols) {
                this.reverse = true;
                selectedCellInRow = this.cols - 2;
                this.cells[this.lastCompletedRow][selectedCellInRow] = 1;
            }
            else if(this.reverse && selectedCellInRow - 1 <= 0) {
                this.reverse = false;
                selectedCellInRow = 0;
                this.cells[this.lastCompletedRow][selectedCellInRow] = 1;
            }
            else {
                this.cells[this.lastCompletedRow][this.reverse ? --selectedCellInRow : ++selectedCellInRow] = 1;
            }

            this.ticksSinceLastUpdate = 0;

            for(let i = (this.lastCompletedRow * this.cols); i < (this.lastCompletedRow * this.cols) + this.cols; i++) {
                document.getElementById(this.name + "_" + i).classList.remove("selected");
            }

            document.getElementById(this.name + "_" + ((this.lastCompletedRow * this.cols) + selectedCellInRow)).classList.add("selected");
        
        }
    }

    create() {
        let tableHtml = "";
        tableHtml += "<table>";

        for(let i = 0; i < this.rows; i++) {
            tableHtml += "<tr>";

            for(let j = 0; j < this.cols; j++) {

                // Make the first cell of the last row selected by default at the beginning of the game
                if(j == 0 && (i + 1 >= this.rows)) {
                    tableHtml += "<td id=\"" + this.name + "_" + ((i * this.cols) + j) + "\" class=\"selected\">" + this.values[i][j] + "</td>";
                }
                else {
                    tableHtml += "<td id=\"" + this.name + "_" + ((i * this.cols) + j) + "\">" + this.values[i][j] + "</td>";
                }
            }

            tableHtml += "</tr>"
        }

        tableHtml += "</table>";
        document.getElementById(this.divId).innerHTML = tableHtml;
    }

    reset() {
        // Reset the board's completion state if needed
        if(this.completed) {
            this.completed = false;
        }

        // Make sure the board is going forwards at the start
        if(this.reverse) {
            this.reverse = false;
        }

        // Deselect any cells currently selected and clear out the board's output area
        document.querySelectorAll("#" + this.divId + " table tr .selected").forEach((e) => { e.classList.remove("selected"); });

        // The number of ticks since a block was updated
        this.ticksSinceLastUpdate = 0;
        this.lastCompletedRow = this.rows - 1;

        // An array containing all of the cells of the board and their selection state
        this.cells = [];
        for(let i = 0; i < this.rows; i++) {
            // Intialize all cells to a de-selected state (0)
            this.cells[i] = Array(this.cols).fill(0);
        }

        console.log(this);
        // Set the first cell of the last row to selected when the board is created
        this.cells[this.rows - 1][0] = 1;
    }
}

const FPS = 60;
let sounds = [new Audio("assets/woohoo.mp3")];
let startTime = null;
let gameStarted = false;
let gameRunning = false;
let focused = true;

let timer;
let seconds = 0, milliseconds = 0;

let monthValues = [[1, 2, 3, 4],
                   [5, 6, 7, 8],
                   [9, 10, 11, 12]];

let monthNames = ["January", "February", "March", "April",
                  "May", "June", "July", "August", 
                  "September", "October", "November", "December"];

let dayValues = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                  [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]];

let yearValues = [[2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
                  [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
                  [1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002],
                  [1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992],
                  [1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982],
                  [1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972],
                  [1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962],
                  [1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952],
                  [1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942],
                  [1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932]]

let board1 = new Board("month", "month", 3, 4, [20, 20, 20], monthValues);
let board2 = new Board("day", "day", 2, 16, 3, dayValues);
let board3 = new Board("year", "year", 10, 10, 40, yearValues);

let boards = [board1, board2, board3];

let continueButton = document.getElementById("continue");
let statusOutput = document.getElementById("gameStatusOutput");
let timeOutput = document.getElementById("timeOutput");

let month = "";
let day   = "";
let year  = "";

function update() {
    if(focused) {
        getActiveBoard().updateBoard();
    }
}

function getActiveBoard() {
    if(!board1.completed) {
        return board1;
    }
    else if(!board2.completed) {
        return board2;
    }
    else {
        return board3;
    }
}

function boardClick() {
    if(!gameRunning)
        return;

    getActiveBoard().handleClick();
    sounds[0].cloneNode(true).play();
}

function addTimeToOutput(board, won) {
    let row = board.getHighestRowId(won);
    let col = board.getHighestColId(won);

    // Return the alphabetical month name if the first board is being processed
    if(board.name == "month") {
        month = monthNames[board.getValue(row, col) - 1];
    }
    else if(board.name == "day") {
        day = board.getValue(row, col);
    }
    else if(board.name == "year") {
        year = board.getValue(row, col);
    }
    
}

function toggleButtons(running) {
    if(running) {
        document.getElementById("start").textContent = "Quit game";
        continueButton.classList.remove("hidden");
    }
    else {
        document.getElementById("start").textContent = "Start game";
        continueButton.classList.add("hidden");
    }
}

function toggleGameState(outputDate = false) {
    if(gameRunning) {
        for(let i = 0; i < boards.length; i++) {
            boards[i].completed = true;
        }

        // Output the date if the game is won
        if(outputDate) {
            let minutes = 0, hour = 0, ampm = "", inFront = false;

            if((milliseconds / 10) >= 60) {
                hour++;
                milliseconds -= 600;
                console.log(milliseconds);

                if(milliseconds < 100) {
                    minutes = (milliseconds / 10).toString().split('').reverse().join('');
                }
                else {
                    minutes = (milliseconds / 10);
                }
            }
            else {
                minutes = milliseconds / 10;
            }

            //let minutes = ((milliseconds / 10) >= 60 ?);
            hour += (seconds > 60 ? seconds - 60 : seconds);

            ampm = (seconds > 60 ? "pm" : "am");

            if(hour > 12) {
                hour -= 12;
                ampm = (ampm == "pm" ? "am" : "pm");
            }

            if(!(minutes instanceof String) && minutes.toString().length == 1) {
                minutes *= 10;
            }

            timeOutput.textContent = "Selected date/time: " + (month + " " + day + ", " + year) + " " + hour + ":" + minutes + ampm;
        }

        gameRunning = false;

        pauseTimer();
        toggleButtons(false);
    }
    else {
        if(gameStarted) {
            for(let i = 0; i < boards.length; i++) {
                boards[i].reset();
            }

            statusOutput.textContent = "";
            timeOutput.textContent   = "";
        }

        start();
        toggleButtons(true);
    }
}

function allBoardsCompleted() {
    let b = true;
    for(let i = 0; i < boards.length; i++) {
        if(!boards[i].completed) {
            b = false;
        }
    }

    return b;
}

function nextBoard() {
    let b = getActiveBoard();
    let row = b.getHighestRowId(false);
    let col = b.getHighestColId(false);
    console.log(row + " | " + col);
    addTimeToOutput(b, false);

    for(let i = 0; i < b.cols; i++) {
        document.getElementById(b.name + "_" + (((row - 1) * b.cols) + i)).classList.remove("selected");
    }

    b.completed = true;
    continueButton.disabled = true;

    if(allBoardsCompleted()) {
        toggleGameState(true);
    }
}

// Timer functions below referenced from https://dev.to/walternascimentobarroso/creating-a-timer-with-javascript-8b7
function startTimer() {
    milliseconds = 0;
    seconds = 0;

    pauseTimer(timer);
    timer = setInterval(() => { incrementTimer(); }, 10);
}

function pauseTimer() {
    clearInterval(timer);
}

function incrementTimer() {
    if((milliseconds += 10) == 1000) {
        milliseconds = 0;
        seconds++;
    }
    if(seconds > 120) {
        seconds = 0;
        toggleGameState(false);
    }

    document.getElementById('seconds').innerText = returnData(seconds);
    document.getElementById('milliseconds').innerText = returnData(milliseconds);
}
  
function returnData(input) {
    return input > 10 ? input : `0${input}`;
}

function start() {
    // Set the FPS of the game and start it. Also save the start time of the game
    MainLoop.setMaxAllowedFPS(FPS);
    MainLoop.setUpdate(update).start();
    gameStarted = true;
    gameRunning = true;
    
    // Start the timer
    startTimer();
}

document.querySelectorAll(".board").forEach( (board) => {board.addEventListener('click', boardClick, true)});
document.getElementById("start").addEventListener('click', (e => {toggleGameState(false); }));
continueButton.addEventListener('click', nextBoard);

// Pause the scrolling of the boards if the page goes out of focus
window.addEventListener('focus', function() {
    focused = true;
});

window.addEventListener('blur', function() {
    focused = false;
});
  


