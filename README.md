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
* Go to the root of the QLACK-TS project under `dist` folder, e.g. `dist/forms` and execute: `npm publish`

## Build all process
* Go to the root of the project you want to publish.
* Edit `package.json` to update the version.
* Go to the root of the QLACK-TS project and execute: `npm run build-all`

## Contributors

<p>
	<a href="https://github.com/qlack/QLACK-TypeScript/graphs/contributors">
  		<img src="https://contributors-img.firebaseapp.com/image?repo=qlack/qlack-typescript" />
	</a>
</p>
