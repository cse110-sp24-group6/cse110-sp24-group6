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
  // Check if there is a log today, and add to streak 
  if (getLog(day)) { 
    streak += 1; 
  }
  // Set day to yesterday 
  day = new Date(Date.now()-(24*60*60*1000)); 
  // Find out if there was a previous streak 
  for (let i = 0; i < Object.keys(logs).length; i++) { 
    // If there is a log for the day, add to streak 
    if (getLog(day)) { 
      streak += 1; 
      day = new Date(Date.now()-((i+2)*24*60*60*1000)); 
    // If a log was skipped, streak is broken - exit for loop 
    } else { 
      day = new Date(Date.now()-((i+1)*24*60*60*1000)); 
      if (getLog(day)) { 
        streak += 1; 
        day = new Date(Date.now()-((i+1)*24*60*60*1000));
      } else { 
        break; 
      }
    }
  }
  return streak; 
}

// Local storage for streak 
function getStreakFromStorage() { 
  let streak = localStorage.getItem('streak'); 
  let returnStreak; 
  if (streak) { 
    returnStreak = parseInt(streak,10); 
  } else { 
    returnStreak = 0; 
  }
  return returnStreak;
}

function setStreakToStorage(streak) { 
  return localStorage.setItem('streak', JSON.stringify(streak));
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

// Converts 0-6 to appropriate IDs
function convertID(num) { 
  let id ='';
  if (num===0) { 
    id='sunday-circle';
  } else if (num===1) { 
    id='monday-circle';
  } else if (num===2) { 
    id='tuesday-circle';
  } else if (num===3) { 
    id='wednesday-circle';
  } else if (num===4) { 
    id='thursday-circle';
  } else if (num===5) { 
    id='friday-circle';
  } else if (num===6) { 
    id='saturday-circle';
  }
  return id; 
}

// Reset localStorage to blank and all images to blank as well on Sunday 
function sundayReset() { 
  const uncheckedImgSrc = "../source/assets/HTML_homepage_pics/unchecked.png"; 
  let circles = getCirclesFromStorage();
  for (let i = 0; i < 7; i++) { 
    circles[`${i}`]  = uncheckedImgSrc;
    document.getElementById(convertID(i)).src = circles[`${i}`] ; 
  }
  setCirclesToStorage(circles);
}

function weekFillIn() {
  // Set variables  
  let todaysDate = new Date(); 
  let today = todaysDate.getDay(); 
  let circles = getCirclesFromStorage();
  const checkedImgSrc = "../source/assets/HTML_homepage_pics/checked_in.png";
  // If today is Sunday (0), reset the circles 
  if (today===0) { 
    sundayReset();
  }
  // Integrate daily log data to circles 
  for (let i = 0; i < 7; i++) { 
    // Get all logs from Sunday to today
    let day = new Date(Date.now()-(parseInt(today-i,10)*24*60*60*1000));
    let log = getLog(day); 
    // if a log exists, fill in the circle and update local storage 
    if (log) { 
      circles[`${i}`] = checkedImgSrc;
    }
    // Make sure homapage is up to date with localStorage 
    document.getElementById(convertID(day.getDay())).src = circles[`${i}`] ;
  }
  setCirclesToStorage(circles);
}

weekFillIn(); 
setStreakToStorage(findStreak()); 
document.getElementById('daily-streak').textContent = getStreakFromStorage();

document.addEventListener('DOMContentLoaded', () => {
  init(); // Initialize project cards
  setupEditButtons(); // Setup edit buttons
});

function setupEditButtons() {
  const editIcons = document.querySelectorAll('.edit-icon');
  editIcons.forEach(icon => {
      icon.addEventListener('click', openEditForm);
  });
}

let currentProjectCard = null;

// Function to open the edit form with the project data
function openEditForm(event) {
  currentProjectCard = event.target.closest('.project-cards');
  document.querySelector("#input-project-name").value = currentProjectCard.querySelector('h4').innerText;
  document.querySelector("#input-project-description").value = currentProjectCard.querySelector('p').innerText;
  document.querySelector("#input-github-link").value = currentProjectCard.querySelector('.github-icon').parentElement.href;
  document.querySelector("#completed-select-box").value = currentProjectCard.querySelector('.status-icon').src.includes('completed') ? 'completed' : 'current';

  // Display the form
  document.querySelector('.edit-overlay').style.display = "flex";
}

const saveButton = document.querySelector("#save-button");
saveButton.addEventListener('click', saveProjectDetails);

function saveProjectDetails() {
  const projectName = document.querySelector("#input-project-name").value;
  const projectDescription = document.querySelector("#input-project-description").value;
  const githubLink = document.querySelector("#input-github-link").value;
  const projectStatus = document.querySelector("#completed-select-box").value;

  if (currentProjectCard) {
      currentProjectCard.querySelector('h4').innerText = projectName;
      currentProjectCard.querySelector('p').innerText = projectDescription;
      currentProjectCard.querySelector('.github-icon').parentElement.href = githubLink;
      currentProjectCard.querySelector('.status-icon').src = `assets/icons/homepage/${projectStatus}_project/${currentProjectCard.classList.contains('green') ? 'green' : 'blue'}.svg`;
  }

  // Hide the form after saving
  document.querySelector('.edit-overlay').style.display = "none";
}

// Example function to add project cards dynamically
function addProject(data) {
  const articleEl = document.createElement('article');
  articleEl.innerHTML = 
      `<div class="project-cards ${data.color}">
          <img class="journal-pic" src="assets/icons/homepage/daily_log/daily_log_${data.color}.png" alt="daily log icon"/>
          <h4><b>${data.title}</b></h4> 
          <p>${data.description}</p> 
          <hr>
          <div class="menu-icons">
              <img class="edit-icon" src="assets/icons/homepage/edit/edit_icon_${data.color}.svg" alt="edit icon"/>
              <a href="${data.githubURL}"><img class="github-icon" src="assets/icons/homepage/github/github_icon_${data.color}.svg" alt="github icon"/></a>
              <img class="status-icon" src="assets/icons/homepage/${data.completed ? 'completed' : 'current'}_project/${data.color}.svg" alt="status icon">
          </div>
      </div>`;
  document.querySelector('.project-cards-grid').append(articleEl);
  setupEditButtons(); // Attach event listeners to the new edit icons
}

// Initialize project cards
function init() {
  // Sample data
  const projects = [
      { title: 'Project One', description: 'Description for project one', githubURL: 'https://github.com/projectone', color: 'green', completed: false },
      { title: 'Project Two', description: 'Description for project two', githubURL: 'https://github.com/projecttwo', color: 'blue', completed: true }
  ];

  projects.forEach(project => addProject(project));
}
