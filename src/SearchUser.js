import {useState,useEffect} from 'react';
import {FiSearch} from 'react-icons/fi';
import axios from 'axios';
import SearchRes from './SearchUser Components/SearchRes';

const SearchUser = ({darkMode}) => {
  const [showRes,setShowRes]=useState(false);
  const [username,setUsername]=useState('');
  const [userList,setUserList]=useState([]);
  const [filteredUserList,setFilteredUserList]=useState([]);
  const [showUsername,setShowUsername]=useState(false);
  const [count,setCount]=useState(10);
  const [loading,setLoading]=useState(true);

  function getUserList(){
    setLoading(true);
    axios.get('https://key-down.herokuapp.com/api/users').then(res=>res.data).then(ans=>{
      setUserList(ans);
      setLoading(false);
    }).catch(err=>{
      console.log(err)
    });
  }

  useEffect(()=>{
    document.title="Search";
    getUserList();
  },[]);

  return (
    <div>
      {
      loading?<div className='loading loading-home' />
      :
      showRes?<SearchRes username={username} setShowRes={setShowRes} flag='1' darkMode={darkMode} />
      :
      <div>
      <div className='icon-align'>
        <input className={`${darkMode?'search-input-dark':'search-input'}`} type='search' placeholder='Type to Search User' onChange={(e)=>{
          setCount(10);
          if(e.target.value===''){
            setShowUsername(false);
            return;
          }
          else{
            setShowUsername(true);
          }
          let tempUserList=userList.filter((item)=>{
            let dupItem=item.toLowerCase();
            let searchVal=e.target.value.toLowerCase();
            if(dupItem.includes(searchVal)){
              return true;
            }
            else{
              return false;
            }
          })
          setFilteredUserList(tempUserList);
        }}>
        </input>
        <FiSearch className={`${darkMode?'search-icon-dark':'search-icon'}`} />
      </div> 
      <div className='search-result'>
        {
        showUsername?
        filteredUserList.length>0?
        <div>
          {
          filteredUserList.slice(0,count).map((item,ind)=>{
            return <span title="Click to view the user's profile." key={ind} className={`${darkMode?'search-username-dark':'search-username'}`} onClick={()=>{
              setUsername(item);
              setShowUsername(false);
              setShowRes(true);
            }}>
              {item}
            </span>
          })
          }
          {
          count<filteredUserList.length&&
          <button className={`${darkMode?'search-showmore-dark':'search-showmore'}`} onClick={()=>{
            setCount(count+10);
          }}>
            Show More
          </button>
          }
        </div>
        :
        <div>
          Sorry, no user with the entered name found.
        </div>
        :
        <div />
        }
      </div>
      </div>
      }
    </div>
  )
}

export default SearchUser
