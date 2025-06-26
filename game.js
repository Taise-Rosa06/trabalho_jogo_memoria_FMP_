const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const dificulty = localStorage.getItem('dificulty')

const charactersEasy = [
    'cosmo2',
    'wanda2',
    'chloe1',
    'denzel',
    'poof',
    'timmyturner',
];

const charactersMedium = [
    'cosmo2',
    'wanda2',
    'chloe1',
    'denzel',
    'poof',
    'timmyturner',
    'chester',
    'crimson_chin',
    'jorgen',
    'sparky',
    'tootie',
    'trixie',
];

const charactersHard = [
    'cosmo2',
    'wanda2',
    'chloe1',
    'denzel',
    'poof',
    'timmyturner',
    'chester',
    'crimson_chin',
    'jorgen',
    'sparky',
    'tootie',
    'trixie',
    'veronica_star',
    'vicky',
    'dark_laser',
    'mark_chang',
    'foop',
    'flappy_bob',
];

let numberCardsEasy = 12;
let numberCardsMedium = 24;
let numberCardsHard = 36;
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const adjustCardSize = () => {
    const allCards = document.querySelectorAll('.card')
    let cardWidth;

    if (dificulty === 'easy') {
        cardWidth = '140px';
    } else if (dificulty === 'medium') {
        cardWidth = '110px'
    } else if (dificulty === 'hard') {
        cardWidth = '94px'
    }
    allCards.forEach(card => {
        card.style.width = cardWidth;
    });
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    let totalCards = 0;
    if (dificulty == 'easy') totalCards = numberCardsEasy;
    else if (dificulty == 'medium') totalCards = numberCardsMedium;
    else if (dificulty == 'hard') totalCards = numberCardsHard;

    if (disabledCards.length === totalCards) {
        stopTimer();
        const playAgain = confirm(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de ${timer.innerHTML} segundos!\nDeseja jogar novamente?`);
        if (playAgain) {
            const allCards = document.querySelectorAll('.card');
            for (const card of allCards) {
                card.classList.remove('reveal-card');   
                card.firstChild.classList.remove('disabled-card'); // também remove o filtro cinza
            } 
            timer.innerHTML = 0;
            startTimer();
            grid.innerHTML = '';
            loadGame();

        } else {
            window.location = '../index.html';
        }
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        const delayedCheckEndGame = () => {
            checkEndGame();
        }
        setTimeout(delayedCheckEndGame, 1000);

    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }
}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.jpeg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}

const loadGame = () => {
    grid.innerHTML = '';
    grid.className = 'grid';
    let characters;
    let numberCards;

    if (dificulty == 'easy') {
        grid.classList.add('grid-easy');
        characters = charactersEasy;
        numberCards = numberCardsEasy;
    } else if (dificulty == 'medium') {
        grid.classList.add('grid-medium');
        characters = charactersMedium;
        numberCards = numberCardsMedium;
    } else if (dificulty == 'hard') {
        grid.classList.add('grid-hard');
        characters = charactersHard;
        numberCards = numberCardsHard;
    } else {
        characters = charactersEasy;
        numberCards = numberCardsEasy;
    }
    // ler dificuldade do localStorage 
    // if para pegar a quantidade de characters correta
    // atribuir para a variavel a quantidade de cartas
    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    const limitedArray = shuffledArray.slice(0, numberCards);
    limitedArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
    adjustCardSize();
}

let timerInterval;

const startTimer = () => {
    timerInterval = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}
const stopTimer = () => {
    clearInterval(timerInterval);
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}