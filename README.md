# PinStepAnim

* Used to make pinned anims using gsap
* `new  PinStepAnim(scrollTriggerProperties, core)`
* core require at least a mainElem.


```javascript

let parentContainer = document.querySelector(".approche-anim")


new PinStepAnim({
    trigger: parentContainer,
    start: "center center",
    end: "+=1300 center",
    pin: true,
    markers: true,
    scrub: 1,
    toggleActions: "Play Reverse none none"
}, {

    mainElem: {

        selector: ".block-etape",
        //createClass: "block-test",
        gsapFrom: {
            properties: {

                yPercent: 200,
                opacity: 0,
                clearProps: "all"
            },
            endDelay: "-=0.5"
        },

        gsapTo: {
            properties: {

                yPercent: -200,
                opacity: 0,
            },
        },

    },
    innerElems: [{
        selector: ".etapeTitle",
        gsapFrom: {
            properties: {

                yPercent: 40,

            },
            endDelay: "<0"
        },

        gsapTo: {
            properties: {
                yPercent: -40,
            },
            endDelay: "<0"

        },


    }, {
        selector: ".number",
        gsapFrom: {
            properties: {

                yPercent: 20,

            },
            endDelay: "<0"
        },

        gsapTo: {
            properties: {
                yPercent: -20,
            },
            endDelay: "<0"

        },
    }],
    outterElems: [{
        selector: ".elem",
        gsapFrom: {
            properties: {
                yPercent: 100,

            },
              endDelay: "-=0.5"
        },

        gsapTo: {
            properties: {
                yPercent: -100,
            },

        },


    }]

})

```