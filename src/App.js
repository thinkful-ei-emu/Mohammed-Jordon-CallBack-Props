import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
      key === keyToOmit ? newObj : { ...newObj, [key]: value },
    {}
  );
}

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };

  state = {
    store: STORE,
  }


  handleDeleteCard = (cardId) => {
    const cardToDelete = omit(this.state.store.allCards, cardId);

    const newList = this.lists.map(list => {
      list.cardIds.filter(id => id === cardId)
    });



    console.log('handle delete card called', { cardId });

  }

  handleRandomCard(listId) {
    console.log('handle random card called');
    const newCard = newRandomCard();



  }




  render() {
    const { store } = this.props
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              cardId={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onDeleteCard={this.handleDeleteCard}
              onRandomCard={this.handleRandomCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
