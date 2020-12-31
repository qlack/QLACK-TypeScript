# QLACK TypeScript libraries

<p>
    <a href="https://travis-ci.org/qlack/QLACK-TypeScript" alt="TravisCI">
        <img src="https://travis-ci.org/qlack/QLACK-TypeScript.svg?branch=master" />
    </a>
    <a href="https://qlack.com/" alt="Website">
        <img src="https://img.shields.io/website-up-down-green-red/https/qlack.com" />
    </a>
</p>

This repository is a collection of utility TypeScript libraries.

## Build & publish process
* Go to the root of the project you want to publish.
* Edit `package.json` to update the version.
* Go to the root of the QLACK-TS project and execute: `ng build --prod --project {projectname}`, e.g.
  `ng build --prod --project @qlack/forms`
* Go to the root of the QLACK-TS project under `dist` folder, e.g. `dist/forms` and execute: `npm publish`

## Build all process
* Go to the root of the project you want to publish.
* Edit `package.json` to update the version.
* Go to the root of the QLACK-TS project and execute: `npm run build-all`

## Code Quality

<p align="center">
	<a href="https://sonarcloud.io/dashboard?id=qlack_QLACK-TypeScript">
  		<img src="https://sonarcloud.io/api/project_badges/measure?project=qlack_QLACK-TypeScript&metric=security_rating" />
	</a>
	<a href="https://sonarcloud.io/dashboard?id=qlack_QLACK-TypeScript">
  		<img src="https://sonarcloud.io/api/project_badges/measure?project=qlack_QLACK-TypeScript&metric=reliability_rating" />
	</a>
	<a href="https://sonarcloud.io/dashboard?id=qlack_QLACK-TypeScript">
  		<img src="https://sonarcloud.io/api/project_badges/measure?project=qlack_QLACK-TypeScript&metric=sqale_rating" />
	</a>
	<a href="https://sonarcloud.io/dashboard?id=qlack_QLACK-TypeScript">
  		<img src="https://sonarcloud.io/api/project_badges/measure?project=qlack_QLACK-TypeScript&metric=sqale_index" />
	</a>
	<a href="https://sonarcloud.io/dashboard?id=qlack_QLACK-TypeScript">
  		<img src="https://sonarcloud.io/api/project_badges/measure?project=qlack_QLACK-TypeScript&metric=ncloc" />
	</a>
	<a href="https://sonarcloud.io/dashboard?id=qlack_QLACK-TypeScript">
  		<img src="https://sonarcloud.io/api/project_badges/measure?project=qlack_QLACK-TypeScript&metric=coverage" />
	</a>
	<a href="https://sonarcloud.io/dashboard?id=qlack_QLACK-TypeScript">
  		<img src="https://sonarcloud.io/api/project_badges/measure?project=qlack_QLACK-TypeScript&metric=duplicated_lines_density" />
	</a>
	<a href="https://sonarcloud.io/dashboard?id=qlack_QLACK-TypeScript">
  		<img src="https://sonarcloud.io/api/project_badges/measure?project=qlack_QLACK-TypeScript&metric=code_smells" />
	</a>
	<a href="https://sonarcloud.io/dashboard?id=qlack_QLACK-TypeScript">
  		<img src="https://sonarcloud.io/api/project_badges/measure?project=qlack_QLACK-TypeScript&metric=vulnerabilities" />
	</a>
	<a href="https://sonarcloud.io/dashboard?id=qlack_QLACK-TypeScript">
  		<img src="https://sonarcloud.io/api/project_badges/measure?project=qlack_QLACK-TypeScript&metric=bugs" />
	</a>
</p>


## Contributors

<p>
	<a href="https://github.com/qlack/QLACK-TypeScript/graphs/contributors">
  		<img src="https://contributors-img.firebaseapp.com/image?repo=qlack/qlack-typescript" />
	</a>
</p>
