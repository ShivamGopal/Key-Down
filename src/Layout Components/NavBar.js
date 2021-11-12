import React, {useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {FaSun,FaMoon,FaKeyboard,FaInfoCircle,FaGlobe,FaSearch} from "react-icons/fa";
import {ImStatsDots} from "react-icons/im";
import {BsFillPersonFill} from 'react-icons/bs';
import axios from 'axios';

const NavBar = ({darkMode,setDarkMode,globalLoggedIn}) => {
  const [username,setUsername]=useState('');
  const [loading,setLoading]=useState(false);

  function isLoggedIn(){
    var token=window.localStorage.getItem('auth-token');
    if(token){
      setLoading(true);
      axios.get('https://key-down.herokuapp.com/api/user/username',{
        headers: {
          'auth-token':window.localStorage.getItem('auth-token')
        }
      }).then(res=>res.data).then(ans=>{
        setLoading(false);
        setUsername(ans.loginDetails.username);
      }).catch(()=>{
        setUsername('');
      })
    }
  }
  useEffect(()=>{
    isLoggedIn();
  },[globalLoggedIn]);
  
  function changeDarkState(){
    window.localStorage.setItem('dm',!darkMode);
    setDarkMode(!darkMode);
  }
  
  return (
    <div className="right">
      <NavLink activeClassName={`${darkMode?'nav-link-active-dark':'nav-link-active'}`} className={`${darkMode?'nav-link-dark':'nav-link'}`} to='/Key-Down/account'>
        <div className={`sign-in-circle ${globalLoggedIn?'sign-in-circle-border':''}`}>
          {
            globalLoggedIn?
            <span className='login-initials'>{username.charAt(0).toUpperCase()}</span>:
            <BsFillPersonFill className="login-icon" />
          }
        </div>
        {
          globalLoggedIn?
          loading?
          <div className='loading loading-navbar' />
          :
          <div style={{textAlign:'center',overflow:'hidden'}}>{username}</div>:
          <div style={{textAlign:'center'}}>Sign in / Register </div>
        }
      </NavLink>
      <div className={`${darkMode?'nav-icons-dark':'nav-icons'}`}>
        {
        (darkMode)?<span title="Switch to Light Mode" onClick={changeDarkState} ><FaSun fontSize="24px" color="#ffff77" cursor="pointer"/></span>:
        <span title="Switch to Dark Mode" onClick={changeDarkState}><FaMoon fontSize="24px" color="#000044" cursor="pointer" /></span>
        }
      </div> 
      <NavLink activeClassName={`${darkMode?'nav-link-active-dark':'nav-link-active'}`} className={`${darkMode?'nav-link-dark':'nav-link'}`} to='/Key-Down' exact><FaKeyboard className="link-icon" />Practise
      </NavLink>
      <NavLink activeClassName={`${darkMode?'nav-link-active-dark':'nav-link-active'}`} className={`${darkMode?'nav-link-dark':'nav-link'}`} to='/Key-Down/my-stats'><ImStatsDots className="link-icon" />My Stats
      </NavLink>
      <NavLink activeClassName={`${darkMode?'nav-link-active-dark':'nav-link-active'}`} className={`${darkMode?'nav-link-dark':'nav-link'}`} to='/Key-Down/global-stats'><FaGlobe className="link-icon" />Global Stats
      </NavLink>
      <NavLink activeClassName={`${darkMode?'nav-link-active-dark':'nav-link-active'}`} className={`${darkMode?'nav-link-dark':'nav-link'}`} to='/Key-Down/search'><FaSearch className="link-icon" />
      Search 
      </NavLink>
      <NavLink activeClassName={`${darkMode?'nav-link-active-dark':'nav-link-active'}`} className={`${darkMode?'nav-link-dark':'nav-link'}`}  to='/Key-Down/about'><FaInfoCircle className="link-icon" />About
      </NavLink>
    </div>
  )
}

export default NavBar
