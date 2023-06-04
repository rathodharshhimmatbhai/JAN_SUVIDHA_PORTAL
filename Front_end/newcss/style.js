const form = document.querySelector('form');
const fname = document.querySelector('#fname');
const lname = document.querySelector('#lname');
const gender = document.querySelector('input[name="gender"]:checked');
const dob = document.querySelector('#dob');
const income = document.querySelector('#income');
const aadhar = document.querySelector('#aadhar');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!fname.value) {
    alert('Please enter your first name');
    return;
  }

  if (!lname.value) {
    alert('Please enter your last name');
    return;
  }

  if (!gender) {
    alert('Please select your gender');
    return;
  }

  if (!dob.value) {
    alert('Please enter your date of birth');
    return;
  }

  if (!income.value) {
    alert('Please enter your income');
    return;
  }

  if (!aadhar.value) {
    alert('Please enter your Aadhar card number');
    return;
  }

  if (!phone.value) {
    alert('Please enter your phone number');
    return;
  }

  if (!email.value) {
    alert('Please enter your email address');
    return;
  }

  if (!password.value) {
    alert('Please enter a password');
    return;
  }

  if (!confirmPassword.value) {
    alert('Please confirm your password');
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }

  // submit form if all fields are valid
  form.submit();
});
