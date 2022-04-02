const FPS = 60;
let sounds = [new Audio("assets/woohoo.mp3")];

let monthValues = [[1, 2, 3, 4],
                   [5, 6, 7, 8],
                   [9, 10, 11, 12]];

class Board {
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

    win() {
        let endTime = Date.now();
        let elapsedTimeSec = Math.floor(((endTime - startTime) / 1000));
        let elapsedTimeMil = Math.floor(((endTime - startTime) % 1000));
        document.getElementById("monthOutput").innerHTML = "<p>" + elapsedTimeSec + ":" + elapsedTimeMil + "</p>";
    }

    lose() {
        document.getElementById("monthOutput").innerHTML = "<p>You lose!</p>";
        this.completed = true;

        window.setTimeout(resetBoard, 4000);
    }

    getSelectedCellIdInRow(row) {
        for(let i = 0; i < this.cols; i++) {
            if(this.cells[row][i] == 1) {
                return i;
            }
        }

        return -1;
    }

    checkStack() {
        console.log(this.lastCompletedRow);

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
            this.win();
        }
        else if(!stackingCorrectly) {
            this.lose();
        }

        console.log(stackingCorrectly);
    }

    handleClick() {
        if(this.lastCompletedRow - 1 < 0) {
            this.completed = true;
        }

        this.checkStack();

        this.lastCompletedRow--;
    }

    updateBoard() {
        if(this.completed)
            return;

        if(++this.ticksSinceLastUpdate >= this.speed[this.lastCompletedRow]) {

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
        document.getElementById(this.divId + "Output").innerHTML = "";

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

let board1 = new Board("month", "month", 3, 4, [20, 20, 20], monthValues);
let boards = [board1];

function update() {
    for(let i = 0; i < boards.length; i++) {
        if(!boards[i].completed) {
            boards[i].updateBoard();
        }
    }
}

function draw() {
}

function end() {

}

function resetBoard() {
    board1.reset();
}

function pageClick() {
    board1.handleClick();
    sounds[0].cloneNode(true).play();
}

MainLoop.setMaxAllowedFPS(FPS);
MainLoop.setUpdate(update).setDraw(draw).setEnd(end).start();
let startTime = Date.now();

document.body.addEventListener('click', pageClick, true);

