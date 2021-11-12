import React from 'react'

const AverageCharSpeed = ({averageCharSpeed,totalCharCount,darkMode}) => {
  return (
    <div className={`mystats-border ${darkMode?'mystats-border-dark':''}`}>
      <div className='alltimestats-header'>
        Average Key Speed :
      </div>
      <div className='mystats-keyspeed'>
        {
        averageCharSpeed.map((item,ind)=>{
          var ascii=ind+65;
          var cn=`${item===-1?'speed-1':`${item<=20?'speed-2':`${item<=50?'speed-3':`${item<=80?'speed-4':'speed-5'}`}`}`}`;
          return (<span className={`${cn} ${darkMode?'char-speed-dark':'char-speed'} mystats-char-speed`} key={ind} title={`${item===-1?`This character has never been typed`:`Character = '${String.fromCharCode(ascii)}'\nAverage Speed= ${item} WPM\nTotal times typed=${totalCharCount[ind]}`}`}>{String.fromCharCode(ascii)}</span>)
        })
      }
      </div>
    </div>

  )
}

export default AverageCharSpeed
