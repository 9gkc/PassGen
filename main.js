const lengthInput = document.getElementById("length");
const generateBtn = document.getElementById("generate");
const passwordDiv = document.getElementById("password");

// Prevent Non-Numeric Characters and Enforce Character Limit
lengthInput.addEventListener("input", function () {
  let value = lengthInput.value;

  // Remove Non Digits Characters
  value = value.replace(/\D/g, "");

  // Force Range -> {1, 32}
  if (value !== "") value = Math.max(1, Math.min(32, parseInt(value)));

  lengthInput.value = value;
});

// Set A Default Value If The Field Is Empty
lengthInput.addEventListener("blur", function () {
  if (lengthInput.value === "") lengthInput.value = 10;
});

// Math.min(32, 1) 1
// Math.min(32, 15) 15
// Math.min(32, 159) 32

// Generate Password Function

function generatePassword(length, includeNumbers, includeSpecial) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+-=[]{}|;:',.<>?";

  let characterPool = lowercase + uppercase;
  if (includeNumbers) characterPool += numbers;
  if (includeSpecial) characterPool += special;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  return password;
}

// console.log(generatePassword(20, true, true));

// Click On Generate Button
generateBtn.addEventListener("click", function () {
  // Get Password Length
  let length = parseInt(lengthInput.value);

  // console.log(length);
  const includeNumbers = document.getElementById("include-numbers").checked;
  const includeSpecial = document.getElementById("include-special").checked;

  // console.log(includeNumbers);
  // console.log(includeSpecial);

  // Get Random Password From Generate Password Function
  const password = generatePassword(length, includeNumbers, includeSpecial);

  passwordDiv.textContent = password;

  // Save Password To Local Storage
  savePassword(password);
  displaySavedPasswords();
});

// Save The Passwords To Local Storage
function savePassword(password) {
  const savedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
  // console.log(savedPasswords);
  savedPasswords.unshift(password); // Add Password At The Start Of Array
  if (savedPasswords.length > 10) savedPasswords.pop(); // Remove The Last Element
  localStorage.setItem("passwords", JSON.stringify(savedPasswords));
}

// Display Saved Passwords
function displaySavedPasswords() {
  const savedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
  const listOfPasswords = savedPasswords.map((p, i) => `<div><span>${i + 1}</span> ${escapeHTML(p)}</div>`).join("");
  document.getElementById("saved-passwords").innerHTML = listOfPasswords || "Passwords Will Show Here";
}

// Escape HTML
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Display Passwords On Page Load
document.addEventListener("DOMContentLoaded", displaySavedPasswords);
