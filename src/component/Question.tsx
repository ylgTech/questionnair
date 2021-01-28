import React, { useCallback, useRef, useState } from "react";
import { View, Image } from "remax/wechat";
import { Button, Rate, Card, Checkbox, Form, Radio, Skeleton } from "annar";
import { DIMENSION, dimensionMap } from "../data";
import { useQuery } from "react-query";
import { fetchDimensionQuestions } from "../api";
import { QuestionType } from "../interfaces";
import Para from "./Para";

const Question = () => {
  const [curDimension, setDimension] = useState(0);
  console.log("render page with dimension: " + curDimension);
  const totalDimensions = DIMENSION.length;

  const dimension = DIMENSION[curDimension];
  const { data, isLoading, isSuccess } = useQuery(
    fetchDimensionQuestions(dimension)
  );
  const questions: QuestionType[] = isSuccess ? data.list : [];
  const desc = dimensionMap[dimension];

  const isPosting = false;

  const answers = useRef({});
  const correctAnswers = useRef({});

  const [score, setScore] = useState(0);

  const handleFinish = (values) => {
    // console.log("answers: ", values);
    answers.current[dimension] = values;
    correctAnswers.current[dimension] = Object.fromEntries(
      questions.map((q) => [q._id, { a: q.correctAnswer, t: q.type }])
    );
    // console.log(correctAnswers.current);
    if (curDimension === totalDimensions - 1) {
      console.log("all filled");
      // console.log("final answers: ", answers.current);
      let totalScore = 0;
      Object.keys(answers.current).forEach((d) => {
        let sectionScore = 0;
        // console.log("cur section: " + d);
        // console.log(answers.current[d]);
        Object.keys(answers.current[d]).forEach((k) => {
          const answer = answers.current[d][k];
          const correctAnswer = correctAnswers.current[d][k].a;
          // console.log("answer: " + answer);
          // console.log(answer);
          // console.log("correctAnser: " + correctAnswer);
          // console.log(correctAnswer);
          const type = correctAnswers.current[d][k].t;
          // console.log(type);
          if (type === "single") {
            if (correctAnswer[0] === answer) {
              // console.log("I am correct at single");
              sectionScore += 5;
            }
          } else if (type === "accumulate") {
            sectionScore += answer.length;
          } else if (type === "likert") {
            sectionScore += answer + 1;
          }
        });
        totalScore += sectionScore;
      });
      console.log("t: " + totalScore);
      setScore((pre) => totalScore);
    } else {
      setDimension((pre) => pre + 1);
    }
  };
  // [curDimension, dimension]
  // );

  return score === 0 ? (
    // return false ? (
    <View
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gap: "0.5em",
        background:
          "url(https://7265-release-b83caf-1258232164.tcb.qcloud.la/bodyBG.png?sign=ade52739ab9ce2ac17a8924c50a0fd71&t=1611468092)",
        backgroundSize: "100%",
      }}
    >
      <Progress percent={(curDimension * 100) / totalDimensions} />
      <View
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <View>
          <Para content={desc.intro} />
          <Para content={desc.remark} />
        </View>
        {isLoading ? (
          <Skeleton
            paragraph={{
              rows: 5,
              width: Array(5)
                .fill(0)
                .map(() => `${40 + Math.floor(Math.random() * 60)}%`),
            }}
            fade
            repetitions={3}
          />
        ) : (
          <Form onFinish={handleFinish} key={"section" + curDimension}>
            <View
              style={{
                display: "grid",
                gap: "40px",
                gridTemplateRows: "1fr auto",
              }}
            >
              <Card contentStyle={{ padding: "20px 0 20px" }}>
                {questions.map((question) => (
                  <View key={question._id} style={{ margin: "1em" }}>
                    <View style={{ marginBottom: "0.5em" }}>
                      {question.question}
                    </View>
                    <Form.Item
                      name={question._id}
                      rules={[{ required: true, message: "请耐心作答呦~🎈" }]}
                      noStyle
                    >
                      {question.type === "likert" || question.type === "single"
                        ? geneOptions(Radio, question)
                        : question.type === "accumulate"
                        ? geneOptions(Checkbox, question)
                        : null}
                    </Form.Item>
                  </View>
                ))}
              </Card>
              <View style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <Button
                  type="primary"
                  look="secondary"
                  shape="square"
                  disabled={curDimension === 0}
                  onTap={() => setDimension(curDimension - 1)}
                  style={{
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                  }}
                >
                  上一题
                </Button>
                <Button
                  type="primary"
                  shape="square"
                  loading={isPosting}
                  loadingText="提交中~"
                  style={{
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                  }}
                  nativeType="submit"
                  // onTap={() => handleFinish(1, curDimension)}
                >
                  {curDimension === totalDimensions - 1 ? "提交" : "下一题"}
                </Button>
              </View>
            </View>
          </Form>
        )}
      </View>
    </View>
  ) : (
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

const Progress = React.memo(({ percent }: { percent: number }) => {
  return (
    <View
      style={{
        height: "4px",
        width: `${percent}%`,
        position: "relative",
        borderRadius: "200rpx",
        backgroundColor: "#1890ff",
        transition: "all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s",
      }}
    ></View>
  );
});

const geneOptions = (
  Comp: typeof Radio | typeof Checkbox,
  question: QuestionType
) => {
  return (
    <Comp.Group direction="column">
      {question.options.map((option, index) => (
        <Radio
          key={question._id + index}
          style={{ marginBottom: "0.2em", padding: ".3em 0" }}
          value={index}
        >
          {option}
        </Radio>
      ))}
    </Comp.Group>
  );
};

const getStars = (score: number) => {
  if (score < 80) return 3;
  if (score < 90) return 4;
  if (score <= 100) return 5;
  return 2; // unreachable
};

export default Question;
