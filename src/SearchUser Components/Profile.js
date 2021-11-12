import React from 'react'

const Profile = ({username,darkMode}) => {
  return (
    <div className='mystats-alltimestats'>
      <div className={`mystats-stat ${darkMode?'mystats-stat-dark':''}`}>
        <div className='mystats-stat-detail'>
          Username :
        </div>
        <div className='mystats-stat-output'>
          {username}
        </div>
      </div>
    </div>
  )
}

export default Profile
