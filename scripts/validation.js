// enabling validation by calling enableValidation()
// pass all the settings on call
function showInputError(formEl, inputEl, options) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(errorMessageEl);
  inputEl.classList.add(options.inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(options.errorClass);
}
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(errorMessageEl);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;
  inputEls.forEach((input) => {
    if (!input.validity.valid) foundInvalid = true;
  });
  console.log(foundInvalid);
  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  console.log(formEl);
  const submitButton = formEl.querySelector(".modal__submit-button");
  console.log(submitButton);
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
  console.log(inputEls);
  toggleButtonState(inputEls, submitButton, options);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}
function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
    // look for all inputs inside of form
    //loop through all the inputs to see if all are valid
    // if input is not valid
    // grab validation message
    // add error class to input
    // display error message
    // disable button
    // if all inputs valid
    //  enable button
    // reset error message
  });
}

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
enableValidation(options);
