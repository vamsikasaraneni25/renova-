
/* =====================================
   RENOVA HOSPITALS - JAVASCRIPT
===================================== */

"use strict";


/* =====================================
   MOBILE NAVIGATION MENU
===================================== */

// Get the mobile menu button and navigation
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");

if (menuButton && navigation) {

    // Close the mobile navigation
    function closeMobileMenu() {

        navigation.classList.remove("open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");

    }


    // Open the mobile navigation
    function openMobileMenu() {

        navigation.classList.add("open");

        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close navigation");

    }


    // Toggle navigation when hamburger button is clicked
    menuButton.addEventListener("click", function () {

        const isOpen = navigation.classList.contains("open");

        if (isOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    });


    // Close navigation after selecting a link
    const navigationLinks = navigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            closeMobileMenu();

        });

    });


    // Close navigation when clicking outside the menu
    document.addEventListener("click", function (event) {

        const clickedInsideMenu = navigation.contains(event.target);

        const clickedMenuButton = menuButton.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {

            closeMobileMenu();

        }

    });


    // Close navigation when Escape is pressed
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeMobileMenu();

            if (document.activeElement &&
                navigation.contains(document.activeElement)) {

                menuButton.focus();

            }

        }

    });


    // Reset navigation when switching to desktop layout
    const desktopView = window.matchMedia("(min-width: 851px)");

    function handleScreenChange(event) {

        if (event.matches) {

            closeMobileMenu();

        }

    }

    if (desktopView.addEventListener) {

        desktopView.addEventListener("change", handleScreenChange);

    } else {

        // Compatibility with older browsers
        desktopView.addListener(handleScreenChange);

    }

}


/* =====================================
   APPOINTMENT ENQUIRY FORM
===================================== */

// Find the appointment enquiry form
const form = document.querySelector("#enquiry-form");

// Run only when the appointment form exists
if (form) {

    const status = document.querySelector("#form-status");


    // Display form status messages
    function showFormStatus(message) {

        if (status) {

            status.textContent = message;

        }

    }


    // Clear old messages when the visitor edits the form
    form.addEventListener("input", function () {

        showFormStatus("");

    });


    // Handle form submission
    form.addEventListener("submit", function (event) {

        // Prevent the page from reloading
        event.preventDefault();

        // Clear previous status messages
        showFormStatus("");


        /* =====================================
           CHECK REQUIRED FIELDS
        ===================================== */

        if (!form.reportValidity()) {

            showFormStatus(
                "Please complete all required fields correctly."
            );

            return;

        }


        /* =====================================
           COLLECT FORM INFORMATION
        ===================================== */

        const data = new FormData(form);

        const name = String(data.get("name") || "").trim();

        const phone = String(data.get("phone") || "").trim();

        const email = String(data.get("email") || "").trim();

        const purpose = String(data.get("purpose") || "").trim();

        const message = String(data.get("message") || "").trim();


        /* =====================================
           VALIDATE NAME
        ===================================== */

        if (name.length < 2) {

            showFormStatus(
                "Please enter your full name."
            );

            form.querySelector("#full-name")?.focus();

            return;

        }


        /* =====================================
           VALIDATE PHONE NUMBER
        ===================================== */

        const phonePattern = /^[+0-9()\s-]{8,18}$/;

        const digitsOnly = phone.replace(/\D/g, "");

        if (!phonePattern.test(phone) ||
            digitsOnly.length < 8 ||
            digitsOnly.length > 15) {

            showFormStatus(
                "Please enter a valid phone number."
            );

            form.querySelector("#phone")?.focus();

            return;

        }


        /* =====================================
           VALIDATE EMAIL ADDRESS
        ===================================== */

        const emailField = form.querySelector("#email");

        if (!email || (emailField && !emailField.checkValidity())) {

            showFormStatus(
                "Please enter a valid email address."
            );

            emailField?.focus();

            return;

        }


        /* =====================================
           VALIDATE ENQUIRY PURPOSE
        ===================================== */

        if (!purpose) {

            showFormStatus(
                "Please select the purpose of your enquiry."
            );

            form.querySelector("#purpose")?.focus();

            return;

        }


        /* =====================================
           PREPARE EMAIL CONTENT
        ===================================== */

        const emailBody = [

            "Appointment enquiry from Renova Hospitals website",

            "",

            "Patient / Visitor Details",

            "-------------------------",

            `Name: ${name}`,

            `Phone: ${phone}`,

            `Email: ${email}`,

            `Purpose: ${purpose}`,

            "",

            "Additional Message",

            "-------------------------",

            message || "No additional message provided."

        ].join("\n");


        /* =====================================
           PREPARE EMAIL SUBJECT
        ===================================== */

        const emailSubject = `Appointment enquiry - ${name}`;


        /* =====================================
           OPEN EMAIL APPLICATION
        ===================================== */

        const recipient = "canceratrenova@gmail.com";

        const mailtoLink =
            `mailto:${recipient}` +
            `?subject=${encodeURIComponent(emailSubject)}` +
            `&body=${encodeURIComponent(emailBody)}`;


        // Inform the visitor that they must send the email
        showFormStatus(
            "Your email application should open with your enquiry. " +
            "Please review the details and press Send in your email app."
        );


        // Open the visitor's default email application
        window.location.href = mailtoLink;

    });

}
