document.addEventListener('DOMContentLoaded', function() {

    console.log('DOM chargé');


    

    let parentContainer = document.querySelector(".wrapper")


    new PinStepAnim({
        trigger: parentContainer,
        start: "center center",
        end: "+=1300 bottom",
        pin: true,
        markers: true,
        scrub: 1,
       pinSpacing: false,
        toggleActions: "Play Reverse none none"
    }, {



        mainElem: {

            selector: document.querySelectorAll(".block-etape"),
            createClass: "b",
            gsapFrom: {
                properties: {
                    yPercent: 200,
                    opacity: 0,
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


        },{
            selector: ".images-anim-img",
            gsapFrom: {
                properties: {

                    xPercent: 100,

                },
                endDelay: "<0"
            },

            gsapTo: {
                properties: {
                    yPercent: -100,
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
      

    })


})