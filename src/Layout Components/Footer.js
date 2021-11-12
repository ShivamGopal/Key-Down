const Footer = ({darkMode}) => {
  return (
    <div className="bottom" style={darkMode?{borderTop:'1px solid #333'}:{}}>
      <div className='bottom-text'>
        For any suggestions or queries email to: 
        <a href="mailto:shivamgopal55@gmail.com" className='bottom-mailid'>
          shivamgopal55@gmail.com
        </a>
        <div>
          Copyright<span style={{fontSize:'1.5rem',position:'relative',top:'0.2rem'}}>&copy;</span> KeyDown.com
        </div>
      </div>
    </div>
  )
}

export default Footer
