import React from 'react'

const ShowTestChar = ({darkMode,testVariables}) => {
  return (
    <div className={`${darkMode?'stats-2-dark':'stats-2'}`}>
      <span style={{color:'#00a3cc'}}>Current keys:  </span>
      {
        testVariables.map((char,ind)=>{
          var ascii=char.charCodeAt()-32;
          if(ind!==testVariables.length-1){
            return(<span className={`${darkMode?'test-char-dark':'test-char'}`} key={ind}>{String.fromCharCode(ascii)}, </span>)
          }
          else{
            return(<span className={`${darkMode?'test-char-dark':'test-char'}`} key={ind}>{String.fromCharCode(ascii)}</span>)
          }
        })
      }
    </div>
  )
}

export default ShowTestChar
