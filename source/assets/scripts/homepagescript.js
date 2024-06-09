/* Project Sectiom Javascript*/
/* Temporary functions to load 4 project card elements onto the page, delete or modify after CRUD and local storage for projects has been implemented*/

/* For edit project form*/
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");
  init(); // Initialize project cards
  setupEditButtons(); // Setup edit buttons
  addButton();
  setupDeleteButtons();
});

function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll('.delete-project-pic');
    deleteButtons.forEach(delbutton => {
    delbutton.addEventListener('click', deleteProject);
  });
}
// function deleteProject(event) {
//   currentProjectCard = event.target.closest('.project-card');
//   if (currentProjectCard) {
//     let title = currentProjectCard.querySelector('.project-title').innerText;
//     const projectsArray = getProjectsFromStorage();
//     let index = projectsArray.findIndex(project => project.title === title);
//     projectsArray.splice(index, 1);
//     // console.log(projectsArray);
//     document.querySelector('.project-cards-grid').remove(currentProjectCard);
//     localStorage.setItem('projects', JSON.stringify(projectsArray));
//   }
// }
function deleteProject(event) {
  const projectCard = event.target.closest('.project-card');
  if (projectCard) {
    const projectTitle = projectCard.querySelector('.project-title').innerText;
    const projectsArray = getProjectsFromStorage();
    const projectIndex = projectsArray.findIndex(project => project.title === projectTitle);
    if (projectIndex !== -1) {
      projectsArray.splice(projectIndex, 1);
      localStorage.setItem('projects', JSON.stringify(projectsArray));
      projectCard.remove();
    } else {
      console.log("Project not found");
    }
  } else {
    console.log("No project card found");
  }
}

function setupEditButtons() {
  const editIcons = document.querySelectorAll('.edit-icon');
    editIcons.forEach(icon => {
    icon.addEventListener('click', openEditForm);
  });
}

function addButton() {
  let add = document.getElementById("add-button");
  add.addEventListener('click', openAddForm);
}

function openAddForm() {
    // Display the form
    document.querySelector('.edit-overlay').style.display = "flex";
}

let currentProjectCard = null;

function openEditForm(event) {
  currentProjectCard = event.target.closest('.project-card');
  if (currentProjectCard) {
    document.querySelector("#input-project-name").value = currentProjectCard.querySelector('.project-title').innerText;
    document.querySelector("#input-project-description").value = currentProjectCard.querySelector('.project-description').innerText;
    document.querySelector("#input-github-link").value = currentProjectCard.querySelector('.github-link').href;
    document.querySelector("#completed-select-box").value = currentProjectCard.querySelector('.status-icon').alt.includes('completed') ? 'completed' : 'current';

    // Display the form
    document.querySelector('.edit-overlay').style.display = "flex";
    console.log("Edit form displayed");
  } else {
    console.log("No project card found");
  }
}

const saveButton = document.querySelector("#save-button");
saveButton.addEventListener('click', saveProjectDetails);

function saveProjectDetails() {
  const projectName = document.querySelector("#input-project-name").value;
  const projectDescription = document.querySelector("#input-project-description").value;
  const githubLink = document.querySelector("#input-github-link").value;
  const projectStatus = document.querySelector("#completed-select-box").value;
  data = {
    title: projectName,
    description: projectDescription,
    githubURL: githubLink,
    completed: projectStatus === 'current' ? false : true,
    color: "brown"
  };
  if (currentProjectCard) {
    const projectsArray = getProjectsFromStorage();
    const currTitle = currentProjectCard.querySelector('.project-title').innerText
    currData = projectsArray.find(project => project.title === currTitle);
    let index = projectsArray.findIndex(project => project.title === currTitle);
    projectsArray[index] = data;
    localStorage.setItem('projects', JSON.stringify(projectsArray));
    currentProjectCard.querySelector('.project-title').innerText = projectName;
    currentProjectCard.querySelector('.project-description').innerText = projectDescription;
    currentProjectCard.querySelector('.github-link').href = githubLink;
    currentProjectCard.querySelector('.status-icon').src = `assets/icons/homepage/${projectStatus}_project/brown.svg`;
    currentProjectCard.querySelector('.status-icon').alt = projectStatus;

    // Hide the form after saving
    document.querySelector('.edit-overlay').style.display = "none";
  } else {
    const projects = getProjectsFromStorage();
    projects.push(data);
    localStorage.setItem('projects', JSON.stringify(projects));
    addProject(data);
    document.querySelector('.edit-overlay').style.display = "none";
  }
}

// Example function to add project cards dynamically
function addProject(data) {
  const projectCard = document.createElement('div');
  projectCard.classList.add('project-card');
  // projectCard.dataset.color = data.color;
  projectCard.innerHTML = `
    <div class="project-cards ${data.color}">
        <img class="journal-pic" src="assets/icons/homepage/daily_log/daily_log_${data.color}.png" alt="daily log icon"/>
        <h4 class="project-title"><b>${data.title}</b></h4>
        <p class="project-description">${data.description}</p>
        <hr>
        <div class="menu-icons">
            <img class="edit-icon" src="assets/icons/homepage/edit/edit_icon_${data.color}.svg" alt="edit icon"/>
            <a class="github-link" href="${data.githubURL}"><img class="github-icon" src="assets/icons/homepage/github/github_icon_${data.color}.svg" alt="github icon"/></a>
            <img class="status-icon" src="assets/icons/homepage/${data.completed ? 'completed' : 'current'}_project/${data.color}.svg" alt="${data.completed ? 'completed' : 'current'}">
            <img class="delete-project-pic" id="delete-button" src="assets/icons/homepage/project_card_delete/delete_icon.png" alt="Delete proj icon"/>
        </div>
    </div>`;
  document.querySelector('.project-cards-grid').append(projectCard);
  setupEditButtons(); // Attach event listeners to the new edit icons
}

// Initializing the projects
function init() {
  const projects = getProjectsFromStorage();
  // [
  //   {
  //     title: "Project Brown",
  //     description: "This is the project description",
  //     githubURL: "https://github.com/",
  //     completed: false,
  //     color: "brown"
  //   },
  //   {
  //     title: "Project Green",
  //     description: "This is the project description",
  //     githubURL: "https://github.com/",
  //     completed: false,
  //     color: "green"
  //   }
  // ]
  projects.forEach(addProject);
}
// LOCAL STORAGE FUNCTIONALITY FOR PROJECTS
function getProjectsFromStorage() {
  let projects = localStorage.getItem('projects');
  if (projects) {
    return JSON.parse(projects);
  }
  else {
    return [];
  }
}
//DELETE inside of init() after CRUD is implemented for projects, inside code adds temporary project cards to page

/* Daily Log Streak implementation */ 
const checkedImgSrc = "../source/assets/HTML_homepage_pics/checked_in.png";
const uncheckedImgSrc = "../source/assets/HTML_homepage_pics/unchecked.png";

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
    } else {
      circles[`${i}`] = uncheckedImgSrc;
    }

    const element = document.getElementById(convertID(day.getDay()));
    if (element) {
      element.src = circles[`${i}`];
    }
  }
  setCirclesToStorage(circles);
}

weekFillIn(); 
setStreakToStorage(findStreak());

const dailyStreakElement = document.getElementById('daily-streak');
if (dailyStreakElement) {
  dailyStreakElement.textContent = getStreakFromStorage();
}

