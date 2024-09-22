let inputofPassword = document.querySelector("#password");
let inputOfEmail = document.querySelector("#email");
let note = document.querySelector(".notify");
let loginBtn = document.querySelector("#login");

const specialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const upperCase = /[A-Z]/;
const lowercase = /[a-z]/;
const number = /[0-9]/;

inputofPassword.addEventListener("input", () => {
  let value = inputofPassword.value;

  let U = upperCase.test(value);
  let F = specialCharacter.test(value);
  let L = lowercase.test(value);
  let N = number.test(value);

  if (L || N || (L && N) || (U && L) || (L && A)) {
    note.innerHTML = "Weak password";
    if ((N && L && U) || (U && F && L) || (N && F && L)) {
      note.innerHTML = "Medium strength password";
      if (F || (N && F && U && L) || (N && F && U)) {
        note.innerHTML = "Strong password";
      }
    }
  }
});

loginBtn.addEventListener("click", () => {
  let emailValue = inputOfEmail.value;
  let value = inputofPassword.value;
  if (value.length !== 9) {
    note.innerHTML = "Password must be exactly 9 characters long";
    note.style.color = "red";
    deleteNoteAfterDelay();
  }
  if (!emailValue.includes("@")) {
    note.innerHTML = "Invalid email address";
    note.style.color = "green";
    deleteNoteAfterDelay();
  }
});

function deleteNoteAfterDelay() {
  setTimeout(() => {
    note.innerHTML = "";
  }, 1500);
}
