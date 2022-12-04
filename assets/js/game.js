/** 
 * * Crear baraja de cartas
 */

let deck        = [];
const types     = ['C', 'D', 'H', 'S'];
const specials  = ['A', 'J', 'Q', 'K'];

let playerPoints = 0;
let computerPoints = 0; 

// * Referencias del HTML
let btnTakeCard = document.querySelector('#btn-take-card');
let btnStopGame = document.querySelector('#btn-stop-game');
let HTMLPoints = document.querySelectorAll('small');
let playerCard = document.querySelector('#player-card');
let computerCard = document.querySelector('#computer-card');
let alert = document.querySelector('.alert');

// * Crear deck
const createDeck = () => {

    for( let i = 2; i <= 10; i++) {
        
        for( let type of types ){
            
            deck.push( i + type);
            
        }

    }

    for ( let type of types ) {
        
        for( let special of specials) {

            deck.push( special + type );

        }

    }

    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

createDeck();

// * Pedir carta
const takeCard = () => {

    if( deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }

    const card = deck.pop();
    
    return card;

}

// * Valor de cada carta
const cardValue = ( card ) => {
    
    const value = card.substring(0, card.length - 1);
    
    return ( isNaN( value ) ) ? 
            ( value === 'A' ) ? 11 : 10
            : value * 1;

}

// * Turno de la computador
const computerShift = ( minPoints ) => {

    do {
        
        const card = takeCard();
    
        computerPoints += cardValue( card );
    
        HTMLPoints[1].innerText = computerPoints;
    
        const cardImg = document.createElement('img');
        cardImg.src = `assets/cartas/${ card }.png`;
        cardImg.classList.add('img-card');
    
        computerCard.append(cardImg);

        if( minPoints > 21 ) break;

    } while( (computerPoints < minPoints ) && (minPoints <= 21));

    setTimeout( () => {

        if( computerPoints === minPoints){
            alert.classList.add('mt-4');
            alert.classList.add('alert-warning');
            alert.innerText = 'Nadie gana :(';
        }

        if( computerPoints === 21){
            alert.classList.add('mt-4');
            alert.classList.add('alert-danger');
            alert.innerText = 'Lo siento mucho, la computadora gana';
        }

        if( minPoints === 21){
            alert.classList.add('mt-4');
            alert.classList.add('alert-success');
            alert.innerText = '¡Ganaste!';
        }

        if( minPoints > 21){
            alert.classList.add('mt-4');
            alert.classList.add('alert-danger');
            alert.innerText = 'Lo siento mucho, la computadora gana';
        }

        if( computerPoints < 21 && computerPoints > minPoints) {
            alert.classList.add('mt-4');
            alert.classList.add('alert-danger');
            alert.innerText = 'Lo siento mucho, la computadora gana';
        }

        if( computerPoints > 21 && minPoints < 21){
            alert.classList.add('mt-4');
            alert.classList.add('alert-success');
            alert.innerText = '¡Ganaste!';
        }

        if( minPoints < 21 && minPoints > computerPoints) {
            alert.classList.add('mt-4');
            alert.classList.add('alert-success');
            alert.innerText = '¡Ganaste!';
        }

    }, '500')


}

// * Eventos
btnTakeCard.addEventListener('click', () => {
    const card = takeCard();
    
    playerPoints += cardValue( card );

    HTMLPoints[0].innerText = playerPoints;

    const cardImg = document.createElement('img');
    cardImg.src = `assets/cartas/${ card }.png`;
    cardImg.classList.add('img-card');

    playerCard.append(cardImg);

    if( playerPoints >= 21 ){

        btnTakeCard.disabled = true;
        btnStopGame.disabled = true;

        computerShift( playerPoints );

    }

})

btnStopGame.addEventListener('click', () => {
    btnTakeCard.disabled = true;
    btnStopGame.disabled = true;
    
    computerShift( playerPoints );

})