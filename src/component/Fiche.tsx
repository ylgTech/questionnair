import React from "react";
import { View } from "remax/wechat";
import Para from "./Para";
import {Card} from "annar";

const Fiche = ({ content,title,firNum,secNum, style }: { content:string;title: string;firNum:number;secNum:number; style? }) => {
    const first = (
        <view style={{display: "flex", flexDirection: "row", height: "72px"}}>
            <view style={{width: "20rpx", height: "72px", backgroundColor: "brown", borderRadius: "8px 8px 8px 8px"}}>

            </view>
            <view style={{height: "72px", fontSize: "50px", marginLeft: "10px"}}>
                {title}
            </view>
        </view>
    );
    const ext = (
        <view style={{display: "flex", flexDirection: "row", height: "50rpx"}}>
            <view style={{fontWeight: "bold", fontSize: "50px"}}>
                {firNum}
            </view>
            <view style={{fontSize: "50px"}}>
                /{secNum}
            </view>
        </view>
    );
    return (
        <Card
            title={first}
            shadow={true}
            extra={ext}
        >
            <Para
                content={content}
            />
        </Card>
    );
};

export default Fiche;