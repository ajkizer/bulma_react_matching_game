import './App.css';
import React, { useState, useEffect } from 'react';
import Card from './components/Card'

function App() {

  const cards = [
    {
      match_id: "astronaut",
      icon: <i className="far fa-user-astronaut"></i>,
    },
    {
      match_id: "umbrella",
      icon: <i className="fas fa-umbrella-beach"></i>
    },
    {
      match_id: "phone",
      icon: <i className="fal fa-phone-office"></i>
    },
    {
      match_id: "rabbit",
      icon: <i className="fal fa-rabbit-fast"></i>
    },
    {
      match_id: "dragon",
      icon: <i className="fas fa-dragon"></i>
    },
    {
      match_id: "monkey",
      icon: <i className="fas fa-monkey"></i>
    }
  ]

  const shuffle = (cards) => {
    //returns a shuffled deck containing 2 of each card

    const doubleDeck = cards.concat(cards);

    const loadedDeck = doubleDeck.map((card, index) => card = { ...card, id: index })

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
  const [flipped, setFlipped] = useState([]) //contains card.id
  const [matched, setMatched] = useState([]) //contains card.match_id
  const [gameOverStatus, toggleGameOver] = useState(false);


  const gameOver = () => {
    toggleGameOver(true)
  }

  const play = () => {
    setFlipped([]);
    setMatched([])
    setDeck(shuffle(cards));
    toggleGameOver(false)
  }



  const clickHandler = (card) => {
    if (flipped.length === 2) return;
    if (matched.includes(card.match_id)) return;
    if (flipped.map(item => item.id).includes(card.id)) return

    setFlipped([...flipped, card]);
  }

  const checkIfMatched = (card1, card2) => {
    if (card1.match_id === card2.match_id) {
      setMatched([...matched, card1.match_id])
    }
  }


  useEffect(() => {
    if (matched.length === cards.length) {
      gameOver();
    }
    if (flipped.length === 2) {
      checkIfMatched(flipped[0], flipped[1]);


      setTimeout(() => {
        setFlipped([])
      }, 500)
    }
  }, [flipped])


  return (





    <div className="App container">


      <div className="columns">
        <div className="column">
          <h1 className="is-size-1">Matching Game</h1>


          <h2 className="is-size-3">{matched.length === cards.length ? "All" : matched.length} matches found</h2>

          <h3 className={`is-size-4 ${!gameOverStatus && "is-invisible"}`}>NICE WORK!</h3>
          <button onClick={play} className={`button is-primary is-small ${!gameOverStatus && "is-invisible"}`}>Play Again</button>
        </div>
      </div>
      <div className=" columns is-centered is-multiline is-mobile">
        {deck.map((card, index) =>
          <Card clickHandler={clickHandler} matched={matched} flipped={flipped} card={card} key={`${card.id}-idx-${index}`} />
        )}

      </div>
    </div>

  );
}

export default App;
