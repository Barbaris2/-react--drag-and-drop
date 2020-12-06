import { useState } from 'react';
import './App.css';

function App() {
  const [cardList, setCardList] = useState([
    { id: 1, order: 1, text: 'CARD 1' },
    { id: 2, order: 2, text: 'CARD 2' },
    { id: 3, order: 3, text: 'CARD 3' },
    { id: 4, order: 4, text: 'CARD 4' },
  ]);

  const [currentCard, setCurrentCard] = useState(null);

  function dragStartHandler(e, card) {
    setCurrentCard(card);
  }

  function dragEndHandler(e) {
    e.target.style.background = 'white';
  }

  function dragOverHandler(e) {
    e.preventDefault();
    e.target.style.background = 'lightgray';
  }

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  function dropHandler(e, card) {
    e.preventDefault();
    setCardList(
      cardList.map(c => {
        if (c.id === card.id) {
          return { ...c, order: currentCard.order };
        }
        if (c.id === currentCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
    const newList = cardList.map(c => {
      if (c.id === card.id) {
        return { ...c, order: currentCard.order };
      }
      if (c.id === currentCard.id) {
        return { ...c, order: card.order };
      }
      return c;
    });

    e.target.style.background = 'white';
  }

  return (
    <div className='App'>
      {cardList.sort(sortCards).map(card => (
        <div
          key={card.id}
          onDragStart={e => dragStartHandler(e, card)}
          onDragLeave={e => dragEndHandler(e)}
          onDragEnd={e => dragEndHandler(e)}
          onDragOver={e => dragOverHandler(e)}
          onDrop={e => dropHandler(e, card)}
          className='card'
          draggable={true}
        >
          {card.text}
        </div>
      ))}
    </div>
  );
}

export default App;
