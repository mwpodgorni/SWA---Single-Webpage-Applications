import './App.css';
import React, {Component, useState} from 'react';


// class HelloMessage extends Component {
//     state = {
//     username: '',
//     showUsername: false

//   }

//   displayUsernameHandler = (e) => {
//     let updatedUsername = e.target.value;
//     this.setState({ username: updatedUsername });
//     //console.log(updatedName);  
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.setState({
//       showName: true
//     });
//   }

//   render() {
//     return (
//       <div>
//           {!this.state.username&& <form onSubmit={this.handleSubmit}>
//           <label>Enter username: </label>
        
//           <input type="text" name="username" onChange={this.displayUsernameHandler} value={this.state.username} />
//           <button type="submit" onClick={this.handleSubmit}>Submit</button>
          
//         </form>}
//         {this.state.username && <p>Hello {this.state.username}</p>}
//       </div>
//     );
//   }
// }
function App() {
  const [state, setState] = useState(false);
  const [username, setUsername] = useState("");
  const displayUsernameHandler=(e) =>{
    setUsername(e.target.value)
  }
  const handleSubmit=(e)=>{
    setState(e.target.value)
  }
  return (
    <div className="App">
      <header className="App-header">
      <div>
        {!state&& <form onSubmit={handleSubmit}>
          <label>Enter username: </label>
          <input type="text" name="username" onChange={displayUsernameHandler} value={username} />
          <button type="submit" onClick={() => setState(true)}>Submit</button>
        </form>}
        {state&& <p>Hello {username}</p>}
      </div>
    
      </header>
    </div>
  );
}

export default App;

