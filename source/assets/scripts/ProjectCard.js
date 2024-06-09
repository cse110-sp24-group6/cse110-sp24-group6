// class of project cards that appear on the homepage

class ProjectCard extends HTMLElement {
	constructor() {
		super();
		this.shadowEl = this.attachShadow({mode:'open'});
		// <article> element holds the html/contents of the project
		let elementRoot = document.createElement('article');
		// <style> element holds the style of each project card
		let styleEl = document.createElement('style');
		styleEl.innerHTML = `
        .project-cards {
            transition: 0.3s;
            width: 200px;
            height: auto;
            border-radius: 20px;
            padding: 20px;
        }
        h4 {
            font-size: 110%;
        }

        p {
            font-size: 105%;
        }

        hr {
            width: 100%;
            margin: auto;
            margin-top: 30px;
            margin-bottom: 10px;
        }

        .project-element:hover {
            box-shadow: 0 8px 16px 0 rgb(255 255 255);
        }

        .journal-pic {
            height: auto;
            width: 35%;
        }

        .delete-project-pic {
            height: auto;
            width: 10%;
            margin-left: 48%;
            margin-bottom: 23%;
            padding: 5px;
        }

        .delete-project-pic:hover{
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            transition: 0.6s;
            cursor: pointer;
        }

        .white .delete-project-pic:hover,
        .cream .delete-project-pic:hover{
            background-color: rgba(43, 62, 85, 0.1);
        }

        /* Background and text colors */
        .project-cards.brown {
            background-color: #CAAF8E;
            color: #5B4B34;
            grid-area: brownBack;
        }

        .project-cards.green {
            background-color: #3F8984;
            color: #F6F1E2;
            grid-area: blueBack;
        }

        .project-cards.cream {
            background-color: #F6F1E2;
            color: #2B3E55;
            grid-area: offWhiteBack;
        }

        .project-cards.white {
            background-color: #FFF;
            color: #2B3E55;
            grid-area: whiteBack;
        }

        /* Card: github and external link icons */
        .menu-icons img  {
            height: auto;
            width: 10%;
            margin: 30px 0 20px;
            padding: 5px;
        }
        .menu-icons img:hover{
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            transition: 0.6s;
            cursor: pointer;
        }
        .white .menu-icons img:hover,
        .cream .menu-icons img:hover{
            background-color: rgba(43, 62, 85, 0.1);
        }`
		//Append the <style> and <article> elements to the Shadow DOM
		this.shadowEl.append(styleEl);
		this.shadowEl.append(elementRoot);
	}

	/**
	 * Called when the data object is called on a ProjectCard object e.g. projectcard.data
     * The color attribute has the following options: ["brown", "green", "white", "cream"]
	 * @param {Object} data - The data for <project-card> is in the following format:
	 *                        {
	 *                          "title": "string",
	 *                          "description": "string",
	 *                          "githubURL": "string",
	 *                          "completed": "boolean",
     *                          "color": "string"
	 *                        }
     * 
	 */
	set data(data) {
		if (!data) return;
		let articleEl = this.shadowEl.querySelector('article');
        // setting the data attributes to variables to solve some Linting issues and get the correct colored icons
        // note that white's color is outputed as cream for retrieving the correct colored icons since both use dark blue colored icons
        
        // setting defaults
        let status = "current"; 
        let color = "cream"; 
		
        if(data.completed === true){
            status = "completed";
        }

        if(data.color == "green"){
            color = "green";
        }
        if(data.color == "brown"){
            color = "brown";
        }
        if(data.color == "white"){
            color = "cream";
        }
        
        // Setting the contents of the <article> HTML to create the project card with the inputed data values
		articleEl.innerHTML = 
        `<div class="project-cards ${data.color}">
        <img class="journal-pic" src="assets/icons/homepage/daily_log/daily_log_${color}.png" alt="daily log icon"/>
        <img class="delete-project-pic" src="assets/icons/homepage/project_card_delete/delete_icon.png" alt="Delete proj icon"/>
        <h4><b>${data.title}</b></h4> 
        <p>${data.description}</p> 
        <hr>
        <div class="menu-icons" >
            <img class="edit-icon" src="assets/icons/homepage/edit/edit_icon_${color}.svg" alt="edit icon"/>
            <a href=${data.githubURL}><img class="github-icon" src="assets/icons/homepage/github/github_icon_${color}.svg" alt="github icon"/></a>
            <img class="status-icon" src="assets/icons/homepage/${status}_project/${color}.svg" alt="status icon">
        </div>
        </div`;
	}
}

//defines a class of custom project-card elements
customElements.define('project-card', ProjectCard);