import React from 'react'

const DisplayWords = ({words,errorInd,currInd,focus,darkMode,testFontSize}) => {
  return (
    <div className={`algn ${testFontSize===0?'size-0':`${testFontSize===1?'size-1':'size-2'}`}`}>
      {
        words.split('').map((char,ind)=>{
          if(ind<currInd){
            if(errorInd[ind]===false){
              if(words[ind]==='\u2423'){
                return (<span key={ind} className={`${focus?`${darkMode?'correct-dark':'correct'}`:'inactive'}`}>{char}<wbr /></span>)
              }
              else{
                return (<span key={ind} className={`${focus?`${darkMode?'correct-dark':'correct'}`:'inactive'}`}>{char}</span>);
              }
            }
            else{
              if(words[ind]==='\u2423'){
                return (<span key={ind} className={`${focus?'incorrect':'inactive'}`}>{char}<wbr /></span>);
              }
              else{
                return (<span key={ind} className={`${focus?'incorrect':'inactive'}`}>{char}</span>);
              }
            }
          }
          else if(ind===currInd){
            if(words[ind]==='\u2423'){
              return (<span key={ind} className={`${focus? `${darkMode?'curr-letter-dark':'curr-letter'}`:'inactive'}`}>{char}<wbr /></span>);
            }
            else{
              return (<span key={ind} className={`${focus? `${darkMode?'curr-letter-dark':'curr-letter'}`:'inactive'}`}>{char}</span>);
            }
          }
          else{
            if(words[ind]==='\u2423'){
              return (<span key={ind} className={`${focus?'':'inactive'}`}>{char}<wbr /></span>);
            }
            else{
              return (<span key={ind} className={`${focus?'':'inactive'}`}>{char}</span>);
            }
          }
        })
      }
    </div>
  )
}

export default DisplayWords
