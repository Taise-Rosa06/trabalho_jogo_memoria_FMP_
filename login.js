const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login-form');

const validateForm = ({target}) => {
    if (form.elements.abacaxi.value && input.value.length >= 3) {
        button.removeAttribute('disabled');
        return;
    }

    button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);
    localStorage.setItem('dificulty', form.elements.abacaxi.value);
    window.location = '../pages/game.html';
}

input.addEventListener('input', validateForm);
form.addEventListener('submit', handleSubmit);
form.addEventListener('change', validateForm);