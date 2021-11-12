import React from 'react'

const AverageSpeed = ({avgSpeedList,setShowRes,setUsername,darkMode}) => {
  return (
    <div className={`mystats-border ${darkMode?'mystats-border-dark':''}`}>
      <div className='alltimestats-header'>
         Users with the greatest average speed :
      </div>
      <div className={`${darkMode?'table-border-dark':'table-border'}`}>
        <table className='global-stats-table'>
          <tbody>
            <tr>
              <th className={`${darkMode?'table-header-dark':'table-header'}`}>#</th>
              <th className={`${darkMode?'table-header-dark':'table-header'}`}>Username</th>
              <th className={`${darkMode?'table-header-dark':'table-header'}`}>Average Speed</th>
            </tr>
            {
              avgSpeedList.map((item,ind)=>{
                var cn=`${ind===0?'first':`${ind===1?'second':`${ind===2?'third':''}`}`}`
                return(
                  <tr key={ind}>
                    <td className={`${cn} ${darkMode?'table-data-dark':'table-data'}`}>{ind+1}</td>
                    <td className={`global-stats-username ${darkMode?'table-data-dark':'table-data'}`} title="Click to view the user's profile." onClick={()=>{
                      setUsername(item.username);
                      setShowRes(true);
                    }}>{item.username}</td>
                    <td className={`${darkMode?'table-data-dark':'table-data'}`}>{item.averageSpeed} WPM</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <p className='global-stats-condition'>
        <span style={{color:'red'}}>
          *
        </span>
        <span> Minimum 10 tests required.
        </span> 
      </p>
    </div>
  )
}

export default AverageSpeed
