import './App.css';
import React, { useState, useEffect } from 'react';
import Card from './components/Card'

function App() {

  const cards = [
    {
      match_id: 1,
      icon: <i className="far fa-user-astronaut"></i>,
    },
    {
      match_id: 2,
      icon: <i className="fas fa-umbrella-beach"></i>
    },
    {
      match_id: 3,
      icon: <i className="fal fa-phone-office"></i>
    },
    {
      match_id: 4,
      icon: <i className="fal fa-rabbit-fast"></i>
    },
    {
      match_id: 5,
      icon: <i className="fas fa-dragon"></i>
    },
    {
      match_id: 6,
      icon: <i className="fas fa-monkey"></i>
    }
  ]

  const shuffle = (cards) => {
    //returns a shuffled deck containing 2 of each card

    const doubleDeck = cards.concat(cards);

    const loadedDeck = doubleDeck.map((card, index) => card = { ...card, id: index, matched: false, selected: false })

    let currentIndex = loadedDeck.length;

    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [loadedDeck[currentIndex], loadedDeck[randomIndex]] = [
        loadedDeck[randomIndex], loadedDeck[currentIndex]];
    }

    return loadedDeck
  }

  const [deck, setDeck] = useState(shuffle(cards))
  const [selection, setSelection] = useState([]);
  const [matched, setMatched] = useState([]);




  const hideCards = () => {
    setSelection([]);

  }

  const checkIfMatch = (card1, card2) => {
    if (card1 === card2) {
      setMatched([...matched, card1, card2])
      console.log("matched!")
    }

    setTimeout(() => {
      hideCards();
    }, 500)

  }

  const clickHandler = (card) => {
    setSelection([...selection, card.id])
    if (selection.length > 1) {
      checkIfMatch(selection[0], card.match_id)
    } else {
      setSelection(card.match_id)
    }
  }


  return (
    <div>
      <div className="columns is-centered">
        <h1 className="is-size-1">Matching Game</h1>
      </div>


      <div className="App columns is-centered is-multiline">

        {deck.map((card, index) =>
          <Card clickHandler={clickHandler} matched={matched} selection={selection} card={card} key={`${card.id}-idx-${index}`} />
        )}


      </div>
    </div>
  );
}

export default App;
