# NightWatch_Assignment01

## Overview

Here , In this Assignment I have used the POM (Page Object Model) & created the different Pages for the different Functionalities of Go1%,, It will lead our code more efficient, reusable, scalable & maintable.

## Test Overview

1. I created a ".env" file where I defined the id, password, urls and export this from the help of global.js file inside the globals directory.
2. I Created the Global hooks in the 'globalModule.js' in the globals directory for the reusablity.
3. And I created the diffrent pages - 'LoginPage.js' , 'myActivity.js' and run them in the 'goOne.test.js' and 'myActivityTest.js' simultaneously inside the test directory.
4. I have used various locator strategy in it

```bash
username: "#user-name",
password: {
  selector: "#password",
  locatorStrategy: 'css Selector',
},
```

5. For the Print Operation - I use

```bash
logger.info("Starting test")
```

6. For using this logger we have to install 'winston'

#### command: (in terminal)

```bash
npm install winston
```

#### After that I created a logger.js inside the test directory and configured winston

```bash
//This is my logger file
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

module.exports = logger;

```

8. I create a "helper" for the printing operation inside this I created the "logger.js"

## Test Assert and Passed

1. PASSED. 25 total assertions in the goOneTest.js for the Login features
2. PASSED, 09 total assertions in the myActivityTest.js for the myActivity Feature under the Dashboard.

### How to clone the repo (Feature- Branch)

```bash
git clone -b new-feature-branch https://github.com/Amanjha0008/NightWatch_Go1-.git
```

### How to run the Project?

1. #### Go to the Terminal
2. #### Run this Command - (for the LoginPage.js)

```bash
npx nightwatch tests/Test_file_name --chrome env
```

#### (demo for the loginPage.js)

```bash
npx nightwatch tests/loginPageTest.js --chrome env
```

#### (demo for the dashboardMyProfileTest.js)

```bash
npx nightwatch tests/Dashboard/dashboardMyProfileTest.js --chrome env
```

3. #### See the Output

## Test Reports

#### For the Test report i use allureReports for that in the terminal (after test run)

#### (run in the terminal)

```bash
allure generate ./allure-results --clean && allure open
```

#### Also you can refer for the reports

```bash
testresults.json file
```

That I created in the globalModule.js inside globals directory

```bash
 reporter: (results,done)=>{
    const reporter = new allureReporter.NightwatchAllureReporter({});
    reporter.write(results,done);
    },

    reporter: (results,done) => {
        fs.writeFile('testresults.json', JSON.stringify(results, null, '\t'), (err) => {
            if (err) throw err;

            logger.info('report saved')
        });
    }
```

## Code Formatting with Prettier

### How to use Prettier

```bash
npx prettier --write .
```
