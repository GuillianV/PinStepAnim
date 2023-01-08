document.addEventListener('DOMContentLoaded', function() {

    console.log('DOM chargé');


    

    let parentContainer = document.querySelector(".wrapper")


    new PinStepAnim({
        trigger: parentContainer,
        start: "bottom bottom",
        end: "+=1300 bottom",
        pin: true,
        markers: true,
        scrub: 1,
       pinSpacing: false,
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
      outterElems:[{
        selector:".images-anim-img",
        gsapFrom:{
          properties:{
            xPercent:100,
          },
          
        },
       
      }]

    })


})