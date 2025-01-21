// enabling validation by calling enableValidation()
// pass all the settings on call

function setEventListeners(formEl, options) {
    const {inputSelector} = options;   
    const inputEls = [formEl.querySelectorAll(inputSelector)];
    console.log(inputEls);

}

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
        formEl.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formEl, options);
        // look for all inputs inside the form
        // loop through all the inputs to see if 
        // if the input is not valid, show the error
        // get validation message
        // add error class to input
        // display error message
        // disable button
        // if all inputs are valid, enable button
        // reset error messages
    });
}
  
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

enableValidation(config);