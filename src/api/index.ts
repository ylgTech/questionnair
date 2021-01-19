import { cloud, request } from "remax/wechat";
import { UserInfo } from "../interfaces"

// init cloud database
cloud.init({ env: 'release-b83caf' })
const db = cloud.database({ env: "release-b83caf" });
const $ = db.command.aggregate

export const fetchUserInfo = () => ({
    queryKey: 'userInfo',
    queryFn: () => db.collection('user').get()
})

export const fetchQuestions = () => ({
    queryKey: 'questions',
    queryFn: () => db.collection('qPersonality').aggregate().sample({ size: 5 }).end(),
})

export const postUserInfo = (data: UserInfo) => db.collection("user").add({ data: data })

export const testForCode = () => ({
    queryKey: 'test',
    queryFn: () => db.collection('user').aggregate()
        .bucketAuto({
            groupBy: '$name',
            buckets: 3,
            output: $.sample({ size: 1 })
        })
        .end(),
})