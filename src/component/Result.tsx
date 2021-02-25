import React from "react";
import { View } from "remax/wechat";
import { Rate } from "annar";

const Result = ({ score }) => {
  return (
    <View
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateRows: "auto auto",
        gap: "1em",
        alignContent: "center",
        justifyItems: "center",
      }}
    >
      <View>总得分：{score}</View>
      <Rate value={getStars(score)} />
      {/* <Image src="https://i.ibb.co/Prc76qb/part2.png" /> */}
    </View>
  );
};

const getStars = (score: number) => {
  if (score < 80) return 3;
  if (score < 90) return 4;
  if (score <= 100) return 5;
  return 2; // unreachable
};

export default Result;
