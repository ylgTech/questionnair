import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Login from '../../component/Login'
import Question from '../../component/Question';
import Intro from '../../component/Intro';
import { fetchUserInfo } from '../../api'


export default () => {
  const [page, setPage] = useState("login")

  const { queryKey, queryFn } = fetchUserInfo()
  useQuery(queryKey, queryFn, {
    onSuccess: (res) => {
      console.log(res.data)
      if (res.data.length > 0) {
        setPage("intro")
      }
    }
  })

  return <Question />
  return page === "login" ? <Login /> : page === "intro" ? <Intro onTap={() => setPage("question")} /> : <Question />
};
