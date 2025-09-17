console.log("Tarea");
console.log(gsap);

window.addEventListener("mousedown", function(){

    gsap.to(".sol", {
        y: -200,
        duration: 3,
        backgroundColor: "yellow",
        ease: "power1.out",
        onComplete: function() {

            gsap.to(".sol", {
                y: 0,
                duration: 3,
                backgroundColor: "#7e8700",
                ease: "power1.in"
            });
        }
    });


    gsap.to(".pasto", {
        duration: 6,      
        backgroundColor: "#004d04",
        ease: "none"          
    });


    gsap.to(".cielo", {
        duration: 7,      
        backgroundColor: "#005e87",
        ease: "none"          
    });
});