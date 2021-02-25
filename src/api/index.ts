import { cloud } from "remax/wechat";
import { DimensionType, UserInfo } from "../interfaces"

// init cloud database
cloud.init({ env: 'release-b83caf' })
const db = cloud.database({ env: "release-b83caf" });
const $ = db.command.aggregate

export const fetchUserInfo = () => ({
    queryKey: 'user',
    queryFn: () => db.collection('user').get()
})

export const fetchDimensionQuestions = (dbName: DimensionType) => ({
    queryKey: dbName,
    queryFn: () => db.collection(dbName).aggregate().sample({ size: 4 }).end(),
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