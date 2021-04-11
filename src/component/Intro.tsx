import { Button,Card } from "annar";
import React from "react";
import {useQueries, useQuery} from "react-query";
import { View } from "remax/wechat";
import {fetchDimensionQuestions, fetchUserInfo} from "../api";
import { DIMENSION } from "../data";
import Fiche from "./Fiche";
import Para from "./Para";

const Intro = ({ onTap }) => {
  const res = useQueries(DIMENSION.map((d) => fetchDimensionQuestions(d)));
  return (
    <View
      style={{
        padding: "1em",
        background:
          "url(https://7265-release-b83caf-1258232164.tcb.qcloud.la/bodyBG.png?sign=ade52739ab9ce2ac17a8924c50a0fd71&t=1611468092)",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
      }}
    >
      <View>
        <View>亲爱的同学：</View>
        <Para content="你好！" />
        <Para
          content="党的十八大提出，倡导富强、民主、文明、和谐、自由、平等、公正、法治、爱国、敬业、诚信、友善，积极培育和践行社会主义核心价值观。面对世界范围思想文化交流交融交锋形势下价值观较量的新态势，面对改革开放和发展社会主义市场经济条件下思想意识多元多样多变的新特点，积极培育和践行社会主，义核心价值观，对于巩固马克思主义在意识形态领域的指导地位、巩固全党全国人民团结奋斗的共同思想基础，对于促进人的全面发展、引领社会全面进步，对于集聚全面建成小康社会、实现中华民族伟大复兴中国梦的强大正能量，具有重要现实意义和深远历史意义。
        "
        />
        <Para
          content="
          “友善”虽处于社会主义核心价值观的末尾，但其却是践行社会主义核心价值观其他方面的重要基础。友善即与人为善，要求人们善待亲友、他人、社会、自然。善待亲人以和谐家庭关系，善待朋友以凝结牢固的友谊，善待他人以构建和谐的人际关系，善待自然以形成和谐的自然生态。
        "
        />
        <Para
          content="
          一个人的品德是由思想品德方面的知、情、意、行四个心理要素构成。德育就是培养学生的知、情、意、行的过程，一般说知是情的基础，情又影响知的提高，行是知、情、意的外部表现，知是情的先导，行是知的目的，因此，我们实施德育，要知行统一，晓之以理，动之以情，导之以行，持之以恒。本次问卷的展开从知、情、意、行四个方面来进行问题的描述，主要围绕“个人品质、人际关系、和谐社会、生态和谐”四个维度来测量大学生的友善程度。
        "
        />
        <Para
          content="
          接下来，让我们花5分钟的时间，通过以下题目来测试一下自己的友善度吧！请认真阅读题干，根据第一感觉诚实地进行回答~个人友善度测评结果依据得分高低依次划分为四个等级，只要完成测评即可获得专属“友善证书”并得到针对性的分析和建议。
        "
        />
        {/*<Fiche*/}
        {/*    content="一个人的品德是由思想品德方面的知、情、意、行四个心理要素构成。德育就是培养学生的知、情、意、"*/}
        {/*    title="前言"*/}
        {/*    firNum={2}*/}
        {/*    secNum={5}>*/}
        {/*</Fiche>*/}
      </View>
      <Button
        block
        type="primary"
        shape="square"
        style={{ marginTop: "0.5em" }}
        onTap={() => onTap()}
      >
        话不多说，Let’s begin !
      </Button>
    </View>
  );
};

export default Intro;
