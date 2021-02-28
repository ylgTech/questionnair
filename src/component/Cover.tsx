import React, {useState} from "react";
import { Tag } from 'annar';

const Cover = ({ second,jump }) =>{

    return (
        <view
            style={{
                overflow: "hidden",
            }}
        >
            <img
                src="https://7265-release-b83caf-1258232164.tcb.qcloud.la/cover.jpg?sign=4eaeaa9af9845cad8af7f1d8a5e36960&t=1614437090"
                style={{
                    display: "flex",
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                }}
            />
            <Tag
                size="large"
                // onTap={() => jump()}
            >
                { second } s
            </Tag>
        </view>
    );
};


export default Cover;
