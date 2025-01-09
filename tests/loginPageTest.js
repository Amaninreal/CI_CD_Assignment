const logger = require("../helper/logger.js");
const global = browser.globals;

let loginPage = browser.page.loginPage();

describe("Login Page Verification", () => {
  before((browser) => {
    browser.window.maximize().url(global.url);
  });

  after(async (browser) => {
    browser.quit();
  });

  it("Verify that the elements of LoginPage are visible", function () {
    loginPage
      .waitForElementVisible("@header", 5000)
      .assert.titleContains("Sign in to nashtech");
    logger.info("Test Executed");
  });
  it('Verify "Go1Percent" logo, carousel images, carousel caption and the footer message (TC-337) - Version1', function () {
    loginPage
      .waitForElementVisible("@goLogo")
      .waitForElementVisible("@oneLogo")
      .assert.visible("@goLogo")

      .waitForElementVisible("@crouselImg")
      .waitForElementPresent("@crouselCaption")
      .waitForElementPresent("@footerMessage");
  });
  it('Verify that tag line with text "Get 1% Better Everyday" is displayed (TC-338) - Version1', function () {
    loginPage.assert.visible(
      "@crouselCaption",
      "Get 1% Better Everyday is displayed",
    );
  });
  it("Verify that carousel image changes while clicking on carousel button (TC-339) - Version1 ", function () {
    loginPage
      // Wait for the carousel to be visible
      .waitForElementVisible(".carousel")

      // Assert that the initial active indicator is present
      .assert.elementPresent("@activeIndicatorSelector");

    browser.execute(() => {
      document.querySelector(".carousel-indicators li:nth-child(2)").click();
    });

    loginPage.assert.elementPresent("@activeIndicatorSelector");
  });
  it("Verify that specific text between login options is present on the web page (TC-341) - Version1", function () {
    loginPage
      .waitForElementVisible("@loginText", 5000)
      .assert.containsText("@loginText", "or do it via E-mail");
  });
  it('Verify that login page heading contains text "Sign in to Go 1%" is displayed (TC-340) - Version1', function () {
    loginPage
      .waitForElementVisible("@signInText", 2000)
      .assert.visible("@signInText");
  });
  it("Verify that clicking on the Microsoft logo redirects to the Microsoft login page (TC-342) - Version1", function () {
    loginPage
      .waitForElementVisible("@microsoftLogo", 10000)
      .execute(() => {
        document.querySelector("#social-oidc").click();
      })
      .assert.urlContains("//login.microsoftonline.com/");
    browser.back();
  });
  it("Verify remember me checkbox is selected during login (TC-345) - Version1 ", function () {
    loginPage
      .enterNameAndPassword(global.user, global.pass)
      .execute(() => {
        document.querySelector("input#rememberMe").click();
      })
      .expect.element("#rememberMe")
      .to.be.selected.before(100);
  });
  it("Verify the forgot Password functionality (TC-346) - Version1", async function () {
    loginPage.waitForElementVisible("@forgetPass");
    await browser.execute(function () {
      const xpath = '//a[contains(text(), "Forgot Password?")]';
      const element = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;
      if (element) {
        element.click();
      } else {
        console.log("Forgot Password link not found.");
      }
    });
    loginPage.assert.urlContains("/login-actions").enterName("abcd");
    await browser.execute(() => {
      document.querySelector("input[value='Submit']").click();
    });
    loginPage.assert.textContains(
      "@forgetPassPopUp",
      "You should receive an email shortly with further instructions.",
    );
    browser.back();
  });

  it('Verify clicking on the "Terms of Use" link opens a new page with the terms of use ', function () {
    browser
      .execute(() => {
        document.querySelector("div.term-privacy > a:nth-child(1)").click();
      })
      .windowHandles(function (result) {
        const originalHandle = result.value[0];
        const handle = result.value[1];
        this.switchWindow(handle).assert.urlContains("/terms-of-use");
        this.switchWindow(originalHandle);
      });
  });
  it('Verify clicking on the "privacy Policy" link opens a new page with the terms of use ', function () {
    loginPage.getTitle(function (title) {
      logger.info("Title:", title);
    });
    browser.execute(() => {
      document.querySelector("div.term-privacy > a:nth-child(2)").click();
    });
    browser.window.getAllHandles(function (result) {
      const originalHandle = result.value[0];
      const handle = result.value[2];
      this.window.switch(handle).assert.urlContains("/privacy-policy");
      this.window.switch(originalHandle);
    });
  
  });
});

