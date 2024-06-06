# CSE 110- Group 6: Databaes

Here is the link to our [team page](admin/team.md)!

Link to our Figma [TODO](TODO).

### Our Brainstorming Process

In order to get an idea of what we wanted our developer journal to be, we started off with a brainstorming session including all team members and diagrammed our ideas.

During this meeting, we planned out the features we were hoping to include in our project. In order to not include biases, as well as for more possible ideas outside of just us as developers, we created user personas and user stories to facilitate the brainstorming process as shown below:

<p align="center">
    <img src="specs/brainstorm/brainstorming_user_personas.png" alt="User personas" height="300" width="600">
</p>

> We made 4 different personas, each of varying age and wants in order to get more ideas

After creating these personas we went on to create a mindmap of the possible features we wanted to include and wrote down some ideas we had in mind for each.

<p align="center">
    <img src="specs/brainstorm/brainstorming_features_mindmap.png" alt="Mindmap" height="300" width="600">
</p>

> Category for each feature/functionality, more specific details in each branch

We also made a fat marker sketch to get a rough idea of how we wanted our project to look. While it was not exactly what we went with later on, it ultimately helped us understand how we wanted our application to function.

<p align="center">
    <img src="specs/brainstorm/whiteboard_website_design1.jpg" alt="First sketch" height="275" width="350">
    <img src="specs/brainstorm/whiteboard_website_design1.jpg" alt="Second sketch" height="275" width="350">
</p>

> Fat marker sketch of our ideas

Following our initial brainstorming meeting, we then created a flow chart to demonstrate the general user flow of our application.

<p align="center">
    <img src="specs/brainstorm/diagram_user_flowchart.png" alt="Flow chart" height="300" width="600">
</p>

> Flow chart of the user flow we had in mind

After finalizing our rough ideas and getting an idea for what to do, we made our [team pitch](specs/pitch/CSE_110_Team_6_Pitch.pdf) to show the TA.

*All images are also posted here [here](specs/brainstorm/brainstorming_session.pdf) for a closer view.*

### Agile Development Process

Our team followed the agile development process in order to iteratively create our product through consistent meetings and frequent project updates.

**Weekly Team Meetings**
* Our team met through Zoom every Saturday around 5pm in order to check-in and see everyone's progress. We also took that time to go over any ideas we had, as well as to plan out the next week's work.
* Towards the end of the quarter, we included a second short meeting after Thursday's class in order to have more time to discuss.

**Daily Standups**
* While not actually having daily standup meetings, we did implement a daily check-in system in our Slack server. We would post daily any work we did and what we planned on doing in order to have more communication among the team outside of our meetings.

**Branching Strategies**
* Our team wanted to minimize the number of branches we would have to make, as having an excessive amount would lead to dead/redundant branches. Similarly, having too few branches could lead to merge conflicts further down the line.
* We decided to create a branch for each feature we would be implementing as our major branches. From there, any tweaks that would have to be made were included in smaller branches in order to maintain cleanliness throughout the branches.

**Making it Offline**
* In order to implement offline functionality for our web application, we decided to use Service Workers.
* Considering our options for this, we chose to utilize the method that we had some experience with through the Labs.

**Retrospectives**
Retrospectives are essential for teams following an agile development process as they provide an opportunity to reflect on what went well, what didn't, and how to improve. Our team conducted retrospectives at the end of each sprint. We used a structured format where each team member shared their thoughts on what worked, what didn't, and any suggestions for improvement. We documented these discussions in our repository and revisited them in subsequent retrospectives to track progress. We used Jamboard to conduct our retrospectives and allow everyone to reflect upon the sprint and give suggestions/feedback.

**Sprint and Sprint Reviews**
Sprints are time-boxed periods during which specific work has to be completed. Our team typically had one/two-week sprints. At the beginning of each sprint, we held a sprint planning meeting to decide which tasks to prioritize and assign them to team members. Throughout the sprint, we tracked our progress and addressed any blockers. At the end of each sprint, we conducted a sprint review meeting to demo the completed work to stakeholders and gather feedback for future iterations.

**Testing**
Testing was a crucial aspect of our development process to ensure the quality and reliability of our product. We adopted a test-driven development (TDD) approach, where tests were written before the implementation of features. Our testing strategy included unit tests and end-to-end tests. We used automated testing frameworks such as Jest for unit testing and Puppeteer for end-to-end testing. Additionally, we performed manual testing to validate the user experience across different devices and browsers.

**Documentation**
Documentation played a vital role in ensuring the maintainability and scalability of our project. We maintained comprehensive documentation covering various aspects of our application, including installation instructions, architecture overview, and API documentation. We used tools like JS Docs for documenting our JavaScript and made extensive use of comments and README files. Documentation was continuously updated throughout the development process to reflect changes and additions to the codebase.

**Issues**
We utilized an issue tracking system to manage and prioritize tasks, bugs, and feature requests. Whenever a new task or issue was identifie it was logged into our issue tracker (GitHub project integrated into our repo). Each issue was assigned to a team member, categorized (e.g., bug, feature, enhancement), and given a priority level. We regularly reviewed and updated the status of issues, ensuring transparency and accountability within the team.

#### Branching Strategies
Our branching strategy aimed to strike a balance between minimizing complexity and facilitating collaboration. We followed a Git branching model based on feature branches. Each new feature or user story was developed in its own branch, allowing team members to work independently without interfering with each other's code. Once a feature was complete, it underwent code review before being merged into the main development branch.

**PRs**
Pull requests (PRs) served as the primary mechanism for code review and collaboration within our team. Before merging any code changes into the main branch, a team member would create a pull request and request reviews from other team members. Code reviews were conducted to ensure adherence to coding standards, identify potential bugs or optimizations, and promote knowledge sharing. We used pull request templates to provide context and checklist for reviewers, streamlining the review process and maintaining code quality. We also created a [PR template](TODO.md) and made sure that every PR has at least 2 reviewers and is linked to its corresponding issue. 

**CI/CD Pipeline**
We made use of a CI/CD pipeline to automate certain tasks. Our pipeline includes:
* Linting (using a tool called super-linter which is a collection of linters)
* Code quality check using Codacy
* Unit tests through Jest
* JS Docs generation

The main branch was protected and PRs can only be merged with main **after** completing all checks in our CI/CD pipeline.

### Our Product

TODO: Images of application, its features

Contributors: [Team 6](admin/team.md)!
