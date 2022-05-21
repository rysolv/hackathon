const element = document.getElementById("select"); // Variable from HTML "Select" Button
element.addEventListener("click", myFunction); // "Select" Listener, (on "click," run myFunction)
let phone_number=[];// Array to hold phone
// Select's Click listener
function myFunction() {
    // When select is clicked, add the current value to the array.
    phone_number.push(slider.value);
  console.log(phone_number);
  document.getElementById("result").innerHTML = "Current: " + phone_number.join('');
} 

const element2 = document.getElementById("clear"); // Variable from HTML "Select" Button
element2.addEventListener("click", clearCache); // "Select" Listener, (on "click," run myFunction)

// Select's Click listener
function clearCache() {
    // When select is clicked, clear the array
    phone_number = [];
  console.log(phone_number);
  document.getElementById("result").innerHTML = "Result of the phone number will be submitted here.";
} 

const element3 = document.getElementById("submit"); // Variable from HTML "Select" Button
element3.addEventListener("click", submitPhoneNumber); // "Select" Listener, (on "click," run myFunction)

// Submit's Click listener
function submitPhoneNumber() {
  // When select is clicked, present the phone number and end the script
  document.getElementById("result").innerHTML = "Submitted: " + phone_number.join('');
  alert("Thank you!");
} 


/**
 * Start of code taken from: https://www.w3schools.com/howto/howto_js_rangeslider.asp
 */
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}
/**
 * End of code taken from: https://www.w3schools.com/howto/howto_js_rangeslider.asp
 */
