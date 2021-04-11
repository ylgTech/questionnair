import React, {useEffect, useState} from 'react'
import { useQuery } from 'react-query';
import Login from '../../component/Login';
import Question from '../../component/Question';
import Intro from '../../component/Intro';
import Cover from '../../component/Cover';
import { fetchUserInfo } from '../../api';

export default () => {
  const [page, setPage] = useState("cover");

  // return <Cover second={second} />
  return  page === "cover" ? <Cover jump={() => setPage("login")} /> :
          page === "login" ? <Login jump={() => setPage("intro")} /> :
          page === "intro" ? <Intro onTap={() => setPage("question")} /> :
          <Question />
};
