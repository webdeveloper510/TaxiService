import React from 'react';
import Header from './components/Header';
import './App.css';
import Home from './components/Home';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
    
     <Header/>
     <Home/>
     <Footer/>
      {/* Other content of your application */}
  
    </div>
  );
}

export default App;
