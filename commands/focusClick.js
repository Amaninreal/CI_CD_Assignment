exports.command = function customClick(type, selector) {
  const isCSS = type.toLowerCase() === "css";

  this.execute(
    function (type, selector) {
      if (type === "css") {
        document.querySelector(selector).click();
      } else {
        const result = document.evaluate(
          selector,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        );
        const element = result.singleNodeValue;
        if (element) {
          element.click();
        }
      }
    },
    [type, selector],
  );
  return this;
};

