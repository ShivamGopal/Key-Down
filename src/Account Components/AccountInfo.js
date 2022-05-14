import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { IoLogOutOutline } from 'react-icons/io5';
import {FaTrashAlt} from 'react-icons/fa';

const AccountInfo = ({setGlobalLoggedIn,getUserList,darkMode}) => {
  const [username,setUsername]=useState('');
  const [loading,setLoading]=useState(true);

  function handleLogout(e) {
    e.preventDefault();
    if(window.confirm('Are you sure you want to log out?')){
      window.localStorage.removeItem('auth-token');
      setGlobalLoggedIn(false);
    }
  }
  
  function handleDelete(e){
    e.preventDefault();
    if(window.confirm('Are you sure you want to delete your account?')){
      setLoading(true);
      axios.delete('https://key-down.herokuapp.com/api/user/delete',{
        headers: {
          'auth-token':window.localStorage.getItem('auth-token')
        }
      }).then(()=>{
        setLoading(false);
        window.localStorage.removeItem('auth-token');
        getUserList();
        setGlobalLoggedIn(false);
      }).catch(()=>{
        setLoading(false);
        alert('Sorry an error occured.')
      });
    }
  }

  function getUsername(){
    setLoading(true);
    axios.get('https://key-down.herokuapp.com/api/user/username',{
      headers: {
        'auth-token':window.localStorage.getItem('auth-token')
      }
    }).then(res=>res.data).then(ans=>{
      setLoading(false);
      setUsername(ans.loginDetails.username);
      document.title=ans.loginDetails.username;
    })
  }

  useEffect(()=>{
    getUsername();
  },[])

  return (
    <div>
    {
      loading?<div className='loading loading-home' />
      :
      <div className='account-info'>
        <h2 className="display-username">
          Username: {username}
        </h2>
        <fieldset className="account-info-fieldset">
          <legend className="account-info-legend">
            Account Actions
          </legend>
          <p>
            Your data is stored with us and you can access your account anywhere using your username and password.<br />To logout click the button below. Note that your typing stats will only be stored by us when you are logged in.
          </p>
          <button onClick={handleLogout} className={`${darkMode?'logout-btn-dark':'logout-btn'}`}>
            <IoLogOutOutline className={`${darkMode?'logout-icon-dark':'logout-icon'}`} />
            <span className="logout-text">Logout</span>
          </button>
        </fieldset>
        <fieldset className="account-info-fieldset">
          <legend className="account-info-legend">
            Delete Account
          </legend>
          <p>
            To delete your account click the button below. Note that once you delete your account all your typing data will be deleted and it cannot be recovered.Make sure you completely understand the consequences before proceeding.
          </p>
          <button onClick={handleDelete} className={`${darkMode?'logout-btn-dark':'logout-btn'}`}>
            <FaTrashAlt className={`${darkMode?'logout-icon-dark':'logout-icon'}`} style={{fontSize:'1.2rem'}} />
            <span className="logout-text" style={{position:'relative',bottom:'0.15rem'}}>
              Delete
            </span>
          </button>
        </fieldset>
      </div>
    }
    </div>
  )
}

export default AccountInfo
