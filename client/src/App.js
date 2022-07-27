import React from 'react';
import {BrowserRouter, Route } from 'react-router-dom'  
import './App.css';
import LandingPage from './components/landingPage/LandingPage.jsx';
import Home from './components/home/Home.jsx';
import CardDetail from './components/cardDetail/CardDetail.jsx';
import Activity from './components/activity/Activity.jsx';
import CreateActivity from './components/createActivity/CreateActivity.jsx';



function App() {
  return (
  <BrowserRouter>
   <div className='App'>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path='/home/:id' component={CardDetail}/>
        <Route exact path="/activity" component={Activity}/> 
        <Route exact path="/createactivity" component={CreateActivity}/>
   </div>
   </BrowserRouter>
    
 );
}
export default App;