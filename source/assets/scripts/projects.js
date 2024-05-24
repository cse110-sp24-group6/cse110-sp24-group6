// Global Variables
// boolean to check if a new project is being added
//var newProjectAdded = 0;
// keeps track of the current project selected from the menu-button
//var currProject = null;

// Event listener for the add button, when clicked creates a new project and opens the editing overlay
document.querySelector(".add-button").addEventListener("click", () => {
    document.querySelector(".edit-overlay").style.display = "block";
    document.querySelector("#delete-button").style.display = "none";
    //newProjectAdded = 1;
});
// Event listener for the save button, when clicked the project's information(title, description, github link, completed/not completed) is updated to the input values
// document.querySelector('#save-button').addEventListener("click", () => {
//     // determining if the user chose to make the project completed/not completed 
//     let selectBox = document.querySelector("#completed-select-box");
//     let insertPlace;
//     if(selectBox.value == "current"){
//         insertPlace = document.querySelector(".current-projects-container");
//     }else{
//         insertPlace = document.querySelector(".closed-projects-container");
//     }
//     // If the user is creating a new project
//     if(newProjectAdded){
//         const colors = ["tan", "green", "cream"];
//         const newProject = document.createElement('div');
//         newProject.setAttribute("class", "project-element");
//         // the color scheme of the project card is randomly selected from colors
//         let index = Math.floor(Math.random() * 3);
//         newProject.classList.add(colors[index]);
//         // project's name, description, and github link are assigned to inputed values
//         newProject.innerHTML = `
//         <h3>${document.querySelector("#input-project-name").value}</h3>
//         <p>${document.querySelector("#input-project-description").value}</p>
//         <div class="project-buttons">
//             <a href=${document.querySelector('#input-github-link').value}><img src="./assets/icons/projectpage/github-${colors[index]}.svg"></a>
//             <div class="menu-button"><img src="./assets/icons/projectpage/menu-${colors[index]}.svg"></div>
//         </div>`;
//         // project is added to completed or current box
//         insertPlace.querySelector(".projects-container").append(newProject);
//         newProject.querySelector(".menu-button").addEventListener("click", editProject);
//     }else{
//         // else is if the user is editing an existing project
//         // changing project's html values to inputed values
//         currProject.querySelector("h3").innerHTML = `${document.querySelector("#input-project-name").value}`;
//         currProject.querySelector("p").innerHTML= `${document.querySelector("#input-project-description").value}`;
//         currProject.querySelector("a").href = `${document.querySelector('#input-github-link').value}`;
//         insertPlace.querySelector(".projects-container").append(currProject);
//     }
//     // clear inputed values in editing overlay
//     document.querySelector("#input-project-name").value = "";
//     document.querySelector("#input-project-description").value = "";
//     document.querySelector('#input-github-link').value = "";
//     // hides editing overlay again
//     document.querySelector(".edit-overlay").style.display = "none";
// });
// // Removes projects when delete button is pressed
// document.querySelector("#delete-button").addEventListener("click", deleteProject);
// function deleteProject() {
//     currProject.remove();
//     document.querySelector(".edit-overlay").style.display = "none";
// }
// Function that displays the editing overlay to the user
function editProject(/*event*/) {
    document.querySelector('.edit-overlay').style.display = "block";
    // a new project is not being added
    //newProjectAdded = 0;
    document.querySelector("#delete-button").style.display = "block";
    // // assigns the project's button to currProject
    // currProject = event.target.closest('.project-element');
    // // set values in overlay to current project's values
    // document.querySelector("#input-project-name").value = currProject.querySelector("h3").innerHTML;
    // document.querySelector("#input-project-description").value = currProject.querySelector("p").innerHTML;
    // document.querySelector('#input-github-link').value = currProject.querySelector("a").href;
}
// adds an event listener to the menu buttons
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.menu-button');
    buttons.forEach(button => {
        button.addEventListener('click', editProject);
    });
});
