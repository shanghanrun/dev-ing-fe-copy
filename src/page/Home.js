import React, { useEffect } from 'react';
import HomePostCard from '../component/home/HomePostCard';
import HomeQnaCard from '../component/home/HomeQnaCard';
import HomeMeetUpCard from '../component/home/HomeMeetUpCard';
import '../style/home.style.css';
import qnaStore from '../store/qnaStore';
import homeStore from './../store/homeStore';

const Home = () => {
  const { homePost, homeMeetUp,getHomePostData, getHomeMeetUpData } = homeStore();
  const { qnaList, getQnaList } = qnaStore();

    
  useEffect(() => {
    getHomePostData()
    getHomeMeetUpData();
    getQnaList();
  },[])

  return (
    <div className='home'>
        <div className='main-title'>
            <div>Our</div>
            <div className='italic'>Creative, Passionate, Inquisitive</div>
            <div>Coding Story.</div>
        </div>
        <h5 className='sub-title'>데빙에서 개발자들의 다양한 이야기들을 만나보세요.</h5>
        <div className='post-container'>{homePost?.map((post)=><HomePostCard key={post._id} post={post}/>)}</div>
        <div className='meet-up-container'>{homeMeetUp?.map((meetUp) => <HomeMeetUpCard key={meetUp._id} meetUp={meetUp}/>)}</div>
        <div className='qna-container'>{qnaList?.map((qna) => <HomeQnaCard key={qna._id} qna={qna}/>)}</div>
    </div>
  )
}

export default Home