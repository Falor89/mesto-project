export function renderLoading(isLoading, popup, text) {
    const buttonSubmit = popup.querySelector('.form__button-submit')
    if (isLoading) {
        buttonSubmit.textContent = text;
        buttonSubmit.disabled = true;
    }
    else {
        buttonSubmit.textContent = 'Сохранить'
        buttonSubmit.disabled = false;
    }
}
