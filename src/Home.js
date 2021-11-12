import React, {useState,useEffect} from 'react';
import DisplayWords from './Home Components/DisplayWords';
import ShowPrevResult from './Home Components/ShowPrevResult';
import Settings from './Home Components/Settings'; 
import axios from 'axios';

const Home = ({darkMode,testFontSize,setTestFontSize,updateStats}) => {
  
  //settings state
  const [capLet,setCapLet]=useState(false);
  const [puncChar,setPuncChar]=useState(false);
  const [wordsCount,setWordsCount]=useState(14);
  const [lettersCount,setLettersCount]=useState(5);
  const [testChar,setTestChar]=useState([true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]);
  var [testVariables,setTestVariables]=useState(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']);
  const [charTime,setCharTime]=useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [charCount,setCharCount]=useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [selectAll,setSelectAll]=useState(true);
  const [displaySettings,setDisplaySettings]=useState(false);
  const [countChar,setCountChar]=useState(26);

  //typing stats state
  const [testLength,setTestLength]= useState(0);
  const [prevTime,setPrevTime]=useState(0);
  const [charSpeed,setCharSpeed]=useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [startTime,setStartTime]=useState(0);
  const [totalTime,setTotalTime]=useState(0);
  const [prevError,setPrevError]=useState(0);
  const [currError,setCurrError]=useState(0);
  const [errorInd,setErrorInd]=useState([]);
  const [words,setWords]=useState("");
  const [currInd,setCurrInd]=useState(0);
  const [focus,setFocus]=useState(true);
  const [puncLetters]=useState(['!','?',',','.',';']);
  const [loading1,setLoading1]=useState(true);
  const [loading2,setLoading2]=useState(true);
  
  function updateSettings(capLet,puncChar,lettersCount,wordsCount,selectAll,testChar){
    if(!window.localStorage.getItem('auth-token')){
      return;
    }
    const body={
      'capLet':capLet,
      'puncChar':puncChar,
      'lettersCount':lettersCount,
      'wordsCount':wordsCount,
      'selectAll':selectAll,
      'testChar':testChar
    };
    axios({
      method: 'put',
      url: 'https://key-down.herokuapp.com/api/user/updatesettings',
      data: body,
      headers:{
        'Content-Type': 'application/json',
        'auth-token':window.localStorage.getItem('auth-token')
      }
    }).then().catch(err=>{
      console.log(err.response);
    });
  }

  function getSettings(){
    if(!window.localStorage.getItem('auth-token')){
      setLoading1(false);
      return;
    }
    setLoading1(true);
    axios.get('https://key-down.herokuapp.com/api/user/getsettings',{
      headers:{
        'auth-token':window.localStorage.getItem('auth-token')
      }
    }).then(res=>res.data).then(ans=>{
      setCapLet(ans.settings.capLet);
      setPuncChar(ans.settings.puncChar);
      setLettersCount(ans.settings.lettersCount);
      setWordsCount(ans.settings.wordsCount);
      setSelectAll(ans.settings.selectAll);
      setTestChar(ans.settings.testChar);
      setLoading1(false);
      }).catch(err=>console.log(err))
  };

  function updatePrevStats(time,testLength,error,charSpeed){
    if(!window.localStorage.getItem('auth-token')){
      return;
    }
    const body={
      'time':time,
      'testLength':testLength,
      'error':error,
      'charSpeed':charSpeed
    };
    const config={ headers: {
      'auth-token':window.localStorage.getItem('auth-token')
    } };
    axios.put('https://key-down.herokuapp.com/api/user/updateprevstats',body,config).then().catch(err=>{
      console.log(err)
    });
  }

  function getPrevStats(){
    if(!window.localStorage.getItem('auth-token')){
      setLoading2(false);
      return;
    }
    setLoading2(true);
    axios.get('https://key-down.herokuapp.com/api/user/getprevstats',{
      headers:{
        'auth-token':window.localStorage.getItem('auth-token')
      }
    }).then(res=>res.data).then(ans=>{
      setTotalTime(ans.prevStats.time);
      setPrevError(ans.prevStats.error);
      setTestLength(ans.prevStats.testLength);
      setCharSpeed(ans.prevStats.charSpeed);
      setLoading2(false);
    })
  }

  const handleKeyDown=(e)=>{
    e.preventDefault();
  }

  //This useEffect is for the start when settings is fetched from the server and when testChar changes.
  useEffect(()=>{
    var arr1=new Array(26);
    arr1.fill(0);
    setCharCount(arr1);
    var arr2=new Array(26);
    arr2.fill(0);
    setCharTime(arr2);
    const t1=[];
    setTestVariables(t1);
    var tempTestVariables="";
    testChar.forEach((item,ind)=>{
      if(item===true){
        var ascii=97+ind;
        tempTestVariables+=String.fromCharCode(ascii)
      }
    });
    const tv=tempTestVariables.split('');
    setTestVariables(tv);
  },[testChar]);

  //This useEffect if for mounting and unmounting of the home page to add event listeners and for fetching settings and prev stats in the beginning.
  useEffect(()=>{
    window.addEventListener('keydown',handleKeyDown);
    document.title="Practise Typing";
    getSettings();
    getPrevStats();
    return()=>{
      window.removeEventListener('keydown',handleKeyDown);
    }
  },[])

  //This function is to basically set testVariables.
  function generateWords(){
    var arr1=new Array(26);
    arr1.fill(0);
    setCharCount(arr1);
    var arr2=new Array(26);
    arr2.fill(0);
    setCharTime(arr2);
    const t1=[];
    setTestVariables(t1);
    var tempTestVariables="";
    testChar.forEach((item,ind)=>{
      if(item===true){
        var ascii=97+ind;
        tempTestVariables+=String.fromCharCode(ascii)
      }
    });
    const tv=tempTestVariables.split('');
    setTestVariables(tv);
  }

  //This useEffect is to generate words.
  useEffect(()=>{
    if(testVariables.length===0){
      return;
    }
    var num_words=Math.max(wordsCount-2,(Math.floor(Math.random()*(wordsCount))+5));
    var test="";
    for(var i=1;i<=num_words;i++){
      var num_letters=Math.floor(Math.random()*(lettersCount))+3;
      for(var j=1;j<=num_letters;j++){
        var letter=Math.floor(Math.random()*(testVariables.length));
        if(j===1&&capLet===true){
          var ascii=testVariables[letter].charCodeAt()-32;
          test+=String.fromCharCode(ascii);
        }
        else{
          test+=testVariables[letter];
        }
      }
      if(i!==num_words){
        if(puncChar===true){
          var pl=Math.floor(Math.random()*puncLetters.length);
          test+=puncLetters[pl];
        }
        test+='\u2423';
      }
    }
    setWords(test);
    setCurrInd(0);
    setCurrError(0);
    var err=new Array(test.length);
    err.fill(false);
    setErrorInd(err);
  },[testVariables,puncChar,capLet,puncLetters,wordsCount,lettersCount]);

  function handleKey({key}){
    if(key==='Escape'){
      restartTest();
      return;
    }
    if(key==='Shift'||key==='CapsLock'){
      return;
    }
    if(currError===0&&currInd===0){
      setStartTime(Date.now());
      setPrevTime(Date.now());
    }
    if(key===words[currInd]||(key===' '&&words[currInd]==='\u2423')){
      var temp=currInd+1;
      if(currInd!==0){
        const currTime=Date.now()-prevTime;
        setPrevTime(Date.now());
        var indTemp=words[currInd].charCodeAt();
        if(indTemp>=97&&indTemp<=122){
          indTemp-=97;
        }
        else if(indTemp>=65&&indTemp<=90){
          indTemp-=65;
        }
        else{
          indTemp=-1;
        }
        if(indTemp>=0&&indTemp<26){
          var tempCharCount=charCount;
          tempCharCount[indTemp]++;
          setCharCount(tempCharCount);
          var tempCharTime=charTime;
          tempCharTime[indTemp]=tempCharTime[indTemp]+(currTime);
          setCharTime(tempCharTime);
        }
      }
      if(temp===words.length){
        const time=Date.now()-startTime;
        setTotalTime(time);
        setPrevError(currError);
        setTestLength(words.length);
        var tempCharSpeed=new Array(26);
        tempCharSpeed.fill(0);
        for(var x=0;x<26;x++){
          if(testChar[x]===true){
            if(charCount[x]===0){
              tempCharSpeed[x]=-1;
            }
            else{
              tempCharSpeed[x]=((charCount[x]*200*60)/charTime[x]).toFixed(1);
            }
          }
        }
        setCharSpeed(tempCharSpeed);
        updatePrevStats(time,words.length,currError,tempCharSpeed);
        updateStats(time,currError,words.length,charCount,charTime);
        generateWords();
        return;
      }
      setCurrInd(temp);
    }
    else{
      if(errorInd[currInd]===false){
        setCurrError(currError+1);
        errorInd[currInd]=true;
      }
    } 
  }
  
  function handleFocus(e){
    setFocus(true);
  }

  function handleBlur(e){
    setFocus(false);
  }
  function restartTest(){
    var arr1=new Array(26);
    arr1.fill(0);
    setCharCount(arr1);
    var arr2=new Array(26);
    arr2.fill(0);
    setCharTime(arr2);
    setCurrInd(0);
    setCurrError(0);
    var err=new Array(words.length);
    err.fill(false);
    setErrorInd(err);
  }
  function startNewTest(){
    generateWords();
  }
  return (
    <div>
      {
      (loading1||loading2)?
      <div className='loading loading-home' />
      :
      (displaySettings)?
      <Settings darkMode={darkMode} testVariables={testVariables} puncLetters={puncLetters} selectAll={selectAll} setSelectAll={setSelectAll} countChar={countChar} setCountChar={setCountChar} capLet={capLet} setCapLet={setCapLet} puncChar={puncChar} setPuncChar={setPuncChar} generateWords={generateWords} testChar={testChar} setTestChar={setTestChar} setDisplaySettings={setDisplaySettings} wordsCount={wordsCount} setWordsCount={setWordsCount} lettersCount={lettersCount} setLettersCount={setLettersCount} words={words} errorInd={errorInd} currInd={currInd} focus={focus} testFontSize={testFontSize} updateSettings={updateSettings} />
      :
      <div className={`${focus?'':'inactive'}`}>
        <ShowPrevResult totalTime={totalTime} testLength={testLength} error={prevError} restartTest={restartTest} startNewTest={startNewTest} testVariables={testVariables} darkMode={darkMode} charSpeed={charSpeed} setDisplaySettings={setDisplaySettings} testFontSize={testFontSize} setTestFontSize={setTestFontSize}/>
        <DisplayWords words={words} errorInd={errorInd} currInd={currInd} focus={focus} darkMode={darkMode} testFontSize={testFontSize} />  
        <input autoFocus type="text" onKeyDown={handleKey} className={`${darkMode?'hidden-dark':'hidden'}`} onFocus={handleFocus} onBlur={handleBlur} value={`${focus?"":"Click here to activate..."}`} readOnly/> 
      </div>
      }
    </div>
  )
}

export default Home

