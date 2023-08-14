var nameError = document.getElementById("name-error");
var phoneError = document.getElementById("phone-error");
var emailError = document.getElementById("email-error");
var cemailError = document.getElementById("cemail-error");
var genderError = document.getElementById("gender-error");

function validatename() {
    var name = document.getElementById("contact-name").value;

    if (name.length == 0) {
        nameError.innerHTML = "Name is required";
        return false;
    }
    if (!name.match(/^[a-zA-Z]\s{1}[a-zA-Z]$/)) {
        nameError.innerHTML = "Write your full name";
        return false;
    }
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}

function validateemail() {
    var email = document.getElementById("contact-email").value;

    if (email.length == 0) {
        emailError.innerHTML = "Email is required";
        return false;
    }
    if (!email.match(/^[a-zA-z\._\-[0-9]@[a-zA-Z][\.][a-zA-Z]{2,4}$/)) {
        emailError.innerHTML = "Enter a valid email";
        return false;
    }
    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;

}

function validatecemail() {
    var cemail = document.getElementById("contact-cemail").value;

    if (cemail.length == 0) {
        cemailError.innerHTML = "Email is required";
        return false;

    }

    if (cemail !== email) {
        var email = document.getElementById("contact-email").value;
        cemailError.innerHTML = "Email does not match";
        return false;
    }

    if (!cemail.match(/^[a-zA-z\._\-[0-9]@[a-zA-Z][\.][a-zA-Z]{2,4}$/)) {
        cemailError.innerHTML = "confirm your email";
        return false;

    }
    cemailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;

}

function handleGenderChange() {
    // Handle gender selection change
    // Add your logic here
}
function validateForm() {
    // Call individual validation functions
    validateName();
    validatePhone();
    validateEmail();
    validateConfirmEmail();
    validateMassage();

    const errors = document.querySelectorAll(".error");
    let hasErrors = false;

    errors.forEach(function (error) {
        if (error.textContent !== "") {
            hasErrors = true;
        }
    })

    if (hasErrors) {
        document.getElementById("submit-error").textContent = "Please correct the errors above.";
    } else {
        document.getElementById("submit-error").textContent = "";
        // Proceed with form submission
    }
}

function validateName() {
    // Your validation logic for name
}

// ... Other validation functions ...

function handleGenderChange() {
    // Your logic when gender selection changes
}

document.addEventListener("DOMContentLoaded", function () {
    var todayDay = new Date().toLocaleDateString('en-CA');
    var summaryTable = document.getElementById('summaryTable');

    var selectedDuration = localStorage.getItem('selectedDuration');

    var selectedDate = localStorage.getItem('selectedDate') || todayDay;

    var ticketQuantities = {
        'SL Adult': localStorage.getItem('SL Adult') || '0',
        'SL Child': localStorage.getItem('SL Child') || '0',
        'Foreigner Adult': localStorage.getItem('Foreigner Adult') || '0',
        'Foreigner Child': localStorage.getItem('Foreigner Child') || '0',
        'Infant': localStorage.getItem('Infant') || '0',
    };

    var charges = {
        'SL Adult': ticketQuantities['SL Adult'] * (selectedDuration.includes('Peak') ? 6 : 4),
        'SL Child': ticketQuantities['SL Child'] * (selectedDuration.includes('Peak') ? 3 : 2),
        'Foreigner Adult': ticketQuantities['Foreigner Adult'] * (selectedDuration.includes('Peak') ? 13 : 10),
        'Foreigner Child': ticketQuantities['Foreigner Child'] * (selectedDuration.includes('Peak') ? 8 : 5),
        'Infant': 0, // Infants (SL or Foreigner) are free
    };

    let totalPayable = 0;
    for (var ticket in charges) {
        totalPayable += charges[ticket];
    }

    summaryTable.innerHTML = `
    <tr>
      <td>Date</td>
      <td>${selectedDate}</td>
    </tr>
    <tr>
      <td>Time</td>
      <td>${selectedDuration}</td>
    </tr>
    <tr>
      <td>Duration</td>
      <td>${selectedDuration.includes('Peak') ? 'Peak hour' : 'Normal hour'}</td>
    </tr>
    <tr>
      <td>Tickets</td>
      <td>Charges</td>
    </tr>
    ${Object.keys(charges).map(ticket => `<tr><td>${ticket}</td><td>$${charges[ticket]}</td></tr>`).join('')}
    <tr>
      <td>Total Payable</td>
      <td>$${totalPayable}</td>
    </tr>
  `;

    const form = document.querySelector("form");
    const cardNumberInput = document.getElementById("num");
    const cardHolderInput = document.getElementById("hol");
    const expirationMonthInput = document.getElementById("Myman");
    const expirationYearInput = document.getElementById("youman");
    const cvvInput = document.getElementById("cas");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (cardNumberInput.value.length != 10) {
            alert("Invalid card number. Please enter a valid 10-digit card number.");
            return;
        }

        if (cardHolderInput.value.trim() === "") {
            alert("Please enter the card holder's name.");
            return;
        }

        if (expirationMonthInput.value === "month" || expirationYearInput.value === "year") {
            alert("Please select a valid expiration month and year.");
            return;
        }

        if (!validateCVV(cvvInput.value)) {
            alert("Invalid CVV/CVC. Please enter a valid 3-4 digit CVV/CVC.");
            return;
        }

        window.location.href = "./confermation.html";
        // Here you can add code to actually submit the form to the server
    });

    function validateCardNumber(cardNumber) {
        return /^\d{16}$/.test(cardNumber);
    }

    function validateCVV(cvv) {
        return /^\d{3,4}$/.test(cvv);
    }
});

function netxPage()
{
    window.location.href = "./pay.html";
}
