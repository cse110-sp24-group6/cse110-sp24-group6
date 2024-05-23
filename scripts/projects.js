// boolean to check if a new project is being added
var newProjectAdded = 0;
// keeps track of the current project selected from the menu-button
var currProject = null;
// åcreate an new project and open editing overlay using add button
document.querySelector(".add-button").addEventListener("click", () => {
    document.querySelector(".edit-overlay").style.display = "block";
    document.querySelector("#delete-button").style.display = "none";
    newProjectAdded = 1;
})
// save editing overlay to project
document.querySelector('#save-button').addEventListener("click", () => {
    // determining project's locations
    let selectBox = document.querySelector("#completed-select-box");
    let insertPlace;
    if(selectBox.value == "current"){
        insertPlace = document.querySelector(".current-projects-container");
    }else{
        insertPlace = document.querySelector(".closed-projects-container");
    }
    // adding a new project
    if(Boolean(newProjectAdded)){
        const strings = ["tan", "green", "cream"];
        const newProject = document.createElement('div');
        newProject.setAttribute("class", "project-element");
        //colors are randomly selected from strings
        let index = Math.floor(Math.random() * 3);
        newProject.classList.add(strings[index]);
        //inputs data from overlay
        newProject.innerHTML = `
        <h3>${document.querySelector("#input-project-name").value}</h3>
        <p>${document.querySelector("#input-project-description").value}</p>
        <div class="project-buttons">
            <a href=${document.querySelector('#input-github-link').value}><img src="../icons/projectpage/github-${strings[index]}.svg"></a>
            <div class="menu-button"><img src="../icons/projectpage/menu-${strings[index]}.svg"></div>
        </div>`;
        insertPlace.querySelector(".projects-container").append(newProject);
        newProject.querySelector(".menu-button").addEventListener("click", editProject);
    }else{
        // else is editing an existing project
        // changing project's html values to inputed values
        currProject.querySelector("h3").innerHTML = `${document.querySelector("#input-project-name").value}`;
        currProject.querySelector("p").innerHTML= `${document.querySelector("#input-project-description").value}`;
        currProject.querySelector("a").href = `${document.querySelector('#input-github-link').value}`;
        insertPlace.querySelector(".projects-container").append(currProject);
    }
    // clear inputed values in overlay
    document.querySelector("#input-project-name").value = "";
    document.querySelector("#input-project-description").value = "";
    document.querySelector('#input-github-link').value = "";
    // hide overlay again
    document.querySelector(".edit-overlay").style.display = "none";
});
// removing projects
document.querySelector("#delete-button").addEventListener("click", deleteProject);
function deleteProject(event) {
    currProject.remove();
    document.querySelector(".edit-overlay").style.display = "none";
}
// opening edit overlay when pressing menu button
function editProject(event) {
    document.querySelector('.edit-overlay').style.display = "block";
    // a new project is not being added
    newProjectAdded = 0;
    document.querySelector("#delete-button").style.display = "block";
    // assigns the project's button to currProject
    console.log(event);
    currProject = event.target.closest('.project-element');
    // set values in overlay to current project's values
    document.querySelector("#input-project-name").value = currProject.querySelector("h3").innerHTML;
    document.querySelector("#input-project-description").value = currProject.querySelector("p").innerHTML;
    document.querySelector('#input-github-link').value = currProject.querySelector("a").href;
}
//adds an event listener to the menu buttons
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.menu-button');
    buttons.forEach(button => {
        button.addEventListener('click', editProject);
    });
});