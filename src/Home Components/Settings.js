import DisplayWords from './DisplayWords'
import { useState,useEffect } from 'react';

const Settings = ({darkMode,testVariables,puncLetters,selectAll,setSelectAll,countChar,setCountChar,capLet,setCapLet,puncChar,setPuncChar,generateWords,testChar,setTestChar,setDisplaySettings,wordsCount,setWordsCount,lettersCount,setLettersCount,words,errorInd,currInd,focus,testFontSize,updateSettings}) => {
  var temp_arr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  const [prevPuncChar]=useState(puncChar);
  const [prevCapLet]=useState(capLet);
  const [prevWordsCount]=useState(wordsCount);
  const [prevLettersCount]=useState(lettersCount);
  const [prevSelectAll]=useState(selectAll);
  const [prevCountChar]=useState(countChar);
  const [prevTestChar]=useState(testChar);
  const [copyTestChar,setCopyTestChar]=useState(testChar);
  const [words2,setWords2]=useState(words);
  const [copyTestVariables,setCopyTestVariables]=useState(testVariables);
  
  useEffect(()=>{
    const t1=[];
    setCopyTestVariables(t1);
    var tempTestVariables="";
    copyTestChar.forEach((item,ind)=>{
      if(item===true){
        var ascii=97+ind;
        tempTestVariables+=String.fromCharCode(ascii)
      }
    });
    const tv=tempTestVariables.split('');
    setCopyTestVariables(tv);
  },[copyTestChar]);

  useEffect(()=>{
    if(copyTestVariables.length===0){
      return;
    }
    var num_words=Math.max(wordsCount-2,(Math.floor(Math.random()*(wordsCount))+5));
    var test="";
    for(var i=1;i<=num_words;i++){
      var num_letters=Math.floor(Math.random()*(lettersCount))+3;
      for(var j=1;j<=num_letters;j++){
        var letter=Math.floor(Math.random()*(copyTestVariables.length));
        if(j===1&&capLet===true){
          var ascii=copyTestVariables[letter].charCodeAt()-32;
          test+=String.fromCharCode(ascii);
        }
        else{
          test+=copyTestVariables[letter];
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
    setWords2(test);
  },[copyTestVariables,puncChar,capLet,puncLetters,wordsCount,lettersCount,copyTestChar]);


  function cancelSettings(e){
    e.preventDefault();
    setCapLet(prevCapLet);
    setPuncChar(prevPuncChar);
    setLettersCount(prevLettersCount);
    setWordsCount(prevWordsCount);
    setSelectAll(prevSelectAll);
    setCountChar(prevCountChar);
    setTestChar(prevTestChar);
    setCopyTestChar(prevTestChar);
    setDisplaySettings(false);
  }
  function submitSettings(e){
    e.preventDefault();
    if(countChar<4){
      alert('Please select atleast 4 letters for a better test experience.');
      return;
    }
    generateWords();
    updateSettings(capLet,puncChar,lettersCount,wordsCount,selectAll,testChar);
    setDisplaySettings(false);
  }
  return (
    <div className='settings'>
      <p className="set-title">Settings</p>
      <form>
        <fieldset className="settings-fieldset">
          <legend className="settings-legend">Include in your test</legend>
          <div className="form1">
            <input type="checkbox" id="capital" checked={capLet} onChange={()=>{
              setCapLet(!capLet);
            }} />
            <label className="label-1" htmlFor="capital">Enable Capital Letters</label>
            <input type="checkbox" id="punctuation" checked={puncChar} onChange={()=>{
              setPuncChar(!puncChar);
            }} />
            <label className="label-1" htmlFor="punctuation">Enable Punctuation Characters</label>
          </div>
        </fieldset>
        <fieldset className="settings-fieldset">
          <legend className="settings-legend">Create your own test</legend>
          <p className="set-details">Select atleast 4 letters for a better and more varied test experience.</p>
          <div>
            <input type="checkbox" id="select-all" checked={selectAll} onChange={(e)=>{
              if(e.target.checked===true){
                var temp1=new Array(26);
                temp1.fill(true);
                setCopyTestChar(temp1);
                setTestChar(temp1);
                setSelectAll(true);
                setCountChar(26);
              }
              else{
                var temp2=new Array(26);
                temp2.fill(false);
                setCopyTestChar(temp2);
                setTestChar(temp2);
                setSelectAll(false);
                setCountChar(0);
              }
            }}/>
            <label className="label-2">Select All</label>
          </div>
          <div>
          {
            temp_arr.map((char,ind)=>{
              return(<span key={ind} className="display-alphabets">
                <input className="checkbox-2" type="checkbox" id={char} checked={copyTestChar[ind]} value={copyTestChar[ind]} onChange={(e)=>{
                  if(e.target.checked===false){
                    var temp1=countChar-1;
                    setCountChar(temp1);
                    if(selectAll===true){
                      setSelectAll(false);
                    }
                  }
                  else{
                    var temp2=countChar+1;
                    setCountChar(temp2);
                    if(temp2===26){
                      setSelectAll(true);
                    }
                  }
                  const updatedTestChar=copyTestChar.map((item,pos)=>{
                    if(pos===ind){
                      return (!item);
                    }
                    else{
                      return (item);
                    }
                  });
                  setCopyTestChar(updatedTestChar);
                  setTestChar(updatedTestChar);
                }}/>
                <label className="label-3">{char}</label>
              </span>);
            })
          }
          </div>
        </fieldset>
        <fieldset className="settings-fieldset">
          <legend className="settings-legend">Customize length of your test</legend>
          <p className="set-details">Adjust the length of your test. Pointer towards right means greater length.</p>
          <div className="sliders">
            <div>
              <input type="range" min="8" max="20" value={wordsCount} onChange={(e)=>{
                setWordsCount(e.target.value);
              }} className={`slider-1 ${darkMode?'slider-1-dark':''}`}/>
              <label className="label-4">Adjust words in your test</label>
            </div>
            <div>
              <input type="range" min="2" max="7" value={lettersCount} onChange={(e)=>{
                setLettersCount(e.target.value);
              }} className={`slider-1 ${darkMode?'slider-1-dark':''}`}/>
              <label className="label-4">Adjust letters in your word</label>
            </div>
          </div>
        </fieldset>
        <fieldset className="settings-fieldset">
          <legend className="settings-legend">Preview your test</legend>
          {
            (countChar<4)?<p className="set-details">Select atleast 4 letters to preview your test</p>
            :<DisplayWords words={words2} errorInd={errorInd} currInd={currInd} focus={focus} darkMode={darkMode} testFontSize={testFontSize} />
          }
        </fieldset>
        <div className="submit">
          <input type="submit" value="Save Changes" className={`${darkMode?'submit-btn-dark':'submit-btn'}`} onClick={submitSettings}/>
          <input type="submit" value="Cancel" className={`${darkMode?'submit-btn-dark':'submit-btn'}`} onClick={cancelSettings} title="Return without saving changes"/>
        </div>
      </form>
    </div>
  )
}

export default Settings
