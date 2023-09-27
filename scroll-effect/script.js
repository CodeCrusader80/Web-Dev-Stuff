document.addEventListener("DOMContentLoaded", function () {
    const totalSlides = 5;
    const sectionHeight = (document.body.scrollHeight - window.innerHeight) / totalSlides;

    const slides = document.querySelectorAll(".slide");

    slides.forEach((slide, index) => {
        gsap.to(slide, {
            zIndex: (progress) => {
                return progress < 0.5 ? 0 : 5 - index;
            },
            scrollTrigger: {
                start: sectionHeight * index + "px top",
                end: sectionHeight * (index + 1) + "px top",
                scrub: 1,
            },
        });

        gsap.fromTo(slide, {
            scale: index === 0 ? 1 : 0,
        }, {
            scale: 1,
            scrollTrigger: {
                start: sectionHeight + index + "px top",
                end: sectionHeight - (index + 1) + "px top",
                scrub: 1,
            },
        }
      );
    });
});