import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addFeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const disPatch = useDispatch();

  const getFeed = async () => {
    if (feed?.length > 0) return; // Prevent unnecessary API calls
  
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      disPatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Feed error:", err.response?.data || err.message);
    }
  };
  

  useEffect(() => {
    getFeed();
  }, [])

  if(!feed) return;

  if(feed.length <= 0) return <h1 className='flex justify-center my-10'> Sorry, No More Users Found</h1>

  return (
    feed?.length > 0 ? (
      <div className='flex justify-center my-10'>
        <UserCard user={feed[0]} />
      </div>
    ) : (
      <p>Loading feed...</p>
    )
  );  
};

export default Feed;