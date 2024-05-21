//Creating a new project using add button
document.querySelector('.add-button').addEventListener("click", () =>{
    const strings = ["tan", "green", "cream"];
    const newProject = document.createElement('div');
    newProject.setAttribute("class", "project-element");
    let index = Math.floor(Math.random() * 3);
    newProject.classList.add(strings[index]);
    newProject.innerHTML = `
    <h3>${document.querySelector("#input-project-name").value}</h3>
    <p>${document.querySelector("#input-project-description").value}</p>
    <div class="project-buttons">
        <a href=${document.querySelector('#input-github-link').value}><img src="../icons/projectpage/github-${strings[index]}.svg"></a>
        <div class="delete-button"><img src="../icons/projectpage/menu-${strings[index]}.svg"></div>
    </div>`;
    let selectBox = document.querySelector("#completed-select-box");
    let insertPlace;
    if(selectBox.value == "current"){
        insertPlace = document.querySelector(".current-projects-container");
    }else{
        insertPlace = document.querySelector(".closed-projects-container");
    }
    console.log(insertPlace);
    insertPlace.querySelector(".projectsContainer").append(newProject);
    console.log("hello");
    newProject.querySelector(".delete-button").addEventListener("click", deleteProject);
});
//removing projects
function deleteProject(event) {
    event.target.parentNode.parentNode.parentNode.remove();
  }
document.addEventListener("DOMContentLoaded", () => {
     const buttons = document.querySelectorAll('.delete-button');
    buttons.forEach(button => {
        button.addEventListener('click', deleteProject);
    });
});
