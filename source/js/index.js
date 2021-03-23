"Use strict";
const url = "https://60376bfd5435040017722533.mockapi.io/form";
const button = document.querySelector(".form__submit");
const validationMessages = [
  "ФИО не в правильном формате",
  "Телефон введен неверно",
  "Email введен неверно",
];

const onSubmitFormHandler = (evt) => {
  evt.preventDefault();

  const formData = new FormData(document.querySelector(".form"));
  const xhr = new XMLHttpRequest();
  const onLoadHandler = () => {
    if (xhr.status > 399) {
      alert("Сервер вернул ошибку");
    } else {
      alert("Данные успешно отправлены");
    }
  };

  xhr.addEventListener("load", onLoadHandler);
  xhr.open("POST", url);
  xhr.send();
};

const onInputChangeHandler = () => {
  if (
    [...document.querySelectorAll(".form__input")].every(
      (el) => el.validity.valid && el.value
    )
  )
    button.disabled = false;
};

document
  .querySelectorAll(".form__input")
  .forEach((el) => el.addEventListener("input", onInputChangeHandler));

document.querySelector(".form").addEventListener("submit", onSubmitFormHandler);
