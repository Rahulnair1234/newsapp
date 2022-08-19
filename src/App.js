
import './App.css';

import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
   
      <div>
           
       
       <Router>
       <NavBar/>
       <Routes>
      
          <Route path="/newsapp"element={ <News category="general"country="in"/> }></Route>     
          <Route path="/"element={ <News category="general"country="in"/>}></Route>   
          <Route path="/business"element={<News category="business"country="in"key="business"/>}></Route>     
          <Route path="/entertainment"element={<News category="entertainment"country="in"key="entertainment"/> }></Route>     
          <Route path="/health"element={<News category="health"country="in"key="health"/>}></Route>     
          <Route path="/science"element={<News category="science"country="in"key="science"/> }></Route>    
          <Route path="/sports"element={ <News category="sports"country="in"key="sports"/>}></Route>     
          <Route path="/technology"element={  <News category="technology"country="in"key="technology"/> }></Route>      
        </Routes>
        
       </Router>
       
       
      </div>
    )
  }
}


