import { cloud } from "remax/wechat";
import { UserInfo } from "../interfaces"

// init cloud database
cloud.init({ env: 'release-b83caf' })
const db = cloud.database({ env: "release-b83caf" });

export const fetchUserInfo = () => ({
    queryKey: 'userInfo',
    queryFn: () => db.collection('user').get()
})

export const fetchQuestions = () => ({
    queryKey: 'test',
    queryFn: () => db.collection("article").doc("a9bfcffc5ebcf83900957b9e3a74dc80").get()
})

export const postUserInfo = (data: UserInfo) => db.collection("user").add({ data: data })