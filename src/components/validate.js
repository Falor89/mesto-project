export { enableValidation }

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('form__field-error_border');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__field-error_active');
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('form__field-error_border')
    errorElement.textContent = '';
    errorElement.classList.remove('form__field-error_active')
}

function checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы")
    }
    else {
        inputElement.setCustomValidity('')
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    else {
        hideInputError(formElement, inputElement)
    }
}

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.form__field'));
    const buttonElement = formElement.querySelector('.form__button-submit');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement);
            checkInputValidity(formElement, inputElement);
        })
    })
}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement)
    })
}

enableValidation();

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('form__button-submit_inactive')
    }
    else {
        buttonElement.classList.remove('form__button-submit_inactive')
    }
}