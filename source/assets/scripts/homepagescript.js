// Progress Bar
// const progressNumber = document.getElementById('progressNumber');
// let counter = 0;

// setInterval(() => {
//     if( counter == 0 ){
//         clearInterval;
//     } else {
//         counter += 1;
//         progressNumber.innerHTML =`${counter}%`;
//     }
    
// })


// // Navigation bar: Sticky
// window.onscroll = function() {myFunction()};

// // Get the navbar
// let navBar = document.getElementsByClassName("navBar");

// // Get the offset position of the navbar
// let sticky = navBar.offsetTop;

// // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     navBar.classList.add("sticky")
//   } else {
//     navBar.classList.remove("sticky");
//   }
// }

/* Project Sectiom Javascript*/
/* Temporary functions to load 4 project card elements onto the page, delete or modify after CRUD and local storage for projects has been implemented*/
function addProject(data){
  let newProject = document.createElement('project-card');
  newProject.data = data;
  document.querySelector('.project-cards-grid').append(newProject);
}

function init(){
  const brown_proj_data = {
    title: "Project Brown",
    description: "This is the project description",
    githubURL: "https://github.com/",
    completed: false,
    color: "brown"
  }
  const green_proj_data = {
    title: "Project Green",
    description: "This is the project description",
    githubURL: "https://github.com/",
    completed: false,
    color: "green"
  }
  const white_proj_data = {
    title: "Gaming App",
    description: "This is the project description",
    githubURL: "https://github.com/",
    completed: false,
    color: "white"
  }
  const cream_proj_data = {
    title: "Webtool App",
    description: "This is the project description",
    githubURL: "https://github.com/",
    completed: true,
    color: "cream"
  }
  addProject(brown_proj_data);
  addProject(green_proj_data);
  addProject(cream_proj_data);
  addProject(white_proj_data);
}

document.addEventListener('DOMContentLoaded', init);

// Update daily streak
function updateDailyStreak() {
    const currentDate = new Date().toLocaleDateString();
    const lastVisit = localStorage.getItem('lastVisit');
    let streak = parseInt(localStorage.getItem('streak'), 10);
    if (lastVisit === currentDate) {
        document.getElementById('daily-streak').textContent = streak;
        console.log("Current Streak:", streak);
        return;
    }
    const lastVisitDate = new Date(lastVisit);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastVisitDate.toLocaleDateString() === yesterday.toLocaleDateString()) {
        streak += 1;
    } else {
        streak = 1;
    }
    //saves streak and date to browser
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastVisit', currentDate);
    document.getElementById('daily-streak').textContent = streak;
    console.log("New Streak:", streak);
  }
  // Update daily streak visual
  // Need to fix so that it only fills days visited if missed streak
  function updateDailyStreakVisual() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const lastVisit = localStorage.getItem('lastVisit');
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const checkedImgSrc = "../HTML_homepage_pics/checked_in.png";
    const uncheckedImgSrc = "../HTML_homepage_pics/unchecked.png";
    dayNames.forEach(day => {
      document.getElementById(day + 'Circle').src = uncheckedImgSrc;
    });
    if (lastVisit) {
      const lastVisitDate = new Date(lastVisit);
      const yesterday = new Date();
      yesterday.setDate(currentDate.getDate() - 1);
      if (lastVisitDate.toLocaleDateString() === yesterday.toLocaleDateString() ||
        lastVisitDate.toLocaleDateString() === currentDate.toLocaleDateString()) {
        for (let i = 0; i <= currentDay; i++) {
          document.getElementById(dayNames[i] + 'Circle').src = checkedImgSrc;
        }
      }
    }
  }
  updateDailyStreak();
  updateDailyStreakVisual();