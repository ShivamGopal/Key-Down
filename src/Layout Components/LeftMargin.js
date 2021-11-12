import React from 'react'

export const LeftMargin = ({darkMode}) => {
  return (
    <div className="left" style={darkMode?{borderRight:'1px solid #333'}:{}} />
  )
}

export default LeftMargin
