document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Typing Animation ---
    const typingTextElement = document.getElementById("typing-text");
    const phrases = [
        "Hello, I'm Zabiullah Noor",
        "Software Developer | Web Developer | Problem Solver"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const pauseTime = 2000; // Pause at full phrase

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }

        setTimeout(typeEffect, delay);
    }

    if (typingTextElement) {
        typeEffect();
    }

    // --- 2. Sliding Contact Panel & Nav Links ---
    const contactPanel = document.getElementById("contactPanel");
    const openBtn = document.getElementById("openContact");
    const closeBtn = document.getElementById("closeContact");
    const navContactLink = document.querySelector('a[href="#Contact"]');

    const openPanel = (e) => {
        if (e) e.preventDefault();
        contactPanel.classList.add("active");
    };

    const closePanel = () => {
        contactPanel.classList.remove("active");
    };

    if (openBtn) openBtn.addEventListener("click", openPanel);
    if (closeBtn) closeBtn.addEventListener("click", closePanel);
    if (navContactLink) navContactLink.addEventListener("click", openPanel);

    // Close panel when clicking outside of it
    document.addEventListener("click", (e) => {
        if (
            contactPanel &&
            contactPanel.classList.contains("active") &&
            !contactPanel.contains(e.target) &&
            e.target !== openBtn &&
            e.target !== navContactLink
        ) {
            closePanel();
        }
    });

    // --- 3. Smooth Scrolling for Navigation ---
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#Contact"])');

    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // --- 4. Form Submission ---
    const contactForms = document.querySelectorAll(".Modern_Form");
    contactForms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Thank you for your message! I will get back to you soon.");
            form.reset();
            closePanel();
        });
    });
});