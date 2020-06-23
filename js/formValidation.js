let inputName = document.querySelector("#cat-name");
let inputWeigth = document.querySelector("#cat-weight");
let inputEmail = document.querySelector("#owner-email");
let inputTel = document.querySelector("#owner-tel");
let form = document.querySelector(".form");

$(".owner__input--tel").mask("9 (999) 999-99-99");

let inputArray = [inputName, inputWeigth, inputEmail, inputTel];

form.addEventListener('submit', function(e) {
  let isFirstErrorInput = false;
  inputArray.forEach(function(item) {
    if (!item.value) {
      e.preventDefault();
      item.classList.add("input--error");
      if (!isFirstErrorInput) {
        item.scrollIntoView({
          block: "center",
          behavior: 'smooth'
        });
        isFirstErrorInput = true;
      }
    }
  });
});

inputName.addEventListener('change', isNull);
inputWeigth.addEventListener('change', isNull);
inputEmail.addEventListener('change', isNull);
inputTel.addEventListener('change', isNull);

function isNull() {
  if (this.value) {
    this.classList.remove("input--error");
  }
}
