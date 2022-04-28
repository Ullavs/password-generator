const button = document.querySelector(".generate-button");
const passwords = document.querySelectorAll(".password");
const lengthPassword = document.getElementById("length");
const displayLength = document.getElementById("display");

const characterSet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+=-".split(
    ""
  );

function generatePassword(length) {
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    password += characterSet[randomIndex];
  }
  return password;
}

button.addEventListener("click", () => {
  const length = lengthPassword.value;

  [...passwords].forEach((password) => {
    password.textContent = generatePassword(length);
    password.classList.add("active");
  });
});

lengthPassword.addEventListener("input", (event) => {
  displayLength.textContent = event.target.value;
});

function copyPassword(event) {
  if (!event.target.classList.contains("active")) {
    return false;
  }

  const password = event.target.textContent;
  navigator.clipboard.writeText(password);

  const copyDiv = document.createElement("div");
  copyDiv.classList.add("copy-div");
  copyDiv.textContent = "Copied!";
  event.target.append(copyDiv);
  setTimeout(() => {
    copyDiv.parentNode.removeChild(copyDiv);
  }, 500);
}

[...passwords].forEach((password) => {
  password.addEventListener("click", copyPassword);
});
