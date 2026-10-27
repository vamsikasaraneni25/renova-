
/* =====================================
   RENOVA HOSPITALS - JAVASCRIPT
===================================== */


/* =====================================
   MOBILE NAVIGATION MENU
===================================== */

// Get the menu button and navigation

const menuButton = document.querySelector(".menu-toggle");

const navigation = document.querySelector("#site-nav");


// Open and close the mobile menu

if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));

        if (isOpen) {

            menuButton.setAttribute("aria-label", "Close navigation");

        } else {

            menuButton.setAttribute("aria-label", "Open navigation");

        }

    });


    // Close the menu after selecting a page

    const navigationLinks = navigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navigation.classList.remove("open");

            menuButton.setAttribute("aria-expanded", "false");

        });

    });

}



/* =====================================
   APPOINTMENT ENQUIRY FORM
===================================== */

// Get the appointment form

const form = document.querySelector("#enquiry-form");


// Run the code only on pages with the form

if (form) {

    form.addEventListener("submit", function (event) {

        // Prevent the page from reloading

        event.preventDefault();


        // Get the status message area

        const status = document.querySelector("#form-status");


        // Check required form fields

        if (!form.reportValidity()) {
            return;
        }


        // Get the entered information

        const data = new FormData(form);

        const name = String(data.get("name") || "").trim();

        const phone = String(data.get("phone") || "").trim();


        // Validate name and phone number

        if (name.length < 2 || !/^[+0-9()\s-]{8,18}$/.test(phone)) {

            status.textContent =
                "Please enter a valid name and phone number.";

            return;

        }


        // Prepare the email message

        const body = [

            "Appointment enquiry from Renova Hospitals website",

            "",

            `Name: ${name}`,

            `Phone: ${phone}`,

            `Email: ${data.get("email")}`,

            `Purpose: ${data.get("purpose")}`,

            `Message: ${data.get("message") || "None"}`

        ].join("\n");


        // Prepare the email subject

        const subject = encodeURIComponent(
            `Appointment enquiry - ${name}`
        );


        // Open the visitor's email application

        window.location.href =
            `mailto:canceratrenova@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;


        // Show the confirmation instruction

        status.textContent =
            "Your email app should open with the enquiry. Please review and send it there.";

    });

}
