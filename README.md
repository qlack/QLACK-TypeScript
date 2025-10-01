# QLACK TypeScript libraries

<p>
    <a href="https://qlack.com/" alt="Website">
        <img src="https://img.shields.io/website-up-down-green-red/https/qlack.com" />
    </a>
</p>

This repository is a collection of utility TypeScript libraries.

## Build & publish process
* Go to the root of the project you want to publish.
* Edit `package.json` to update the version.
* Go to the root of the QLACK-TS project and execute: `ng build --project {projectname}`, e.g.
  `ng build --project @qlack/forms`
* Go to the root of the QLACK-TS project under `dist` folder, e.g. `dist/qlack/forms` and execute: `npm publish`

## Testing local library process
Once you've made changes to the libraries, you may need to test them inside your application before publishing.
* Assuming you have already built the libraries you need (see steps above), navigate to each dist folder, e.g. dist\qlack\forms, and execute
`npm link`
* Inside your project's root folder, change the versions of the corresponding libraries in package.json and execute
 `npm link {projectname}`, e.g. (if you want to link to more than one libraries you should place them in the same command)
 `npm link @qlack/forms @qlack/form-validation`
* Once you are done testing, execute the following command from your project's root folder to unlink local libraries
  `npm unlink {projectname}`, e.g. `npm unlink @qlack/forms @qlack/form-validation`
* Publish the local libraries as described in the previous section and execute `npm install` in your project's root folder to download the published version.
* You may also need to remove your local directories from being able to get linked from other libraries. Navigate to the root library and execute the following command
  `npm uninstall -g {projectname}`

## Contributing

We welcome contributions and appreciate your effort to help improve this project!  
To keep things organized please follow the steps below:

1. **Fork the repository** to your own GitHub account.

2.  **Clone** your fork to your local machine:

    ```bash
    git clone https://github.com/<your-username>/<repo>.git
    cd <repo>
    ```

3. **Make your changes** and **Commit** your work:

4. **Push** the branch to your fork.

5. **Open a Pull Request (PR)** against the main repository:  
   - A Pull Request (PR) is a GitHub feature that lets you propose changes from your fork back to the original repository.  
   - To create one:  
     1. Log in to your GitHub account.  
     2. Navigate to your forked repository.  
     3. Click the **"Contribute"** button (usually near the top of the repo page).  
     4. Select **"Open pull request"**.  
     5. Make sure the base repository is the original project and the base branch (`master`) is correct.  
     6. Confirm that the “compare” branch is the branch you pushed.  

6. In the PR form:
    - Provide a clear description of the changes and why they are needed  
    - Reference related issues if applicable
    - Request a review from maintainers
    - Be open to feedback and ready to make revisions 

You can also watch an overview of how to contribute to OSS via Pull Requests here: [GitHub Pull Request Tutorial](https://www.youtube.com/watch?v=dLRA1lffWBw)

## Contributors

<p>
	<a href="https://github.com/qlack/QLACK-TypeScript/graphs/contributors">
  		<img src="https://contributors-img.firebaseapp.com/image?repo=qlack/qlack-typescript" />
	</a>
</p>
