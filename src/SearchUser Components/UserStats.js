const UserStats = ({totalTests,maxSpeed,averageSpeed,averageError,darkMode}) => {
  return (
    <div className='mystats-alltimestats'>
      <div className={`mystats-stat ${darkMode?'mystats-stat-dark':''}`}>
        <div className='mystats-stat-detail'>
          Total Tests Given :
        </div>
        <div className='mystats-stat-output'>
          {totalTests}
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
    </div>
  )
}

export default UserStats
