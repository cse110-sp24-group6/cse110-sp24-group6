// Progress Bar
const progressNumber = document.getElementById('progressNumber');
let counter = 0;

const intervalId = setInterval(() => {
    if (counter >= 100) {
        clearInterval(intervalId);
    } else {
        counter += 1;
        progressNumber.innerHTML = `${counter}%`;
    }
}, 100);

// Navigation bar: Sticky
window.onscroll = function() { myFunction() };

const navBar = document.getElementsByClassName("nav-bar")[0];
const sticky = navBar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
}

/* Project Section Javascript */
function addProject(data) {
  const newProject = document.createElement('project-card');
  newProject.data = data;
  document.querySelector('.project-cards-grid').append(newProject);
}

function init() {
  const projects = [
    {
      title: "Project Brown",
      description: "This is the project description",
      githubURL: "https://github.com/",
      completed: false,
      color: "brown"
    },
    {
      title: "Project Green",
      description: "This is the project description",
      githubURL: "https://github.com/",
      completed: false,
      color: "green"
    },
    {
      title: "Gaming App",
      description: "This is the project description",
      githubURL: "https://github.com/",
      completed: false,
      color: "white"
    },
    {
      title: "Webtool App",
      description: "This is the project description",
      githubURL: "https://github.com/",
      completed: true,
      color: "cream"
    }
  ];

  projects.forEach(addProject);
}

document.addEventListener('DOMContentLoaded', init);

// Function to update daily streak
function updateDailyStreak() {
  const currentDate = new Date().toLocaleDateString();
  const lastVisit = localStorage.getItem('lastVisit');
  let streak = parseInt(localStorage.getItem('streak'), 10) || 0;

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

  localStorage.setItem('streak', streak);
  localStorage.setItem('lastVisit', currentDate);
  document.getElementById('daily-streak').textContent = streak;
  console.log("New Streak:", streak);
}

// Function to update daily streak visual
function updateDailyStreakVisual() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const lastVisit = localStorage.getItem('lastVisit');
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const checkedImgSrc = "assets/HTML_homepage_pics/checked_in.png";
  const uncheckedImgSrc = "assets/HTML_homepage_pics/unchecked.png";

  dayNames.forEach(day => {
    const dayCircle = document.getElementById(`${day}-circle`);
    if (dayCircle) {
      dayCircle.src = uncheckedImgSrc;
    }
  });

  if (lastVisit) {
    const lastVisitDate = new Date(lastVisit);
    const yesterday = new Date();
    yesterday.setDate(currentDate.getDate() - 1);

    if (lastVisitDate.toLocaleDateString() === yesterday.toLocaleDateString() || lastVisitDate.toLocaleDateString() === currentDate.toLocaleDateString()) {
      for (let i = 0; i <= currentDay; i++) {
        const dayCircle = document.getElementById(`${dayNames[i]}-circle`);
        if (dayCircle) {
          dayCircle.src = checkedImgSrc;
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateDailyStreak();
  updateDailyStreakVisual();
});

//  show edit project  popup form
function showEditPopup() {
    document.getElementById('project-edit-popup').style.display = 'block';
}

//  close the popup form
function closeEditPopup() {
    document.getElementById('project-edit-popup').style.display = 'none';
}

// add event listener to close button
document.getElementById('close-popup').addEventListener('click', closeEditPopup);

// example function to open the popup form (call this function when edit button is clicked)
function openEditForm() {
    showEditPopup();
}

// end of existing init function or wherever appropriate
document.getElementById('edit-button').addEventListener('click', openEditForm);

// event listeners for form buttons 
document.getElementById('save-project').addEventListener('click', function(event) {
    event.preventDefault();
    // Add save functionality here ?
});

document.getElementById('delete-project').addEventListener('click', function(event) {
    event.preventDefault();
    // add delete functionality here ?
});
