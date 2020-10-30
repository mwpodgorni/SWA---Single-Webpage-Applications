import {useState} from 'react'
import './App.css';

function App() {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setusername] = useState('');

  return (
    <div className="App">
      <header className="App-header">

        {!isSubmitted ?
          <form >
              <label>Enter username: </label>
              <input type="text" name="username" onChange={ (e) => setusername(e.target.value)} value={username} />
              <button type="submit" onClick={() => setIsSubmitted(true)}>Submit</button>
          </form>
        
        :
        <p> Hi , {username}! Welcome ! </p>
        
        
        }

      </header>
    </div>
  );
}

export default App;
