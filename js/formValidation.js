let inputName = document.querySelector("#cat-name");
let inputWeigth = document.querySelector("#cat-weight");
let inputEmail = document.querySelector("#owner-email");
let inputTel = document.querySelector("#owner-tel");
let form = document.querySelector(".form");

let inputArray = [inputName, inputWeigth, inputEmail, inputTel];

form.addEventListener('submit', function(e) {
  let isFirstErrorInput = false;
  inputArray.forEach(function(i) {
    if (!i.value) {
      e.preventDefault();
      i.classList.add("input--error");
      if (!isFirstErrorInput) {
        i.scrollIntoView({block: "center", behavior: 'smooth'});
        isFirstErrorInput = true;
      }
    }
  });
});

inputName.onchange = isNull;
inputWeigth.onchange = isNull;
inputEmail.onchange = isNull;
inputTel.onchange = isNull;

function isNull() {
  if (this.value) {
    this.classList.remove("input--error");
  }
}
