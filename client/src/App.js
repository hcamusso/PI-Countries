import React from 'react';
import {BrowserRouter, Route } from 'react-router-dom'  
import './App.css';
import LandingPage from './components/landingPage/LandingPage';
import Home from './components/home/Home.jsx';
import Activity from './components/activity/Activity';



function App() {
  return (
  <BrowserRouter>
   <div className='App'>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/> 
        <Route exact path="/activity" component={Activity}/> 
   </div>
   </BrowserRouter>
    
 );
}
export default App;