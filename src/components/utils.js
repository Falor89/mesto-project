export function renderLoading(isLoading, popup) {
    const buttonSubmit = popup.querySelector('.form__button-submit')
    if (isLoading) {
        buttonSubmit.textContent = 'Сохранение...';
        buttonSubmit.disabled = true;
    }
    else {
        buttonSubmit.textContent = 'Сохранить';
        buttonSubmit.disabled = false;
    }
}