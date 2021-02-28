import React, {useEffect, useState} from 'react'
import { useQuery } from 'react-query';
import Login from '../../component/Login';
import Question from '../../component/Question';
import Intro from '../../component/Intro';
import Cover from '../../component/Cover';
import { fetchUserInfo } from '../../api'

export default () => {
  const [page, setPage] = useState("cover")
  const [second,setSecond] = useState(3)

  useEffect(() => {
    const handleInterval = setInterval(() => {
      setSecond(second-1);
    },1000);
    if(second <= 0){
      setSecond(0);
      clearInterval(handleInterval);
      setPage("login");
    }
  },[second]);


  // return <Cover second={second} jump={setPage("login")}/>
  return  page === "cover" ? <Cover second={ second } /> :
          page === "login" ? <Login jump={() => setPage("intro")} /> :
          page === "intro" ? <Intro onTap={() => setPage("question")} /> :
          <Question />
};
