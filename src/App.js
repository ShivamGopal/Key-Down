import React, {useState,useEffect} from 'react';
import './App.css';
import Account from './Account';
import Home from './Home';
import About from './About';
import MyStats from './MyStats';
import GlobalStats from './GlobalStats';
import SearchUser from './SearchUser';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './Layout Components/Header';
import LeftMargin from './Layout Components/LeftMargin';
import NavBar from './Layout Components/NavBar';
import Footer from './Layout Components/Footer';
import axios from 'axios';

function App() {
  const [darkMode,setDarkMode]=useState(false);
  const [testFontSize,setTestFontSize]=useState(0);
  const [globalLoggedIn,setGlobalLoggedIn]=useState(false);

  async function updateStats(time,error,length,charCount,charTime){
    if(!window.localStorage.getItem('auth-token')){
      return;
    }
    const body={
      'testLength':length,
      'time':time,
      'error':error,
      'charCount':charCount,
      'charTime':charTime
    };
    try{
      await axios({
        method:'put',
        url:'https://key-down.herokuapp.com/api/user/updatestats',
        data:body,
        headers: {
          'auth-token':window.localStorage.getItem('auth-token')
        }
      });
    }catch(err){
      console.log(err.response);
    }
  }

  useEffect(()=>{
    const token=window.localStorage.getItem('auth-token');
    if(token){
      setGlobalLoggedIn(true);
    }
    else{
      setGlobalLoggedIn(false);
    }
    const dm=window.localStorage.getItem('dm');
    if(dm==='true'){
      setDarkMode(true);
    }
    else{
      setDarkMode(false);
    }
    const fs=window.localStorage.getItem('fs');
    if(fs==='1'){
      setTestFontSize(1);
    }
    else if(fs==='2'){
      setTestFontSize(2);
    }
    else{
      setTestFontSize(0);
    }
  },[]);

  return (
    <Router>
      <div className={`App ${darkMode?'theme-dark':'theme'}`} >
        <Header darkMode={darkMode}/>
        <div className="columns">
          <LeftMargin darkMode={darkMode}/>
          <div className='center' style={darkMode?{borderRight:'1px solid #333'}:{}}>
            <Switch>
              <Route path="/Key-Down/account">
                <Account darkMode={darkMode} globalLoggedIn={globalLoggedIn} setGlobalLoggedIn={setGlobalLoggedIn} />
              </Route>
              <Route path="/Key-Down/my-stats">
                <MyStats darkMode={darkMode} />
              </Route>
              <Route path="/Key-Down/global-stats">
                <GlobalStats darkMode={darkMode} />
              </Route>
              <Route path="/Key-Down/search">
                <SearchUser darkMode={darkMode} />
              </Route>
              <Route path="/Key-Down/about">
                <About darkMode={darkMode} />
              </Route>
              <Route path="/">
                <Home darkMode={darkMode} testFontSize={testFontSize} setTestFontSize={setTestFontSize} updateStats={updateStats} />
              </Route>
            </Switch>
          </div>
          <NavBar darkMode={darkMode} setDarkMode={setDarkMode} globalLoggedIn={globalLoggedIn} />
        </div>
        <Footer darkMode={darkMode}/>
      </div>
    </Router>
  );
}

export default App;
