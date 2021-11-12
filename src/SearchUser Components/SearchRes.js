import axios from 'axios';
import { useState,useEffect } from 'react';
import {BiArrowBack} from 'react-icons/bi';
import Profile from './Profile';
import UserStats from './UserStats';
import KeySpeed from './KeySpeed';

const SearchRes = ({username,setShowRes,flag,darkMode}) => {
  const [totalTests,setTotalTests]=useState(0);
  const [maxSpeed,setMaxSpeed]=useState(0);
  const [averageError,setAverageError]=useState(0);
  const [averageSpeed,setAverageSpeed]=useState(0);
  const [charSpeed,setCharSpeed]=useState(0);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    function getUserStats(){
      axios.get('https://key-down.herokuapp.com/api/users/userstats',{
        headers: {
          'username':username
        }
      }).then(res=>res.data).then(ans=>{
        setTotalTests(ans.allTimeStats.totalTests);
        setMaxSpeed(ans.allTimeStats.maxSpeed);
        setAverageError(ans.allTimeStats.averageError);
        setAverageSpeed(ans.allTimeStats.averageSpeed);
        let tempCharSpeed=[];
        for(var i=0;i<26;i++){
          let time=ans.allTimeStats.totalCharTime[i];
          let count=ans.allTimeStats.totalCharCount[i];
          if(count===0){
            tempCharSpeed.push(-1);
          }
          else{
            let speed=((count*200*60)/time).toFixed(1);
            tempCharSpeed.push(speed);
          }
        }
        setCharSpeed(tempCharSpeed);
        setLoading(false);
      })
    };
    getUserStats();
  },[username]);

  return (
    <div>
    {
      loading?
      <div className='loading loading-home' />
      :
      <div className='search-res'>
        <div className='back' onClick={()=>{
            setShowRes(false);
        }}>
          <BiArrowBack className='back-arrow' />
          <span className='back-text'>
            Back to 
          </span>
          {
            flag==='1'?
            <span className='back-text'> Search</span>
            :
            <span className='back-text'> Global Stats</span>
          }
        </div>
        <h3 className='search-res-header'>
          Public Profile of {username}
        </h3>
        <Profile username={username} darkMode={darkMode} />
        <div className={`${darkMode?'search-res-break-dark':'search-res-break'}`} />
        <UserStats totalTests={totalTests} maxSpeed={maxSpeed} averageSpeed={averageSpeed} averageError={averageError} darkMode={darkMode} />
        <div className={`${darkMode?'search-res-break-dark':'search-res-break'}`} />
        <KeySpeed charSpeed={charSpeed} darkMode={darkMode} />
      </div>
    }
    </div>
  )
}

export default SearchRes
