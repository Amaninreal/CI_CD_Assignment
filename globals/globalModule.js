const allureReporter = require("nightwatch-allure");
const fs = require("fs");
const logger = require("../helper/logger.js");

module.exports = {
  user: "${USER_NAME}",
  pass: "${PASSWORD}",
  url: "${Base_url}",
  before: (done) => {
    logger.info("before");
    done();
  },
  after: (done) => {
    logger.info("after");
    done();
  },
  beforeEach: (browser, done) => {
    logger.info("before Each");
    browser.status((result) => {
      logger.info(result.value);
      done();
    });
  },
  afterEach: (browser, done) => {
    logger.info("afterEach");
    logger.info(browser.currentTest);
    done();
  },
  reporter: (results, done) => {
    const reporter = new allureReporter.NightwatchAllureReporter({});
    reporter.write(results, done);
  },
  reporterJson: (results, done) => {
    fs.writeFile(
      "testresults.json",
      JSON.stringify(results, null, "\t"),
      (err) => {
        if (err) throw err;

        logger.info("report saved!");
      },
    );
  },
};
