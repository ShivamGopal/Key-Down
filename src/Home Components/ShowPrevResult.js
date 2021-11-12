import React from 'react';
import { FiSettings } from "react-icons/fi";
import { MdRedo } from "react-icons/md";
import { MdUndo } from "react-icons/md";
import {ImFontSize} from "react-icons/im";
import ShowTestChar from './ShowTestChar';
import ShowCharSpeed from './ShowCharSpeed'

const ShowPrevResult = ({totalTime,testLength,error,restartTest,startNewTest,testVariables,darkMode,charSpeed,setDisplaySettings,testFontSize,setTestFontSize}) => {
  var speed=((testLength*200*60)/totalTime).toFixed(1);
  var accuracy=(100-((error/testLength)*100)).toFixed(2);
  function changeTestFontSize(){
    window.localStorage.setItem('fs',(testFontSize+1)%3);
    setTestFontSize((testFontSize+1)%3)
  }
  return (
    <div>
      <div className="icons">
        <span title="Set your own custom test" className={`${darkMode?"icon-dark":"icon"}`} onClick={()=>{
          setDisplaySettings(true);
        }}><FiSettings/></span>
        <span title="Restart the current test" className={`${darkMode?"icon-dark":"icon"}`} onClick={restartTest}><MdUndo/></span>
        <span title="Start a new test" className={`${darkMode?"icon-dark":"icon"}`} onClick={startNewTest}><MdRedo /></span>
        <span title={`${testFontSize===0?'Switch to medium font':`${testFontSize===1?'Switch to large font':'Switch to small font'}`}`} className={`${darkMode?"icon-dark":"icon"}`} onClick={changeTestFontSize} ><ImFontSize /></span>

      </div>
      {
      (totalTime===0)?
      <div className={`${darkMode?'stats-dark':'stats'}`}>
        <span style={{color: '#00a3cc', marginRight:'70px'}}>Speed: <output className={`${darkMode?'output-dark':'output'}`}>NA</output></span> 
        <span style={{color: '#e60000',marginRight:'70px'}}>Error: <output className={`${darkMode?'output-dark':'output'}`}>NA</output></span> 
        <span style={{color: '#00cc44'}}> Accuracy: <output className={`${darkMode?'output-dark':'output'}`}>NA</output></span>
      </div>
      :
      <div className={`${darkMode?'stats-dark':'stats'}`}>
        <span style={{color: '#00a3cc',marginRight:'70px'}} title='Speed is in words per minute'>Speed: <output className={`${darkMode?'output-dark':'output'}`}>{speed}</output><span className={`${darkMode?'output-dark':'output'}`} style={{fontSize:'1rem'}}> WPM</span></span> 
        <span style={{color: '#e60000',marginRight:'70px'}}>Error: <output className={`${darkMode?'output-dark':'output'}`}>{error}</output></span> 
        <span style={{color: '#00cc44'}}> Accuracy: <output className={`${darkMode?'output-dark':'output'}`}>{accuracy}%</output></span>
      </div>
      }
      <ShowCharSpeed darkMode={darkMode} charSpeed={charSpeed} totalTime={totalTime}/>
      <ShowTestChar darkMode={darkMode} testVariables={testVariables} />
    </div>
  )
}

export default ShowPrevResult
