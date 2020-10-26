import logo from './logo.svg';
import './App.css';
import React, {Component, useState} from 'react';


class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value: "Enter your text."
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    this.setState({value:event.target.value});
    event.preventDefault();
  }
  handleSubmit(event){
    alert("Text was submitted: "+this.state.value);
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
      <label>
        Text:
        <textarea class="ml-2" value={this.state.value} onChange={this.handleChange} />
      </label>
    <div><p>Input: {this.state.value}</p></div>
    </form>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Editor/>
      </header>
    </div>
  );
}

export default App;
