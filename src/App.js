import React, { Component } from 'react';
import danhead from './dan-head.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: readTextFile('/dan-list.txt'),
      currentLine: '',
      index: 0
    }
  }

  componentWillMount() {
    this.setState({ 
      lines: shuffle(this.state.lines)
    }); 
    this.setCurrentLine();
    window.addEventListener("click", this.forward); // go to next line on click
    window.addEventListener("keydown", this.handleKeyPress); // handle keypresses
    window.addEventListener("touchstart", this.touchForward);
    window.addEventListener("touchmove", this.preventDefault);
    window.addEventListener("touchend", this.preventDefault);
  }
  
  setCurrentLine = () => {
    this.setState({ currentLine: this.state.lines[this.state.index]} );
  }

  increaseIndex = () => {
    this.setState((prevState) => {
      return {index: (prevState.index + 1) % this.state.lines.length};
    });
  }

  decreaseIndex = () => {
    this.setState((prevState) => {
      var i = prevState.index - 1;
      if (i === -1) { i = this.state.lines.length - 1; }
      return {index: i};
    });
  }

  forward = () => {
    this.increaseIndex();
    this.setCurrentLine();
  }

  backward = () => {
    this.decreaseIndex();
    this.setCurrentLine();
  }

  touchForward = (event) => {
    event.preventDefault();
    this.forward();
  }

  preventDefault = (event) => {
    event.preventDefault();
  }

  handleKeyPress = (event) => {
    if (event.key === " " || event.key === "ArrowRight") {
      this.forward();
    } else if (event.key === "ArrowLeft") {
      this.backward();
    }
  }

  render() {
    return (
      <div className="App">
        <div className="content">
          <div className="text">
            <p> 
              Udtaler Dan Jørgensen, mens han ligner {this.state.currentLine}
            </p>
            <p className="help-text">
              (Klik hvor som helst for en ny sammenligning)
            </p>
          </div>
          <div className="image">
            <img src={danhead} alt="Dan Jørgensen" />
          </div>          
        </div>
      </div>
    );
  }
}

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  var entries = null;
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        entries = rawFile.responseText.split("\n");
      }
    }
  }
  rawFile.send(null);
  return entries;
}

function shuffle(array) {
  var m = array.length, t, i;
  while (m > 0) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

export default App;
