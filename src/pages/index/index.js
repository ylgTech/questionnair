import React, { useState } from 'react'
import { View } from 'remax/wechat'
import { useQuery } from 'react-query';
import Login from '../../component/Login';
import Question from '../../component/Question';
import Intro from '../../component/Intro';
import { fetchUserInfo } from '../../api'

// The lazy load feature seems not supported by remax
// const Login = React.lazy(() => import('../../component/Login'))
// const Question = React.lazy(() => import('../../component/Question'))
// const Intro = React.lazy(() => import('../../component/Intro'))

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
  // return (<React.Suspense fallback={<View>Loading...</View>}>
  //   {
  //     page === "login" ? <Login /> : page === "intro" ? <Intro onTap={() => setPage("question")} /> : <Question />
  //   }
  // </React.Suspense>)
};
