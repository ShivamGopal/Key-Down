import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {BsFillPersonFill} from 'react-icons/bs';
import {BiShow} from 'react-icons/bi';
import {BiHide} from 'react-icons/bi';
import {FaLock} from 'react-icons/fa';
import LoginImage from '../Images/Login.png';
import {GoVerified} from 'react-icons/go';
import { FaTimesCircle } from 'react-icons/fa';

const Login = ({darkMode,setGlobalLoggedIn,userList,getUserList}) => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [correctPas,setCorrectPas]=useState(false);
  const [correctUser,setCorrectUser]=useState(false);
  const [showPas,setShowPas]=useState(false);
  const [register,setRegister]=useState(true);
  const [loading,setLoading]=useState(false);

  function handleSubmit(e){
    e.preventDefault();
    if(register){
      if(!correctUser){
        alert('Sorry the username already exists. Please select a different username.');
        return;
      }
      const ascii=username[0].charCodeAt();
      if((ascii>=65&&ascii<=90)||(ascii>=97&&ascii<=122)){
        const user={username,password}
        setLoading(true);
        axios.post('https://key-down.herokuapp.com/api/auth/register',user).then(res=>res.data).then(token=>{
          setLoading(false);
          window.localStorage.setItem('auth-token',token);
          getUserList();
          setGlobalLoggedIn(true);
        }).catch(()=>{
          setLoading(false);
          alert('Sorry the username already exists. Please change the username.');
        })
      }
      else{
        alert('The first character of your username must be an alphabet.');
        return;
      }
    }
    else{
      const user={username,password}
      setLoading(true);
      axios.post('https://key-down.herokuapp.com/api/auth/login',user).then(res=>res.data).then(token=>{
        setLoading(false);
        window.localStorage.setItem('auth-token',token);
        setGlobalLoggedIn(true);
      }).catch(()=>{
        setLoading(false);
        alert('Sorry invalid username or password');
      })
    }
  }

  useEffect(()=>{
    document.title="Sign in/Register";
  },[])

  return (
    <div>
    {
      loading?
      <div className='loading loading-home' />
      :
      <div className='login'>
        <img src={LoginImage} alt="Login" height="100rem" width="100rem"
        className="login-image" />
        <br />
        <BsFillPersonFill className="icon-people" />
        <FaLock className={`${register?'icon-password-register':'icon-password'}`}/>
        {
          showPas===false?
          <BiHide className={`${register?'icon-show-hide-register':'icon-show-hide'}`} title="Show Password" onClick={()=>{
            setShowPas(!showPas)
          }} />
          :
          <BiShow className={`${register?'icon-show-hide-register':'icon-show-hide'}`} title="Hide Password" onClick={()=>{
            setShowPas(!showPas)
          }} />
        }
        <br />
        <form onSubmit={handleSubmit}>
          <label className="login-label">Username</label>
          <input
          className="login-input"
          type="text"
          value={username}
          placeholder="Enter Username (max 25 characters)"
          maxLength='25'
          required 
          onChange={(e)=>{
            setUsername(e.target.value)
            if(userList.indexOf(e.target.value)!==-1){
              setCorrectUser(false);
            }
            else{
              setCorrectUser(true);
            }
          }} />
          {
            register&&
            <div className="pass-length-warn">
              <span style={{color:'red'}}>* </span>
              Your username will be visible to other users.
            </div>
          }
          <br />
          <label className="login-label">Password</label>
          <input
          className="login-input"
          type={`${showPas?'text':'password'}`}
          value={password}
          placeholder="Enter Password"
          required
          minLength='6'
          onChange={(e)=>{
            if(e.target.value.length<6){
              setCorrectPas(false);
            }
            else{
              setCorrectPas(true);
            }
            setPassword(e.target.value);
          }} />
          <br />
          {
            register&&!correctPas&&
            <div className="pass-length-warn">
              <span style={{color:'red'}}>* </span>
              Password must be atleast 6 characters long.
            </div>
          }
          {
            register?
            <input 
            className={`${darkMode?'login-submit-dark':'login-submit'}`}
            type="submit"
            value="Register" />
            :
            <input 
            className={`${darkMode?'login-submit-dark':'login-submit'}`} 
            type="submit" 
            value="Login" />
          }
        </form>
        {
          register?
          <div className="change-sign-in">
            Already have an account?
            <span className="change-register" onClick={()=>{
              setRegister(!register);
            }}>  Login</span>
          </div>
          :
          <div className="change-sign-in">
            Don't have an account? 
            <span className="change-register" onClick={()=>{
              setRegister(!register);
            }}>  Register</span>
          </div>
        }
        {
          register&&correctPas?
          <div>
            <GoVerified className={`${darkMode?'icon-verified-dark':'icon-verified'}`} />
          </div>
          :
          <div>
            <GoVerified className='icon-hidden' />
          </div>
        }
        {
          register&&username.length>0?
          correctUser?
          <div>
            <GoVerified className={`${darkMode?'icon-verified-username-dark':'icon-verified-username'}`} />
          </div>
          :
          <div>
            <FaTimesCircle title="Sorry the username is already taken" className={`${darkMode?'icon-verified-username-dark':'icon-verified-username'}`} style={{color:'red'}}/>
          </div>
          :
          <div />
        }
      </div>
    }
    </div>
  )
}

export default Login
