const KeySpeed = ({charSpeed,darkMode}) => {
  return (
    <div className='mystats-keyspeed'>
        {
        charSpeed.map((item,ind)=>{
          var ascii=ind+65;
          var cn=`${item===-1?'speed-1':`${item<=20?'speed-2':`${item<=50?'speed-3':`${item<=80?'speed-4':'speed-5'}`}`}`}`;
          return (<span className={`${cn} ${darkMode?'char-speed-dark':'char-speed'} mystats-char-speed`} key={ind} title={`${item===-1?`User has never typed this character`:`Character = '${String.fromCharCode(ascii)}'\nAverage Speed= ${item} WPM`}`}>{String.fromCharCode(ascii)}</span>)
        })
      }
      </div>
  )
}

export default KeySpeed
