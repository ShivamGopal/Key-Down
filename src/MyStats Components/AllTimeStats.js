import React from 'react'

const AllTimeStats = ({totalTime,totalTest,averageSpeed,averageError,maxSpeed,totalTestLength,darkMode}) => {
  return (
    <div className={`mystats-border ${darkMode?'mystats-border-dark':''}`}>
      <div className='alltimestats-header'>
        All Time Statistics :
      </div>
      <div className='mystats-alltimestats'>
        <div className={`mystats-stat ${darkMode?'mystats-stat-dark':''}`}>
          <div className='mystats-stat-detail'>
            Total Time Spent :
          </div>
          <div className='mystats-stat-output'>
            {totalTime}
          </div>
        </div>
        <div className={`mystats-stat ${darkMode?'mystats-stat-dark':''}`}>
          <div className='mystats-stat-detail'>
            Total Tests Given :
          </div>
          <div className='mystats-stat-output'>
            {totalTest}
          </div>
        </div>
        <div className={`mystats-stat ${darkMode?'mystats-stat-dark':''}`}>
          <div className='mystats-stat-detail'>
            Average Speed :
          </div>
          <div className='mystats-stat-output'>
            {averageSpeed} WPM
          </div>
        </div>
        <div className={`mystats-stat ${darkMode?'mystats-stat-dark':''}`}>
          <div className='mystats-stat-detail'>
            Average Error :
          </div>
          <div className='mystats-stat-output'>
            {averageError}
          </div>
        </div>
        <div className={`mystats-stat ${darkMode?'mystats-stat-dark':''}`}>
          <div className='mystats-stat-detail'>
            Max Speed :
          </div>
          <div className='mystats-stat-output'>
            {maxSpeed} WPM
          </div>
        </div>
        <div className={`mystats-stat ${darkMode?'mystats-stat-dark':''}`}>
          <div className='mystats-stat-detail'>
            Total Characters Typed :
          </div>
          <div className='mystats-stat-output'>
            {totalTestLength}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllTimeStats
