# Digit - Frontend

## **IMPORTANT UPDATES!** 

Project is updated to use `create-react-app 2.0` which comes with lot of improvements but also a lot of changes. Please read the [changelog](https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md).

 Shortly:
 - `webpack` updated to version 4
 - `Babel` jsx/js-compiler to 7 
 - built in SASS-support so all styles imported from `node_modules` folder needs to be added within `.scss` file
 - No need to import `Fragments` use native `<>...</>` tags instead
- Node version on `.nvmrc` is updated to `10` so if build failes remove `node_modules` and run `npm install`
- Beta-version of the site has been published on [beta.digit.fi](https://beta.digit.fi)

## Installing / Getting started

Install/ensure Node/NPM is installed (prefer NVM)

```shell
git clone git@github.com:YOUR-USERNAME/website2.0.git
cd website2.0
nvm use
npm install 
npm start
```

## DOCS 
 
> Check [docs](docs) folder:

-  [Event management](docs/events.md)


### Initial Configuration

Nothing :)

## Developing

Frontend can be run without backend running but it's highly recommended setting it up. Source code can be found here: [DigitKoodit/digit-backend](https://github.com/DigitKoodit/digit-backend)


### Building

Build product using: `npm run build`  
Creates `dist` folder on project root which then can be ran individually. 

### Deploying / Publishing [beta.digit.fi](https://beta.digit.fi)

The website is running on DigitalOcean droplet managed by Sami Nieminen. Contact for more information


## Features

TODO

## Configuration

TODO

## Contributing

> Fork the project -> do changes -> make a pull request.

### 1. Clone your fork:

    git clone git@github.com:YOUR-USERNAME/website2.0.git

### 2. Add remote from original repository in your forked repository: 

    cd website2.0
    git remote add upstream git@github.com:DigitKoodit/website2.0.git
    git fetch upstream
  
Creates local `master` branch

### 3. Make a new branch from master

    git checkout -b blazing-feature

Create a new branch from the `master` branch so you can always pull latest changes from upstream origin without interrupting your own feature development if new changes are available.

### 4. Updating your fork from original repo to keep up with their changes:

    git pull upstream master
      or
    git pull --rebase upstream master

 Please follow the steps on the previous block. If . Rebasing helps to keep the project history more readable and therefore more maintainable. Here's a good article about what it means and why to use it: [Git Fork Workflow Using Rebase](https://medium.com/@ruthmpardee/git-fork-workflow-using-rebase-587a144be470). 

### 5. Creating a feature

Example of how to create a new feature/fix

    # After the step 2. is performed
        git checkout -b blazing-feature
    # Make changes and commit with meaningful message
        git commit -m "Add new blazing feature"
        git checkout master
    # Update local master and rebase moves possible changes after the ones which are already on production
        git pull --rebase upstream master 
        git checkout blazing-feature
        git rebase master
    # Check that everything works and then perform merge or rebase
        git checkout master
        git merge blazing-feature
    # Check that your new feature works on master branch and make a pull request

**Take away:**
- Only update `feature` branch to keep project more maintainable for everyone
- Keep master always up to date with `upstream master`
- Keep commits small and on the topic
- Keep master always up to date with `upstream master`!!
- Rebase `feature` to your master branch


## Licensing

"The code in this project is licensed under [MIT license.](/LICENSE)"