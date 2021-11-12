import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Login from './Account Components/Login';
import AccountInfo from './Account Components/AccountInfo';

const Account = ({darkMode,globalLoggedIn,setGlobalLoggedIn}) => {
  const [userList,setUserList]=useState([]);
  const [loading,setLoading]=useState(true);

  function getUserList(){
    setLoading(true);
    axios.get('https://key-down.herokuapp.com/api/users').then(res=>res.data).then(ans=>{
      setUserList(ans);
      setLoading(false);
    }).catch(err=>{
      setLoading(false);
      console.log(err)
    });
  }
  
  useEffect(()=>{
    getUserList();
  },[])

  return (
    <div>
      {
        loading?<div className='loading loading-home' />
        :
        globalLoggedIn===true?
        <AccountInfo setGlobalLoggedIn={setGlobalLoggedIn} getUserList={getUserList} darkMode={darkMode} />
        :
        <Login darkMode={darkMode} setGlobalLoggedIn={setGlobalLoggedIn} userList={userList} getUserList={getUserList} />
      }
    </div>
  )
}

export default Account
