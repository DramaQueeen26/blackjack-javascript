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

// * Eventos
btnTakeCard.addEventListener('click', () => {
    const card = takeCard();
    
    playerPoints += cardValue( card );

    HTMLPoints[0].innerText = playerPoints;

    const cardImg = document.createElement('img');
    cardImg.src = `assets/cartas/${ card }.png`;
    cardImg.classList.add('img-card');

    playerCard.append(cardImg);

    if( playerPoints > 21 ){
        
        alert.classList.add('mt-4');
        alert.classList.add('alert-danger');
        alert.innerText = 'Lo siento mucho, perdiste';

        btnTakeCard.disabled = true;

    }else if ( playerPoints == 21 ){

        alert.classList.add('mt-4');
        alert.classList.add('alert-success');
        alert.innerText = '¡Ganaste!';

        btnTakeCard.disabled = true;

    }

})