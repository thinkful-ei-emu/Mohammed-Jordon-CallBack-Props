import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';



class App extends Component {
  // constructor(props){
  //   super(props);
  //   this.handleRandomCard = this.handleRandomCard.bind(this);
  // }
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };

  state = {
    store: STORE,
  }

  handleDeleteCard = (cardId, listId) => {
    function omit(obj, keyToOmit) {
      return Object.entries(obj).reduce(
        (newObj, [key, value]) =>
          key === keyToOmit ? newObj : { ...newObj, [key]: value },
        {}
      );
    }

    const lists = this.state.store.lists;
    let allCards = { ...this.state.store.allCards };

    const newLists = lists.map(list => {
      list.cardIds = list.cardIds.filter(id => { return id !== cardId })
      return list;
    });

    const cardsNotRemoved = omit(allCards, cardId);

    this.setState(
      {
        store: {
          lists: newLists,
          allCards: cardsNotRemoved,
        }
      }
    )

  }

  handleRandomCard = (listId) =>{    
    //const lists = this.state.store.lists;   

    const newRandomCard = () => {
      const id = Math.random().toString(36).substring(2, 4)
        + Math.random().toString(36).substring(2, 4);
      return {
        id,
        title: `Random Card ${id}`,
        content: 'lorem ipsum',
      }
    }

    const newCard = newRandomCard();
    const newList = this.state.store.lists.map(list => {
      if(list.id === listId){
        return{
          id:list.id,
          header: list.header,
          cardIds:[...list.cardIds, newCard.id]
        }        
      }
      return list;
    })
    // console.log(listId);
    // console.log(newList);
    const newAllCards = {
      ...this.state.store.allCards,      
    }
    newAllCards[newCard.id]= newCard
    this.setState(
      {
        store:{
          lists:newList,
          allCards: newAllCards
        }
      },()=>console.log(this.state))    
  }




  render() {
    const  store = this.state.store;
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              listId={list.id}
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
