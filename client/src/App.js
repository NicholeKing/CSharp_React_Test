import logo from './logo.svg';
import './App.css';
import GetItems from './components/GetItems';
import MakeItem from './components/MakeItem';
import { useState } from 'react';

function App() {
  const [update, setUpdate] = new useState(false);
  const triggerUpdate = () => {
    setUpdate(!update);
  }
  return (
    <div className="App">
      <GetItems triggerUpdate={triggerUpdate} update={update}/>
      <MakeItem triggerUpdate={triggerUpdate} update={update}/>
    </div>
  );
}

export default App;
