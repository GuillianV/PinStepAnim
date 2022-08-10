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

        //Non obligatoire
        beforeAnims: [ //Liste des animations a jouer avant la principale.
            {
                createClass:"class-created", //Crée une classe sur l'element selectionné
                selector: ".ct-rea-av", //Le selecteur de l'element à animer
                enabled: true, //Active ou desactive l'animation
                gsapFrom: { //Equivalant au gsap from
                    properties: {  //Propriétés gsap 
                        x: "-100px",
                    },
                    endDelay: "-=0.5" //Délais avant la fin de l'animation
                },

                gsapTo: { //Equivalant au gsap to
                    properties: {
                       x: "100px",
                    },
                },
            }
        ],

        //Requis
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
    //Non obligatoire
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
    //Non obligatoire
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
