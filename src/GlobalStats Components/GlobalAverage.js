import React from 'react'

const GlobalAverage = ({averageSpeed,averageError,darkMode}) => {
  return (
    <div className={`mystats-border ${darkMode?'mystats-border-dark':''}`}>
      <div className='alltimestats-header'>
         Global Averages :
      </div>
      <div className='mystats-alltimestats'>
        <div className={`mystats-stat ${darkMode?'mystats-stat-dark':''}`} >
          <div className= 'mystats-stat-detail'>
            Average Speed :
          </div>
          <div className='mystats-stat-output'>
            {averageSpeed} WPM
          </div>
        </div>
        <div className={`mystats-stat ${darkMode?'mystats-stat-dark':''}`}>
          <div className= 'mystats-stat-detail'>
            Average Error :
          </div>
          <div className='mystats-stat-output'>
            {averageError}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalAverage;
