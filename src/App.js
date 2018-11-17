import React, { Component } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import cards from "./cards.json";
import "./App.css";

class App extends Component {

  state = {
    cards,
    score: 0,
    highScore: 0
  };

  clickCount = id => {
    this.state.cards.find((item, j) => {
      if (item.id === id) {
        if(cards[j].count === 0){
          cards[j].count = cards[j].count + 1;
          this.setState({score : this.state.score + 1}, 
            function() { console.log(this.state.score) });
          // Randomize cards after click
          this.state.cards.sort(() => Math.random() - 0.5)
          return true; 
        } else {
          this.endGame();
        }
      }
    });
  };

  endGame = () => {
    if (this.state.score > this.state.highScore) {
      this.setState({ highScore: this.state.score });
    };

    this.state.cards.forEach(card => { card.count = 0 });
    alert(`Sorry, you lost! \nScore: ${this.state.score}`);

    this.setState({score: 0});
    return true;
  };

  render() {
    return (
      <Wrapper>
        <Header score={this.state.score} highScore={this.state.highScore}>Clicky Game: SouthPark Edition!</Header>
        { this.state.cards.map(card => (
          <Card
            clickCount={this.clickCount}
            id={card.id}
            key={card.id}
            image={card.image}
          />
          )) 
        }
      </Wrapper>
    );
  }
};

export default App;