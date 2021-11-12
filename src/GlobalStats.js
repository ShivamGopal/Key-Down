import {useState,useEffect} from 'react'
import axios from 'axios';
import GlobalAverage from './GlobalStats Components/GlobalAverage';
import AverageSpeed from './GlobalStats Components/AverageSpeed';
import MaxSpeed from './GlobalStats Components/MaxSpeed';
import MinError from './GlobalStats Components/MinError';
import AverageCharSpeed from './GlobalStats Components/AverageCharSpeed';
import SearchRes from './SearchUser Components/SearchRes';

const GlobalStats = ({darkMode}) => {
  const [loading,setLoading]=useState(true);
  const [averageSpeed,setAverageSpeed]=useState(0);
  const [averageError,setAverageError]=useState(0);
  const [averageCharSpeed,setAverageCharSpeed]=useState([]);
  const [totalCharCount,setTotalCharCount]=useState([]);
  const [avgSpeedList,setAvgSpeedList]=useState([]);
  const [minErrorList,setMinErrorList]=useState([]);
  const [maxSpeedList,setMaxSpeedList]=useState([]);
  const [username,setUsername]=useState('');
  const [showRes,setShowRes]=useState(false);

  function getGlobalStats(){
    setLoading(true);
    axios.get('https://key-down.herokuapp.com/api/users/globalstats').then(res=>res.data).then(ans=>{
      var avgerr=ans.averageError;
      setAverageError(avgerr);

      var avgspeed=ans.averageSpeed;
      setAverageSpeed(avgspeed);

      setAverageCharSpeed(ans.averageCharSpeed);
      setTotalCharCount(ans.totalCharCount);

      var avgList=[],errList=[],maxList=[];
      for(var i=0;i<ans.averageSpeedSortedUsers.length;i++){
        avgList.push({
          'username':ans.averageSpeedSortedUsers[i].loginDetails.username,
          'averageSpeed':ans.averageSpeedSortedUsers[i].allTimeStats.averageSpeed
        });

        errList.push({
          'username':ans.errorSortedUsers[i].loginDetails.username,
          'averageError':ans.errorSortedUsers[i].allTimeStats.averageError
        });
      }

      for(var j=0;j<ans.maxSpeedSortedUsers.length;j++){
        maxList.push({
          'username':ans.maxSpeedSortedUsers[j].loginDetails.username,
          'maxSpeed':ans.maxSpeedSortedUsers[j].allTimeStats.maxSpeed
        })
      };

      setAvgSpeedList(avgList);
      setMinErrorList(errList);
      setMaxSpeedList(maxList);
      setLoading(false);
    })
  }

  useEffect(()=>{
    document.title="Global Stats";
    getGlobalStats()
  },[]);

  return (
    <div>
      {
        loading?
        <div className='loading loading-home' />
        :
        showRes?
        <SearchRes username={username} setShowRes={setShowRes} flag='2' darkMode={darkMode} />
        :
        <div className='mystats'>
          <div className={`mystats-info ${darkMode?'mystats-info-dark':''}`}>
            This page contains combined stats of all the users on this website. 
          </div>
          <GlobalAverage averageSpeed={averageSpeed} averageError={averageError} darkMode={darkMode} />
          <AverageSpeed avgSpeedList={avgSpeedList} setShowRes={setShowRes} setUsername={setUsername} darkMode={darkMode} />
          <MinError minErrorList={minErrorList} setShowRes={setShowRes} setUsername={setUsername} darkMode={darkMode} />
          <MaxSpeed maxSpeedList={maxSpeedList} setShowRes={setShowRes} setUsername={setUsername} darkMode={darkMode}/>
          <AverageCharSpeed averageCharSpeed={averageCharSpeed} totalCharCount={totalCharCount} darkMode={darkMode} />
        </div>
      }
    </div>
  )
}

export default GlobalStats
