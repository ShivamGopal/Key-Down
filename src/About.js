import {useEffect} from 'react';
import {FaGithub,FaLinkedin} from 'react-icons/fa';

const About = ({darkMode}) => {

  useEffect(()=>{
    document.title="About the website";
  },[])

  return (
    <div className='about-page'>
      <div className={`mystats-info ${darkMode?'mystats-info-dark':''}`}>
        About the website
      </div>
      <p>
        This website was inspired from :  
        <a className='keybr-link' href="https://www.keybr.com/" target="_blank" rel="noopener noreferrer">Keybr.com</a>
      </p>
      <p>
        The website uses computer generated words rather than using words from the dictionary. The main motive of this website was to let users practise typing by keys.
      </p>
      <p style={{
        marginBottom:'5rem'
      }}>
        Computer generated words are often not readable and users have to see every letter before typing hence the average typing speed here is often lesser than the actual average typing speed that one would have while typing actual words.
      </p>
      <span>
        This website is made by:
      </span>
      <br />
      <span>
        Shivam Gopal
      </span>
      <br />
      <span>
        Indian Institute of Technology (Indian School of Mines), Dhanbad
      </span>
      <br />
      <a href="https://github.com/ShivamGopal" target="_blank" rel="noopener noreferrer">
        <FaGithub className={`${darkMode?'github-dark':'github'}`} />
      </a>
      <a href="https://www.linkedin.com/in/shivam-gopal-41aa63201/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className={`${darkMode?'linkedin-dark':'linkedin'}`} />
      </a>
    </div>
  )
}

export default About
