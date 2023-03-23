class PinStepAnim {
  constructor(gsapProperties, core) {
    this.gsapProperties = gsapProperties;
    this.core = core;

    if (window.gsap === undefined) {
      this.importScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js",
        gsapProperties,
        core
      );
      return;
    }

    if (window.ScrollTrigger === undefined) {
      this.importScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js",
        gsapProperties,
        core
      );
      return;
    }

    let isValid = this.createMainElem();
    if (!isValid) return;

    this.createInnerElem();
    this.animate();
  }

  createMainElem() {

    let localCore = this.core;
    localCore.mainElem.list = [];
    let mainElemExemple = {
      mainElem: {
        selector: "Your block selector (.block-etape)",
        createClass: "Generate custom class on each MainElem (block-test)",
        gsapFrom: {
          properties: {
            gsapProps:
              "all start gsap properties that you want to animate (x:100)",
          },
          endDelay: "-=0.5",
        },

        gsapTo: {
          properties: {
            gsapProps:
              "all end gsap properties that you want to animate (x:-100)",
          },
        },
      },
    };

    if (localCore == null || typeof localCore !== "object") {
      this.showError(
        "core is null or wrong type and require object",
        mainElemExemple
      );
      return false;
    }

    if (localCore.mainElem == null || typeof localCore.mainElem !== "object") {
      this.showError(
        "core.mainElem is null or wrong type and require object with at least a selector",
        mainElemExemple
      );

      return false;
    } else {
      let localSelector = localCore.mainElem.selector;
      let mainElems = this.getDOMElements(localSelector);

      if (typeof mainElems === "undefined" || mainElems.length <= 0) {
        this.showError(
          "core.mainElem.selector return an empty nodelist, are you sur this element exist ?",
          mainElemExemple
        );
        return false;
      }

      let localCreateClass = localCore.mainElem.createClass;
      mainElems?.forEach((bloc, index) => {
        if (localCreateClass != null && typeof localCreateClass === "string") {
          bloc.classList.add(localCreateClass);
          bloc.classList.add(localCreateClass + "-" + (index + 1).toString());
        }
      });

      localCore.mainElem.list = mainElems;
      return true;
    }
  }

  createInnerElem() {
    
    let localCore = this.core;
    let localInnerElems = localCore.innerElems;

    let innerElemExemple = {innerElems: [{
        selector: "Css Selector or Nodelist (.etapeTitle) ",
        gsapFrom: {
            properties: {

                gsapProps:
                "all start gsap properties that you want to animate (x:10)",

            },
            endDelay: "<0"
        },

        gsapTo: {
            properties: {
                gsapProps:
                "all start gsap properties that you want to animate (x:-10)",
            },
            endDelay: "<0"

        },


    },]};

    if (
      localInnerElems == null ||
      !Array.isArray(localCore.innerElems) ||
      localCore.innerElems.length <= 0
    ) {
      this.showWarn("core.innerElems is empty");
    } else {
      localInnerElems.forEach((innerElem) => {
        let innerElemDOM = this.getDOMElements(`${innerElem.selector}`);
        if (typeof innerElemDOM === "undefined" || innerElemDOM.length <= 0) {
          this.showError(
            "core.innerElems.selector return an empty nodelist, are you sur this element exist ?",
            innerElemExemple
          );
          return false;
        }

        if (innerElemDOM.length < localCore.mainElem.list.length) {
          this.showWarn(`list of innerElems '${innerElem.selector}' lack : '${(localCore.mainElem.list.length - innerElemDOM.length)}' elements`);
        }

        innerElemDOM?.forEach((bloc,index) => {
            if (
              innerElem.createClass != null &&
              typeof innerElem.createClass === "string"
            ) {
              bloc.classList.add(innerElem.createClass);
              bloc.classList.add(
                innerElem.createClass + "-" + (index + 1).toString()
              );
            }
          });

          innerElem.list = innerElemDOM;
       
      });
    }
  }

  animate() {
    let gsapInner = this.createScrollTrigger(this.gsapProperties);
    let localCore = this.core;
    let localMainElem = localCore.mainElem;
    let localInnerElems = localCore.innerElems;

    localMainElem.list.forEach((bloc, index) => {
      if (index != 0) {
        this.elemFrom(
          gsapInner,
          bloc,
          localMainElem.gsapFrom?.properties,
          localMainElem.gsapFrom?.endDelay
        );

        localInnerElems?.forEach((innerElem) => {
          this.elemFrom(
            gsapInner,
            innerElem.list[index],
            innerElem.gsapFrom?.properties,
            innerElem.gsapFrom?.endDelay
          );
        });
      }

      if (localMainElem.list.length - 1 != index) {
        console.log(localMainElem);
        this.elemTo(
          gsapInner,
          bloc,
          localMainElem.gsapTo?.properties,
          localMainElem.gsapTo?.endDelay
        );
        localInnerElems?.forEach((innerElem) => {
          this.elemTo(
            gsapInner,
            innerElem.list[index],
            innerElem.gsapTo?.properties,
            innerElem.gsapTo?.endDelay
          );
        });
      }
    });
  }

  // Return a NodeList of elements
  getDOMElements(selector) {
    let nodelist = [];

    if (
      selector == null ||
      (typeof selector !== "string" && typeof selector !== "object")
    ) {
      return nodelist;
    }

    switch (typeof selector) {
      case "string":
        nodelist = document.querySelectorAll(selector);
        break;

      case "object":
        if (selector instanceof NodeList) nodelist = selector;
        else if (selector instanceof HTMLElement) nodelist = [selector];
        break;
    }

    return nodelist;
  }

  showWarn(errorDescription, errorObject = null) {
    let hostname = window.location.hostname;
    if (
      hostname != "" &&
      !hostname.includes("localhost") &&
      !hostname.includes("beta.boondooa")
    )
      return;

    console.warn(errorDescription);
    if (typeof errorObject === "object") {
      console.dir(errorObject);
    }
  }

  showError(errorDescription, errorObject = null) {
    console.error(errorDescription);
    if (typeof errorObject === "object") {
      console.dir(errorObject);
    }
  }

  createScrollTrigger(properties) {
    return new gsap.timeline({ scrollTrigger: properties });
  }

  elemFrom(tl, element, gsapProperties, endDelay = null) {
    if (gsapProperties) {
      tl.from(element, gsapProperties, endDelay);
    }
  }

  elemTo(tl, element, gsapProperties, endDelay = null) {
    if (gsapProperties) {
      tl.to(element, gsapProperties, endDelay);
    }
  }

  importScript(url, gsapProperties, core) {
    var script = document.createElement("script");
    script.src = url;
    script.onload = () => {
      // script has loaded, you can now use it safely
      new PinStepAnim(gsapProperties, core);
      // ... do something with the newly loaded script
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}
