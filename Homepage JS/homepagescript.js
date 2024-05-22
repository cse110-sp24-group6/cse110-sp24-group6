// Progress Bar
const progressNumber = document.getElementById('progressNumber');
let counter = 0;

// setInterval(() => {
//     if( counter == 0 ){
//         clearInterval;
//     } else {
//         counter += 1;
//         progressNumber.innerHTML =`${counter}%`;
//     }
    
// })


// Navigation bar: Sticky
window.onscroll = function() {myFunction()};

// Get the navbar
let navBar = document.getElementsByClassName("navBar");

// Get the offset position of the navbar
let sticky = navBar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navBar.classList.add("sticky")
  } else {
    navBar.classList.remove("sticky");
  }
}