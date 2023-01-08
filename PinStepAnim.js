class PinStepAnim {

    constructor(gsapProperties, core) {

        this.gsapProperties = gsapProperties;
        this.core = core;

        if (window.gsap === undefined) {
            this.importScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js",gsapProperties,core);
            return;
        }

        if (window.ScrollTrigger === undefined) {
            this.importScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js",gsapProperties,core)
            return;
        }


        var gsapOutter = this.createScrollTrigger(gsapProperties);
        var gsapInner = this.createScrollTrigger(gsapProperties);


        let index = 0;


        if (core == null || typeof core !== 'object') {

            console.error("core is null or wrong type and require object")
            return;
        }

        if (core.mainElem == null || typeof core.mainElem !== 'object') {
            console.error("core.mainElem is null or wrong type and require object with at least a selector")
            return;
        } else {
            let localIndex = 0;
            if (core.mainElem.selector == null || typeof core.mainElem.selector !== 'string') {
                console.error("core.mainElem.selector is null or wrong type and require a string")
                return;
            } else {

                let blocs = document.querySelectorAll(core.mainElem.selector);

                if (blocs.length > 0) {
                    blocs?.forEach(bloc => {

                        if (core.mainElem.createClass != null && typeof core.mainElem.createClass === 'string') {

                            bloc.classList.add(core.mainElem.createClass);
                            bloc.classList.add(core.mainElem.createClass + "-" + (localIndex + 1).toString());
                        }

                        localIndex++;
                    })

                    core.mainElem.list = blocs;
                } else {
                    console.error("core.mainElem.selector return an empty nodelist, are you sur this element exist ?")
                    return;
                }
            }
        }


        if (core.innerElems == null || !Array.isArray(core.innerElems) || core.innerElems.length <= 0) {
            console.log("core.innerElems non detected")
        } else {

            core.innerElems.forEach(innerElem => {

                if (innerElem.selector == null || typeof innerElem.selector !== 'string') {
                    console.error("innerElem.selector is null or wrong type and require a string")
                    return;
                } else {

                    let blocs = document.querySelectorAll(core.mainElem.selector + " " + innerElem.selector);


                    if (blocs.length < core.mainElem.list.length) {
                        console.warn("list of innerElems '" + innerElem.selector + "' lack : '" + (blocs.length - core.mainElem.list.length) + "' images");
                    }
                    let localIndex = 0;
                    if (blocs.length > 0) {
                        blocs?.forEach(bloc => {

                            if (innerElem.createClass != null && typeof innerElem.createClass === 'string') {
                                bloc.classList.add(innerElem.createClass);
                                bloc.classList.add(innerElem.createClass + "-" + (localIndex + 1).toString());
                            }
                            localIndex++;
                        })

                        innerElem.list = blocs;
                    } else {
                        console.error("innerElem.selector return an empty nodelist, are you sur this element exist ?")
                        return;
                    }

                }


            })

        }



        if (core.outterElems == null || !Array.isArray(core.outterElems) || core.outterElems.length <= 0) {
            console.log("core.outterElems non detected")
        } else {

            core.outterElems.forEach(outterElem => {

                if (outterElem.selector == null || typeof outterElem.selector !== 'string') {
                    console.error("outterElem.selector is null or wrong type and require a string")
                    return;
                } else {

                    let blocs = document.querySelectorAll(outterElem.selector);
                    let localIndex = 0;
                    if (blocs.length > 0) {
                        blocs?.forEach(bloc => {

                            if (outterElem.createClass != null && typeof outterElem.createClass === 'string') {
                                bloc.classList.add(outterElem.createClass);
                                bloc.classList.add(outterElem.createClass + "-" + (localIndex + 1).toString());
                            }
                            localIndex++;
                        })

                        outterElem.list = blocs;
                    } else {
                        console.error("outterElem.selector return an empty nodelist, are you sur this element exist ?")
                        return;
                    }

                }
            })

        }



        if (core.beforeAnims == null || !Array.isArray(core.beforeAnims) || core.beforeAnims.length <= 0) {
            console.log("core.beforeAnims non detected ")
        } else {

            let beforeAnimsIndex = 0;

            core.beforeAnims.forEach(beforeAnim => {
                beforeAnimsIndex++;
                if (beforeAnim.selector == null || typeof beforeAnim.selector !== 'string') {
                    console.error("The " + beforeAnimsIndex+" beforeAnim.selector is null or wrong type and require a string")
                    return;
                } else {

                    let blocs = document.querySelectorAll(beforeAnim.selector);
                    let localIndex = 0;
                    if (blocs.length > 0) {
                        blocs?.forEach(bloc => {

                            if (beforeAnim.createClass != null && typeof beforeAnim.createClass === 'string') {
                                bloc.classList.add(beforeAnim.createClass);
                                bloc.classList.add(beforeAnim.createClass + "-" + (localIndex + 1).toString());
                            }
                            localIndex++;
                        })

                        beforeAnim.list = blocs;
                    } else {
                        console.error("The " + beforeAnimsIndex + " beforeAnim.selector return an empty nodelist, are you sur this element exist ?")
                        return;
                    }

                }
            })

        }

        //AnimBefore

        core.beforeAnims?.forEach(beforeAnim => {

            
            let beforeAnimsIndex = 0;
            beforeAnim.list.forEach(elem => {

                if (beforeAnim.enabled != false) {

                

                    if (beforeAnim.list.length == 1  ) {

                        this.elemFrom(gsapInner, elem, beforeAnim.gsapFrom?.properties, beforeAnim.gsapFrom?.endDelay)
                        this.elemTo(gsapInner, elem, beforeAnim.gsapTo?.properties, beforeAnim.gsapTo?.endDelay)

                    } else {

                        if (beforeAnimsIndex != 0) {
                            this.elemFrom(gsapInner, elem, beforeAnim.gsapFrom?.properties, beforeAnim.gsapFrom?.endDelay)


                        }

                        if (beforeAnim.list.length - 1 != beforeAnimsIndex) {
                            this.elemTo(gsapInner, elem, beforeAnim.gsapTo?.properties, beforeAnim.gsapTo?.endDelay)

                        }
                    }

                    beforeAnimsIndex++;
                }
            })



        })



        core.mainElem.list.forEach(bloc => {

            if (index != 0) {
                this.elemFrom(gsapInner, bloc, core.mainElem.gsapFrom?.properties, core.mainElem.gsapFrom?.endDelay);

                core.innerElems?.forEach(innerElem => {

                    this.elemFrom(gsapInner, innerElem.list[index], innerElem.gsapFrom?.properties, innerElem.gsapFrom?.endDelay)
                })

            }


            if (core.mainElem.list.length - 1 != index) {
                console.log(core.mainElem)
                this.elemTo(gsapInner, bloc, core.mainElem.gsapTo?.properties, core.mainElem.gsapTo?.endDelay);
                core.innerElems?.forEach(innerElem => {



                    this.elemTo(gsapInner, innerElem.list[index], innerElem.gsapTo?.properties, innerElem.gsapTo?.endDelay)
                })

            }

            index++;

        })



        core.outterElems?.forEach(outterElem => {

            let outterIndex = 0;
            outterElem.list.forEach(elem => {


                if (outterElem.list.length == 1) {

                    this.elemFrom(gsapOutter, elem, outterElem.gsapFrom?.properties, outterElem.gsapFrom?.endDelay)
                    this.elemTo(gsapOutter, elem, outterElem.gsapTo?.properties, outterElem.gsapTo?.endDelay)

                } else {

                    if (outterIndex != 0) {
                        this.elemFrom(gsapOutter, elem, outterElem.gsapFrom?.properties, outterElem.gsapFrom?.endDelay)


                    }

                    if (outterElem.list.length - 1 != outterIndex) {
                        this.elemTo(gsapOutter, elem, outterElem.gsapTo?.properties, outterElem.gsapTo?.endDelay)

                    }
                }

                outterIndex++;
            })



        })

    }

    createScrollTrigger(properties) {

        return new gsap.timeline({ scrollTrigger: properties });

    }


    elemFrom(tl, element, gsapProperties, endDelay = null) {

        if (gsapProperties) {

            tl.from(element,
                gsapProperties
                , endDelay)
        }

    }

    elemTo(tl, element, gsapProperties, endDelay = null) {

        if (gsapProperties) {
            tl.to(element,
                gsapProperties
                , endDelay)
        }

    }




    importScript(url,gsapProperties,core) {
        var script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            // script has loaded, you can now use it safely
            new PinStepAnim(gsapProperties,core);
            // ... do something with the newly loaded script
        }  
        document.getElementsByTagName('head')[0].appendChild(script);
       
    }

}
