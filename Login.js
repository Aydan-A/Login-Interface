let inputOfPassword = document.querySelector("#password");
let inputOfEmail = document.querySelector("#email");
let note = document.querySelector(".notify");
let loginBtn = document.querySelector("#login");

const specialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const upperCase = /[A-Z]/;
const lowercase = /[a-z]/;
const number = /[0-9]/;

inputOfPassword.addEventListener("input", () => {
  let value = inputOfPassword.value;

  let hasUpperCase = upperCase.test(value);
  let hasSpecialChar = specialCharacter.test(value);
  let hasLowerCase = lowercase.test(value);
  let hasNumber = number.test(value);

  if (value.length === 0) {
    note.innerHTML = "";
    return;
  }

  // Weak password
  if (hasLowerCase || hasNumber) {
    note.innerHTML = "Weak password";
    note.style.color = "red";

    // Medium strength password
    if (hasLowerCase && hasNumber && hasUpperCase) {
      note.innerHTML = "Medium strength password";
      note.style.color = "orange";

      // Strong password
      if (hasLowerCase && hasNumber && hasUpperCase && hasSpecialChar) {
        note.innerHTML = "Strong password";
        note.style.color = "green";
      }
    }
  }
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  let emailValue = inputOfEmail.value;
  let passwordValue = inputOfPassword.value;

  // Email validation
  if (!emailValue.includes("@")) {
    note.innerHTML = "Invalid email address";
    note.style.color = "red";
    deleteNoteAfterDelay();
    return;
  }

  // Password validation
  if (passwordValue.length !== 9) {
    note.innerHTML = "Password must be exactly 9 characters long";
    note.style.color = "red";
    deleteNoteAfterDelay();
    return;
  }
});

function deleteNoteAfterDelay() {
  setTimeout(() => {
    note.innerHTML = "";
  }, 1500);
}
