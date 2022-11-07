/**
 * Crear baraja de cartas
 */

let deck        = [];
const types     = ['C', 'D', 'H', 'S'];
const specials  = ['A', 'J', 'Q', 'K'];

// Crear deck
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

// Pedir carta
const takeCard = () => {

    if( deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }

    const card = deck.pop();
    console.log(card);
    console.log(deck);

}

takeCard();