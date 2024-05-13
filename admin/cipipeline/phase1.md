A short 2 page (roughly) status on the pipeline in terms of what is currently functional (and what is planned or in progress). Embed your diagram in the markdown file.

# Phase 1: CI/CD Pipeline Setup

In this phase, we worked on setting up the CI/CD pipeline using GitHub Actions to automate a lot of tasks and make sure that are repository is more organized and systematic. This included creating GitHub actions to lint HTML, CSS, and JavaScript code, integrating Codacy to ensure that all the code meets certain standards and passes quality checks, automate unit and e2e (end-to-end) testing. 

The primary trigger actions we chose are:

- Any code that is pushed to main should pass all checks in GitHub actions. 
- Any PR has to pass all checks before merging with main branch.

Our pipeline included the following workflows:

- Linting code in pipeline to make sure that it is consistent throughout the repository and to enforce certain styles (again, for consistency).
- Integrating Codacity to ensure our code passes a certain quality and is well-written.
- Checking code quality via human review- making sure that there are actual humans who review and approve the code when a PR is made.
- Unit testing- all code should pass certain unit tests in the pipeline before merging with main.
- Document generation so that all our code is well documented and everything is automated.
- Other testing such as e2e (end-to-end) testing.

**Everytime a PR is made, all the GitHub actions are run and a merge with main branch can only be made if all checks are passed and there are no conflicts.**

Here is a diagram of what our pipeline looks like:

![Process diagram](./phase1.png)

Here are some more details about each of the GitHub actions:

## Code Linting

To efficiently lint our code and make sure that it is consistent, we made use of a tool called super-linter. Super-linter is a ready-to-run collection of linters and code analyzers, to help validate your source code.

The goal of super-linter is to help you establish best practices and consistent formatting across multiple programming languages, and ensure developers are adhering to those conventions.

Super-linter analyzes source code files using several tools, and reports the issues that those tools find as console output, and as GitHub Actions status checks.

We integrated this in our code mainly to check and lint HTML, CSS and JS files. This uses **stylint** for CSS code, **HTMLHint** for HTML code, and **ESLint** for Javascript code. We disabled some linters that were unimportant or that were giving unnecessary errors such as validating markdown, natural language, Javascript standard (different from ESLint- this was being problematic since the linting was too strict), GitHub actions, and infrastructure as code (Checkov).

## Code Quality Check via Codacy

To ensure that code quality in the repository meets certain standards. Codacy is a tool that helps us by automating code reviews and code quality analysis. Codacy provides insights and actionable feedback, helping you improve code quality, maintainability, and security. We made an account on Codacy, adding this organization and repository to it (to monitor code quality and other statistics/details), generated an API key and added it as a secret key to our GitHub repository, and then wrote a YAML file to create a GitHub action and automate code quality checking.

## Code Quality Check via Human Review  

We created a PR template to ensure that pull requests provide a clear description of their changes and that it contain necessary details related to the PR request, such as if it is a bug fix or an added feature. This helps reviewers understand the changes and why they are made without needing to dig through the code and thus improves reviewe efficiency. It also contains a checklist for the contributor to go through, such as making sure that they tested their changes and that their code works to ineffciencies such as failing automated checks because of a syntax error, for example. 

This part immediately shows up when anyone makes a PR and the template can be seen in this [file](../../PULL_REQUEST_TEMPLATE.md). Essentially, the aim is to ensure that actual humans review the code quality and we are able to have that approval before the PR is made.

## Unit tests via automation

We implemented Jest as a testing framework:

- **Jest**: Used for its comprehensive testing capabilities and support for JavaScript and TypeScript.

This framework is integrated into our CI/CD pipeline, allowing tests to run automatically on push to the main branch or on pull request events.

First, we ensured that the project was prepared with the necessary configurations. We began by including Jest as a development dependency in this project by running npm install --save-dev jest. In the package.json file, we added a script to run Jest,  "test": "jest". This allowed me to execute the tests using npm test. Next, we created a GitHub Actions workflow by adding a YAML configuration file in the .github/workflows directory of the repository. This is triggered on push events and pull requests to the main branch, setting up a job that installs dependencies, sets up the Node.js environment, and runs the Jest tests that we implemented. We added tests and ran them as we made pull requests, and ensured that they all passed and that they were ready to merge with the main branch.

## Documentation generation via automation

To automate the generation of the project documentation, we used JSDoc which is designed to parse and generate comprehensive HTML documentation. JSDoc simplifies the process of creating and maintaining documentaiton and makes it easier for developers to understand and navigate the codebase. It reads through the source code files and converts the extracted comments and annotations into a structured format that cna be easily viewed as web pages.

We integrated JSDoc into out CI/CD pipeline to ensure taht our documentation is up to date. The implementation involved creating a `jsdoc.json` configuration file to specify the source files and output directory. We then updated our github actions workflow to install JSDoc and generate the documentation.

## Other Testing (E2E via Cypress)

Cypress is a powerfull end-to-end testing framework that is specifically designed for modern web applications, which offers a complete testing experience. Cypress is used to automate the testing of an application's entire workflow, ensuring that all functionalities work as expected. Cypress will interact with the application just like a real user, simulating clicks, typing, and otehr interactions.

We integrated Cypress into our project by creating a `cypress.config.js` file that specifies the base url, test files, and other onfigurations. We also greate a github action workflow to install Cypress, start the server, and execute the tests. This setup allows up to automatically verify that our application is functioning as expected after every push.

## Future Steps

While we have implemented a significant amount of testing and checking within our pipelines, there is a lot more to be done. In the future we plan to work on refining this pipeline and work on adding more processes through GitHub actions to make it more efficient and simple. Here are some of the things we plan to do:

**Refining the pipeline**

- Removing unnecessary linting (super linter has a lot of features that can be disabled- this will speed up the process and make it simpler to run).
- Making sure we update unit tests as we keep adding features to our website.
- Testing out the document generation and making sure its fully functional.
- Integrating the Cypress server when we setup the website.
- Playing around with different features on Codacy's dashboard- its a very powerful tool and we want maximize its utility.

**Adding new feature**

- Adding more testing features for particular sections of the website.
- Security Scans: Implement security scans within our pipeline to detect and address vulnerabilities in our codebase. This can involve using tools like OWASP Dependency-Check to identify and update outdated dependencies with known security issues.
- Performance Testing: Incorporate performance testing into our pipeline to ensure our application can handle expected loads without degradation. Tools like Apache JMeter or Gatling can help simulate high traffic scenarios to identify potential bottlenecks.
- A pipeline to automatically deploy the website whenever a push/PR to the main branch is made.
- and many more...
