import './App.css';
import React from 'react';

class DivInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
    };
  }

  render() {
    return (
      <div>
            <label>Enter something: </label>
            <textarea type="text" name="username" onChange={ (e) => this.setState({userInput: e.target.value}) } value={this.state.userInput} />
            <p>Input: {this.state.userInput}</p>
    </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DivInput/>
      </header>
    </div>
  );
}

export default App;
