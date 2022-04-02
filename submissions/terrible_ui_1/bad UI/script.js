const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = 0.0000001

//function createDays () {
 // let monthDiv = document.getElementById('months');
  
 // for(let i = 1; i <= 12; i++) {
 //   let tempDiv = document.createElement('div')
 //   tempDiv.classList.add('month')
 //   tempDiv.addEventListener('click', function() {
 //     changeColor(tempDiv)
//    })
    
 //   tempDiv.innerHTML = i;
 //   console.log(monthDiv)
  //  monthDiv.appendChild(tempDiv);
 // }  
    
 // }
//createDays();


 class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem
    this.reset()
  }
   
  

  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
  }

  set x(value) {
    this.ballElem.style.setProperty("--x", value)
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
  }

  set y(value) {
    this.ballElem.style.setProperty("--y", value)
  }

  rect() {
    return this.ballElem.getBoundingClientRect()
  }
  
   reset() {
    this.x = 50
    this.y = 50
    this.direction = { x: 0 }
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI)
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    this.velocity = INITIAL_VELOCITY
  }
  
   update(delta) {
    this.x += this.direction.x * this.velocity * delta
    this.y += this.direction.y * this.velocity * delta
    this.velocity += VELOCITY_INCREASE * delta
    const rect = this.rect()

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1
    }

    if (rect.right >= window.innerWidth || rect.left <=0) {
      this.direction.x *= -1
    }

  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min
}

const ball = new Ball(document.getElementById("ball"))
let jan = new Ball(document.getElementById('Jan'))
const feb = new Ball(document.getElementById('Feb'))
const mar = new Ball(document.getElementById('Mar'))
const apr = new Ball(document.getElementById('April'))
const may = new Ball(document.getElementById('May'))
const june = new Ball(document.getElementById('June'))
const july = new Ball(document.getElementById('July'))
const august = new Ball(document.getElementById('August'))
const september = new Ball(document.getElementById('September'))
const october = new Ball(document.getElementById('October'))
const november = new Ball(document.getElementById('November'))
const december = new Ball(document.getElementById('December'))

let numbers = [];
//console.log(numbers)
function numbersSet() {
let days = document.getElementById('days')
//for(let i = 0; i < 31; i++) {
  for(let k = 0; k <= 31; k++) {
    let tempDiv = document.createElement('div');
    tempDiv.classList.add('month')
    tempDiv.addEventListener('click', function(event) {
      let handle = event.target;
      let clickedDay = handle.innerHTML;
      let hold = document.getElementById('hold');
  hold.innerHTML += " " + clickedDay;
 
      
      let dayDiv = document.getElementById('days')
    //  console.log(dayDiv)
      removeHandler2(dayDiv)
    })
    tempDiv.setAttribute('id', k)
    tempDiv.innerHTML = k
    days.appendChild(tempDiv)
    
  //  console.log(tempDiv)
    //days.appendChild(tempDiv)
   numbers.push(new Ball(tempDiv))
  // console.log(numbers)
  }
 // numbers.push(new Ball(tempDiv[k]))
}
//console.log(numbers)

function handleClick(event) {
  let handle = event;
  let clickedMonth = handle.innerHTML;
  let hold = document.getElementById('hold');
  hold.innerHTML = clickedMonth;
 // console.log(hold.innerHTML)
  
  let monthsDiv = document.getElementById('months');
  removeHandler(monthsDiv);
  
}

function removeHandler(e) {
  console.log(e)
   while (e.firstChild) {
    e.removeChild(e.firstChild)
  }
 numbersSet()
}

function removeHandler2(e) {
  console.log(e)
   while (e.firstChild) {
    e.removeChild(e.firstChild)
  }
let button = document.createElement('button')
button.innerHTML = "Submit"
button.classList.add('button')
let container = document.getElementById('hold')
container.appendChild(button)
  console.log(container)
}




let lastTime
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta)
    jan.update(delta)
    feb.update(delta)
    mar.update(delta)
     apr.update(delta)
    may.update(delta)
    june.update(delta)
    july.update(delta)
    august.update(delta)
    september.update(delta)
    october.update(delta)
    november.update(delta)
    december.update(delta)
    for(let i = 0; i < numbers.length; i++) {
        numbers[i].update(delta)
    }
  // numbers[i].update(delta)
    
    
   
  }



  lastTime = time
  window.requestAnimationFrame(update)
}




window.requestAnimationFrame(update);