export { enableValidation }

function showInputError(inputElement, settings, errorMessage) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
}

function hideInputError(inputElement, settings) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(settings.inputErrorClass)
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass)
}

function checkInputValidity(inputElement, settings) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    }
    else {
        inputElement.setCustomValidity('')
    }
    if (!inputElement.validity.valid) {
        showInputError(inputElement, settings, inputElement.validationMessage);
    }
    else {
        hideInputError(inputElement, settings)
    }
}

function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    formElement.addEventListener('reset', () => {
        setTimeout(() => {
            toggleButtonState(inputList, buttonElement, settings);
        }, 0)
    })

    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement, settings);
            checkInputValidity(inputElement, settings);
        })
    })
}

function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, settings)
    })
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(settings.inactiveButtonClass);
    }
    else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
}