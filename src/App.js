import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from './components/home';
import Login from './components/login';

function App() {

  const [logstate,setLogstate] = React.useState(false);
  return (
    <div className="App">
      {logstate?<Home chstate={logstate => setLogstate(logstate)}/>:<Login changeState={logstate => setLogstate(logstate)}/>}
    </div>
  );
}

export default App;
