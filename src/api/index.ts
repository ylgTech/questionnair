import { cloud, request } from "remax/wechat";
import { UserInfo } from "../interfaces"

// init cloud database
cloud.init({ env: 'release-b83caf' })
const db = cloud.database({ env: "release-b83caf" });

export const fetchUserInfo = () => ({
    queryKey: 'userInfo',
    queryFn: () => db.collection('user').get()
})

export const fetchQuestions = () => ({
    queryKey: 'questions',
    queryFn: () => request({ url: 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple' })
})

export const postUserInfo = (data: UserInfo) => db.collection("user").add({ data: data })