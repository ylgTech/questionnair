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
  const { queryKey, queryFn } = fetchUserInfo()

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

  useQuery(queryKey, queryFn, {
    onSuccess: (res) => {
      console.log(res.data)
      if (res.data.length > 0 & second === 0) {
        setPage("intro")
        console.log("setIntro了")
      }
    }
  })

  // return <Cover second={second} jump={setPage("login")}/>
  return  page === "cover" ? <Cover second={second} /> :
          page === "login" ? <Login /> :
          page === "intro" ? <Intro onTap={() => setPage("question")} /> :
          <Question />
};
