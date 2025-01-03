import { use } from "react";

const formLogin = document.querySelector("#form");
let inputs = document.querySelectorAll("input");
const passwordInput = document.querySelector("#password");
const emailInput = document.querySelector("#email");
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

const addError = (input, message, noteElement) => {
  input.style.borderColor = "red";
  updateNote(noteElement, message, "red");
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
        addError(
          input,
          "Password must be exactly 9 characters long",
          notePassword
        );
      } else {
        if (fourCheck <= 2) {
          addError(input, "Weak password", notePassword);
        } else if (fourCheck <= 3) {
          addError(input, "Medium strength password", notePassword);
        } else if (fourCheck === 4) {
          updateNote(notePassword, "Strong passwords", "green");
        }
        if (value.length === 0) {
          updateNote(notePassword, "", "");
          return;
        }
      }
    } else if (input.name === "email") {
      let emailValue = input.value;
      if (!emailCheck.test(emailValue)) {
        addError(input, "Invalid email address", noteEmail);
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


formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  let emailValue = emailInput.value;
  let passwordValue = passwordInput.value;

  try {
    // First, check if the user already exists
    const usersResponse = await fetch("/users");
    const users = await usersResponse.json();

    const existingUser = users.find(
      (user) => user.email === emailValue && user.password === passwordValue
    );

    if (existingUser) {
      alert("Login successful!");
    } else {
      const registerResponse = await fetch("/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });

      if (registerResponse.ok) {
        alert("User registered successfully!");
      } else {
        alert("Failed to register user.");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred.");
  }
});
