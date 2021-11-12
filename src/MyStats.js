import {useEffect,useState} from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Profile from './MyStats Components/Profile';
import AllTimeStats from './MyStats Components/AllTimeStats';
import KeySpeed from './MyStats Components/KeySpeed';

const MyStats = ({darkMode}) => {
  const [dateCreated,setDateCreated]=useState('');
  const [username,setUsername]=useState('');
  const [totalTest,setTotalTest]=useState(0);
  const [maxSpeed,setMaxSpeed]=useState(0);
  const [totalTestLength,setTotalTestLength]=useState(0);
  const [totalTime,setTotalTime]=useState('');
  const [averageError,setAverageError]=useState(0);
  const [totalCharCount,setTotalCharCount]=useState([]);
  const [totalCharTime,setTotalCharTime]=useState([]);
  const [totalCharSpeed,setTotalCharSpeed]=useState([]);
  const [averageSpeed,setAverageSpeed]=useState(0);
  const [loading,setLoading]=useState(true);

  function getUserStats(){
    const token=window.localStorage.getItem('auth-token');
    if(token){
      setLoading(true);
      axios.get('https://key-down.herokuapp.com/api/user/alltimestats',{
        headers: {
          'auth-token':token
        }
      }).then(res=>res.data).then(ans=>{
        const tempDate=new Date(ans.dateCreated);
        const day=tempDate.getDate();
        const month=tempDate.getMonth()+1;
        const year=tempDate.getFullYear();
        const formattedDate=day+"/"+month+"/"+year;
        setDateCreated(formattedDate);
        setUsername(ans.loginDetails.username);
        setTotalTest(ans.allTimeStats.totalTests);
        setTotalTestLength(ans.allTimeStats.totalTestLength);
        setMaxSpeed(ans.allTimeStats.maxSpeed);
        var milliseconds=ans.allTimeStats.totalTime;
        var seconds=Math.floor((milliseconds/1000)%60);
        var minutes=Math.floor((milliseconds/(1000*60))%60);
        var hours=Math.floor(milliseconds/(1000*60*60));
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        var tempTime=hours+":"+minutes+":"+seconds;
        setTotalTime(tempTime);
        var avgerr=ans.allTimeStats.averageError;
        setAverageError(avgerr);
        setTotalCharCount(ans.allTimeStats.totalCharCount);
        setTotalCharTime(ans.allTimeStats.totalCharTime);
        var averSpeed=ans.allTimeStats.averageSpeed;
        if(ans.allTimeStats.totalTime===0){
          averSpeed=0;
        }
        setAverageSpeed(averSpeed);
        var tempCharSpeed=[]
        for(var i=0;i<26;i++){
          if(ans.allTimeStats.totalCharCount[i]===0){
            tempCharSpeed.push(-1);
          }
          else{
            var speed=((ans.allTimeStats.totalCharCount[i]*200*60)/ans.allTimeStats.totalCharTime[i]).toFixed(1);
            tempCharSpeed.push(speed);
          }
        }
        setTotalCharSpeed(tempCharSpeed);
        setLoading(false);
      })
    }
  }

  useEffect(()=>{
    document.title="My Stats";
    if(window.localStorage.getItem('auth-token')){
      getUserStats();
    }
  },[])
  return (
    <div>
      {
        !window.localStorage.getItem('auth-token')&&<Redirect to="/Key-Down/account" />
      }
      {
        loading?
        <div className='loading loading-home' />
        :
        <div className='mystats'>
          <div className={`mystats-info ${darkMode?'mystats-info-dark':''}`}>
            This page contains your all time typing stats. 
          </div>
          <Profile username={username} dateCreated={dateCreated} darkMode={darkMode} />
          <AllTimeStats totalTime={totalTime} totalTest={totalTest} averageSpeed={averageSpeed} averageError={averageError} maxSpeed={maxSpeed} totalTestLength={totalTestLength} darkMode={darkMode} />
          <KeySpeed totalCharCount={totalCharCount} totalCharTime={totalCharTime} totalCharSpeed={totalCharSpeed} darkMode={darkMode} />
        </div>
      }
    </div>
  )
}

export default MyStats
