var todayDay = new Date().toLocaleDateString('en-CA');

function validatename() {
  var name = document.getElementById("contact-name").value;

  if (name.length == 0) {
    nameError.innerHTML = "Name is required";
    return false;
  }
  if (!name.match(/^[a-zA-Z]*\s{1}[a-zA-Z]*$/)) {
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
  if (!email.match(/^[a-zA-z\._\-[0-9]*@[a-zA-Z]*[\.][a-zA-Z]{2,4}$/)) {
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
  if (!cemail.match(/^[a-zA-z\._\-[0-9]*@[a-zA-Z]*[\.][a-zA-Z]{2,4}$/)) {
    cemailError.innerHTML = "confirm your email";
    return false;

  }
  cemailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  return true;

}

function handleGenderChange() {
  var genderDropdown = document.getElementById("gender");
  var selectedGenderText = genderDropdown.options[genderDropdown.selectedIndex].text;
  var selectedGenderDisplay = document.getElementById("selectedGender");
  selectedGenderDisplay.textContent = "You selected: " + selectedGenderText;
}

function changeAppinmentgDate() {
  let appoinment_date = document.getElementById('appoinment_date').value;
  localStorage.setItem('selectedDate', appoinment_date);
  updateSummaryTable()
}


// JavaScript code to handle user interactions and dynamically update the page
var guestsTable = document.getElementById('guestsTable');
var durationSelect = document.getElementById('duration');
var summaryTable = document.getElementById('summaryTable');
var continueBtn = document.getElementById('continueBtn');

// Function to update the summary table based on user inputs
function updateSummaryTable() {
  // Get selected date from local storage
  var selectedDate = localStorage.getItem('selectedDate') || todayDay;
  var selectedDuration = durationSelect.value;

  // Get ticket quantities from local storage
  var ticketQuantities = {
    'SL Adult': localStorage.getItem('SL Adult') || '0',
    'SL Child': localStorage.getItem('SL Child') || '0',
    'Foreigner Adult': localStorage.getItem('Foreigner Adult') || '0',
    'Foreigner Child': localStorage.getItem('Foreigner Child') || '0',
    'Infant': localStorage.getItem('Infant') || '0',
  };

  // Calculate charges for each ticket category
  var charges = {
    'SL Adult': ticketQuantities['SL Adult'] * (selectedDuration.includes('Peak') ? 6 : 4),
    'SL Child': ticketQuantities['SL Child'] * (selectedDuration.includes('Peak') ? 3 : 2),
    'Foreigner Adult': ticketQuantities['Foreigner Adult'] * (selectedDuration.includes('Peak') ? 13 : 10),
    'Foreigner Child': ticketQuantities['Foreigner Child'] * (selectedDuration.includes('Peak') ? 8 : 5),
    'Infant': 0, // Infants (SL or Foreigner) are free
  };

  // Calculate total payable amount
  let totalPayable = 0;
  for (var ticket in charges) {
    totalPayable += charges[ticket];
  }

  localStorage.setItem('selectedDuration', selectedDuration);

  // Update the summary table
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
}

function passticDelData() {
  location.href = "./tikform.html";
}

// Function to handle changes in the duration selection
durationSelect.addEventListener('change', () => {
  updateSummaryTable();
});

// Function to handle changes in ticket quantities
guestsTable.addEventListener('change', (event) => {
  var ticketType = event.target.dataset.ticketType;
  var ticketQuantity = event.target.value;
  localStorage.setItem(ticketType, ticketQuantity);
  updateSummaryTable();
});

function onPageLoad() {
  // Check if the selected date exists in local storage
  var selectedDate = localStorage.getItem('selectedDate');
  if (selectedDate) {
    // Update the calendar with the selected date
    // Code to update the calendar will be added here
  } else {
    // If no selected date in local storage, set current date
    localStorage.setItem('selectedDate', todayDay);
  }

  // Populate the guests table with initial ticket quantities
  guestsTable.innerHTML = `
    <tr>
      <td>SL Adult</td>
      <td><input type="number" data-ticket-type="SL Adult" value="${localStorage.getItem('SL Adult') || 0}"></td>
    </tr>
    <tr>
      <td>SL Child</td>
      <td><input type="number" data-ticket-type="SL Child" value="${localStorage.getItem('SL Child') || 0}"></td>
    </tr>
    <tr>
      <td>Foreigner Adult</td>
      <td><input type="number" data-ticket-type="Foreigner Adult" value="${localStorage.getItem('Foreigner Adult') || 0}"></td>
    </tr>
    <tr>
      <td>Foreigner Child</td>
      <td><input type="number" data-ticket-type="Foreigner Child" value="${localStorage.getItem('Foreigner Child') || 0}"></td>
    </tr>
    <tr>
      <td>Infant</td>
      <td>Free</td>
    </tr>
  `;

  updateSummaryTable();
}


onPageLoad();
