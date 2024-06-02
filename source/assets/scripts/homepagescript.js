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
//CAN DELETE LATER
function addProject(data){
  let newProject = document.createElement('project-card');
  newProject.data = data;
  document.querySelector('.project-cards-grid').append(newProject);
}
//DELETE inside of init() after CRUD is implemented for projects, inside code adds temporary project cards to page
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
  addProject(green_proj_data);
  addProject(cream_proj_data);
}

document.addEventListener('DOMContentLoaded', init);

/* Daily Log Streak implementation */ 
function getLogsFromStorage() { 
  let logs = localStorage.getItem('logs');
  let returnLog;
  if (logs) {
      returnLog = JSON.parse(logs);
      return returnLog;
  }
  else {
      returnLog = {};
      return returnLog;
  }
}


// Get the log for given date 
function getLog(date) { 
  let logs = getLogsFromStorage(); 
  return logs[dateToString(date)];

}

// Loop through logs to count consecutive logs from today's date 
function findStreak() { 
  let streak = 0; 
  let logs = getLogsFromStorage(); 
  let day = new Date();
  // Loop through logs starting from today's log
  // If there is a log for current date, increment streak and go to day before current date
  // If there is no log, stop for-loop
  for (let i = 0; i < Object.keys(logs).length; i++) { 
    if (getLog(day)) { 
      streak += 1; 
      day = new Date(Date.now()-((i+1)*864e5)); 
    } else { 
      break;
    }
  }
  return streak; 
}

// Local storage for streak 
function getStreakFromStorage() { 
  let streak = localStorage.getItem('streak'); 
  let returnStreak; 
  if (streak) { 
    returnStreak = parseInt(streak); 
  } else { 
    returnStreak = findStreak(); 
  }
  return returnStreak;
}


// Get and set circles to local storage 
function getCirclesFromStorage() { 
  let circles = localStorage.getItem('circles');
  let returnCircles; 
  if (circles) { 
    returnCircles = JSON.parse(circles);
  } else { 
    // If circles is not in local storage, create dictionary
    // 0 = Sunday, 1 = Monday, 2 = Tuesday, ...
    // All images are unchecked 
    const uncheckedImgSrc = "../source/assets/HTML_homepage_pics/unchecked.png";
    returnCircles = {};
    returnCircles['0'] = uncheckedImgSrc;
    returnCircles['1'] = uncheckedImgSrc;
    returnCircles['2'] = uncheckedImgSrc;
    returnCircles['3'] = uncheckedImgSrc;
    returnCircles['4'] = uncheckedImgSrc;
    returnCircles['5'] = uncheckedImgSrc;
    returnCircles['6'] = uncheckedImgSrc;
  }
  return returnCircles; 
}

function setCirclesToStorage(circles) { 
  return localStorage.setItem('circles',JSON.stringify(circles));
}
// Function takes in a Date object and converts it to string compatible with other functions
function dateToString(date) { 
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}


// Reset localStorage to blank and all images to blank as well on Sunday 
function sundayReset() { 
  const uncheckedImgSrc = "../source/assets/HTML_homepage_pics/unchecked.png"; 
  let circles = getCirclesFromStorage();
  for (let i = 0; i < 7; i++) { 
    circles[i] = uncheckedImgSrc;
    document.getElementById(i).src = circles[i]; 
  }
}

function weekFillIn() {
  // Set variables  
  let todaysDate = new Date(); 
  let today = todaysDate.getDay(); 
  let circles = getCirclesFromStorage();
  const checkedImgSrc = "../source/assets/HTML_homepage_pics/checked_in.png";
  // If today is Sunday (0), reset the circles 
  if (today==0) { 
    sundayReset();
  }
  // Integrate daily log data to circles 
  for (let i = 0; i < 7; i++) { 
    // Get all logs from Sunday to today
    let day = new Date(Date.now()-(parseInt(today-i)*864e5));
    let log = getLog(day); 
    // if a log exists, fill in the circle and update local storage 
    if (log) { 
      circles[i] = checkedImgSrc;
    }
    // Make sure homapage is up to date with localStorage 
    document.getElementById(day.getDay()).src = circles[i];
  }
}

weekFillIn(); 
document.getElementById('daily-streak').textContent = getStreakFromStorage();
