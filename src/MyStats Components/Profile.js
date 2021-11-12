import React from 'react'

const Profile = ({username,dateCreated,darkMode}) => {
  return (
    <div className={`mystats-border ${darkMode?'mystats-border-dark':''}`}>
      <div className='alltimestats-header'>
        Profile :
      </div>
      <div className='mystats-alltimestats'>
        <div className={`mystats-stat ${darkMode?'mystats-stat-dark':''}`}>
          <div className='mystats-stat-detail'>
            Username :
          </div>
          <div className='mystats-stat-output'>
            {username}
          </div>
        </div>
        <div className={`mystats-stat ${darkMode?'mystats-stat-dark':''}`}>
          <div className='mystats-stat-detail'>
            Account Created On :
          </div>
          <div className='mystats-stat-output'>
            {dateCreated}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
