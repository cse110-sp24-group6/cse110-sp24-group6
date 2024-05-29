//class of project elements that appear on the homepage

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
            box-shadow: 0 4px 8px 0 rgba(238 235 235 20%);
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
            box-shadow: 0 8px 16px 0 rgba(230 230 230 70%);
        }
        .journal-pic {
            height: auto;
            width: 35%;
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
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 5px;
            transition: 0.6s;
        }`
		//Append the <style> and <article> elements to the Shadow DOM
		this.shadowEl.append(styleEl);
		this.shadowEl.append(elementRoot);
	}

	/**
	 * Called when the data object is called on a ProjectCard object e.g. projectcard.data
	 * @param {Object} data - The data for <project-card> is in the following format:
	 *                        {
	 *                          "title": "string",
	 *                          "description": "string",
	 *                          "githubURL": "string",
	 *                          "completed": "boolean",
     *                          "color": "string"
	 *                        }
	 */
	set data(data) {
		if (!data) return;
		let articleEl = this.shadowEl.querySelector('article');
		// Setting the contents of the <article> HTML to create the project card with the inputed data values
        let status = "current";
        if(data.completed === true){
            status = "completed";
        }
		articleEl.innerHTML = 
        `<div class="project-cards ${data.color}">
        <img class="journal-pic" src="assets/icons/homepage/daily_log/daily_log_${data.color}.png" alt="${data.color} daily log icon"/>
        <h4><b>${data.title}</b></h4> 
        <p>${data.description}</p> 
        <!-- (insert project progress bar)-->
        <hr>
        <div class="menu-icons" >
            <img class="edit-icon" src="assets/icons/homepage/edit/edit_icon_${data.color}.svg" alt="edit icon"/>
            <a href=${data.githubURL}><img class="github-icon" src="assets/icons/homepage/github/github_icon_${data.color}.svg" alt="github icon"/></a>
            <img class="status-icon" src="assets/icons/homepage/${status}/${data.color}.svg" alt="status icon">
        </div>
        </div`;
	}
}

//defines a class of custom project-card elements
customElements.define('project-card', ProjectCard);