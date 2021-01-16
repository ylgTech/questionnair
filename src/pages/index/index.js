import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Form from '../../component/Form'
import Question from '../../component/Question';
import { fetchUserInfo } from '../../api'


export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { queryKey, queryFn } = fetchUserInfo()
  useQuery(queryKey, queryFn, {
    onSuccess: (res) => {
      console.log(res.data)
      if (res.data.length > 0) {
        setIsLoggedIn(true)
      }
    }
  })

  return (
    isLoggedIn ? <Question /> : <Form />
  );
};
