import {useState} from 'react';
import {FaQuestionCircle} from 'react-icons/fa';

const ShowCharSpeed = ({darkMode,charSpeed,totalTime}) => {
  const [showInfo,setShowInfo]=useState(false);
  return (
    <div className={`${darkMode?'stats-2-dark':'stats-2'}`}>
      <span style={{color:'#00a3cc'}}>Keys' Speed: </span>
      {
        (totalTime===0)?<output className={`${darkMode?'output-dark':'output'}`}>NA</output>
        :charSpeed.flatMap((item,ind)=>{
          var ascii=ind+65;
          if(item===-1||item>0){
            var cn=`${item===-1?'speed-1':`${item<=20?'speed-2':`${item<=50?'speed-3':`${item<=80?'speed-4':'speed-5'}`}`}`}`;
            //console.log(item,cn);
            return (<span className={`${cn} ${darkMode?'char-speed-dark':'char-speed'}`} key={ind} title={`${item===-1?`No occurence of this character in the test`:`Speed= ${item} WPM`}`}>{String.fromCharCode(ascii)}</span>)
          }
          else{
            return ([]);
          }
        })
      }
      <span className="char-speed-details" onMouseEnter={()=>{
        setShowInfo(true);
      }} onMouseLeave={()=>{
        setShowInfo(false);
      }}><FaQuestionCircle style={{color:'#0066ff',fontSize:'22px'}}/>
      {
        showInfo&&<div className={`${darkMode?'tooltip-dark':'tooltip'}`}>
          <div style={{textAlign:'center',marginBottom:'5px',fontWeight:'bold'}}>Color Codes</div>
          <span className="color-box" style={{backgroundColor:'white'}}/>
          <span> No occurence.
          </span>
          <br />
          <span className="color-box" style={{backgroundColor:'rgba(255,0,0,0.8)'}}/>
          <span> 0 &lt;= Speed &lt;=20
          </span>
          <br />
          <span className="color-box" style={{backgroundColor:'rgba(0,170,0,0.8)'}}/>
          <span> 20 &lt; Speed &lt;=50
          </span>
          <br />
          <span className="color-box" style={{backgroundColor:'rgba(0,250,0,0.8)'}} />
          <span> 50 &lt; Speed &lt;=80
          </span>
          <br />
          <span className="color-box" style={{backgroundColor:'rgba(26,198,255,0.8)'}}/>
          <span> Speed &gt;80
          </span>
        </div>
      }
      </span>
    </div>
  )
}

export default ShowCharSpeed
