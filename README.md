![Logo of the project](https://digit.fi/images/site/logo_screen_new.gif)

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

### Initial Configuration

(Use VScode)

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

### 3. Updating your fork from original repo to keep up with their changes:

    git pull upstream master

### 4. Making your own changes
    git push origin master

### 5. Make a pull request on GitHub 

## Links

TODO


## Licensing

"The code in this project is licensed under [MIT license.](/LICENSE)"
