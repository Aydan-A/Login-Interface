let inputs = document.querySelectorAll("input");
const passwordInput = document.querySelector("#password");
let noteEmail = document.querySelector(".notify-email");
let notePassword = document.querySelector(".notify-password");
let loginBtn = document.querySelector("#login");
const togglePassword = document.querySelector("#toggle-password");

// Regex Patterns
const specialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const upperCase = /[A-Z]/;
const lowercase = /[a-z]/;
const number = /[0-9]/;
const emailCheck = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const updateNote = (noteElement, message, color) => {
  noteElement.innerHTML = message;
  noteElement.style.color = color;
};

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.name === "password") {
      let value = input.value;

      // Character type checks
      let hasUpperCase = upperCase.test(value);
      let hasSpecialChar = specialCharacter.test(value);
      let hasLowerCase = lowercase.test(value);
      let hasNumber = number.test(value);

      // Count the number of satisfied character types
      let fourCheck =
        (hasLowerCase ? 1 : 0) +
        (hasUpperCase ? 1 : 0) +
        (hasNumber ? 1 : 0) +
        (hasSpecialChar ? 1 : 0);

      if (value.length <= 9) {
        updateNote(
          notePassword,
          "Password must be exactly 9 characters long",
          "red"
        );
      } else {
        if (fourCheck <= 2) {
          updateNote(notePassword, "Weak password", "red");
        } else if (fourCheck <= 3) {
          updateNote(notePassword, "Medium strength password", "orange");
        } else if (fourCheck === 4) {
          updateNote(notePassword, "Strong password", "green");
        }
        if (value.length === 0) {
          updateNote(notePassword, "", "");
          return;
        }
      }
    } else if (input.name === "email") {
      let emailValue = input.value;
      if (!emailCheck.test(emailValue)) {
        updateNote(noteEmail, "Invalid email address", "red");
        return;
      } else {
        updateNote(noteEmail, "Valid email adress", "green");
      }
    }
  });
});

togglePassword.addEventListener("click", ()=>{
  const isPasswordShown=passwordInput.getAttribute("type")==="password";
  
  passwordInput.setAttribute("type", isPasswordShown ? "text"  : "password")
  togglePassword.textContent=isPasswordShown ? "🙈" : "👁️"
})

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
});
