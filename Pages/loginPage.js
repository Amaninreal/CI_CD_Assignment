const elements = {
  activeIndicatorSelector: ".carousel-indicators li.active",
  crouselCaption: "#myCarousel > div > div.item.active > div > h3",
  crouselImg: "#myCarousel > div > div>img",
  footerMessage: ".tagsss b",
  forgetPass: ".forget-pass",
  forgetPassPopUp: {
    selector:
      "//span[@class= 'pf-c-alert__title kc-feedback-text' and contains(text(), 'You should receive an email shortly with further instructions.') ]",
    locateStrategy: "xpath",
  },
  goLogo: ".go1up-logo",
  header: ".container-fluid",
  loginBtn: "#kc-login",
  loginText: {
    selector: '//h4[contains(., "or do it via E-mail")]',
    locateStrategy: "xpath",
  },
  logout: {
    selector:
      "//i[@class = 'material-icons cursor-pointer' and contains(text(), 'logout')]",
    locateStrategy: "xpath",
  },
  microsoftLogo: "#social-oidc",
  nextCrousel: ".carousel-indicators li:nth-child(2)",
  oneLogo: ".onepercenet-logo",
  passwordInput: "#password",
  popUpMesage: {
    selector:
      '//span[@id="input-error" and contains(text(), "Invalid username or password.")]',
    locateStrategy: "xpath",
  },
  privacyLink: "div.term-privacy > a:nth-child(2)",
  setting: ".material-icons.user-icon",
  signInText: {
    selector:
      '//h1[@id="kc-page-title" and contains(text(), "Sign in to Go 1%")]',
    locateStrategy: "xpath",
  },
  submit: "input[value='Submit']",
  termslink: "div.term-privacy > a:nth-child(1)",
  userNameInput: "#username",
};
const commands = [
  {
    clickOnPrivacypolicy() {
      return this.click("@privacyLink");
    },

    clickOnTermsofuse() {
      return this.click("@termslink");
    },
    /**
     * Enters the given name & password into the left form feilds
     *
     * @param{String} name
     * @param{String} password
     *
     */
    
    enterNameAndPassword(name, password) {
      return this.setValue("@userNameInput", name).setValue(
        "@passwordInput",
        password,
      );
    },
    enterName(name) {
      return this.setValue("@userNameInput", name);
    },
    forgetPasswordBtn() {
      return this.click("@forgetPass");
    },

    loginBtn() {
      return this.click("@loginBtn");
    },

    microsoftLogoBtn() {
      return this.click("@microsoftLogo");
    },

    nextCrouselBtn() {
      return this.click("@nextCrousel");
    },

    RememberMeClick() {
      return this.waitForElementVisible("@RememberMeBtn", 5000).click(
        "@RememberMeBtn",
      );
    },

    submitBtn() {
      return this.click("@submit");
    },
  },
];

module.exports = {
  elements: elements,
  commands: commands,
};
