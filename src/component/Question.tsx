import React, { useState } from "react";
import { View } from "remax/wechat";
import { Button, Card, Checkbox, Form, Radio, Skeleton } from "annar";
import { DIMENSION, dimensionMap } from "../data";
import { useQuery } from "react-query";
import { fetchDimensionQuestions } from "../api";
import { QuestionType } from "../interfaces";
import Para from "./Para";

const handleFinish = (values) => {
  console.log("answers: ", values);
  // mutate(values);
};

const Question = () => {
  const [curDimension, setDimension] = useState(0);
  const totalDimensions = DIMENSION.length;

  const submit = () => {};

  const dimension = DIMENSION[curDimension];
  const { data, isLoading, isSuccess } = useQuery(
    fetchDimensionQuestions(dimension)
  );
  const questions: QuestionType[] = isSuccess ? data.list : [];
  const desc = dimensionMap[dimension];

  const isPosting = false;

  return (
    <>
      <Progress percent={(curDimension * 100) / totalDimensions} />
      <View
        style={{
          height: "calc(100vh - 4px - 1em)",
          display: "grid",
          gap: "40px",
          gridTemplateRows: "1fr auto",
        }}
      >
        <View>
          <Para content={desc.intro} />
          <Para content={desc.remark} />
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
              //   loading={isLoading}
            />
          ) : null}
          <Card contentStyle={{ padding: "20px 0 20px" }}>
            <Form onFinish={handleFinish}>
              {questions.map((question) => (
                <View key={question._id} style={{ margin: "1em" }}>
                  <View style={{ marginBottom: "0.5em" }}>
                    {question.question}
                  </View>
                  <Form.Item
                    name={question._id}
                    rules={[{ required: true, message: "请选择" }]}
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
            </Form>
          </Card>
        </View>
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
            onTap={() => setDimension(curDimension + 1)}
            loading={isPosting}
            loadingText="提交中~"
            style={{
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
            }}
          >
            {curDimension === totalDimensions - 1 ? "提交" : "下一题"}
          </Button>
        </View>
      </View>
    </>
  );
};

const Progress = React.memo(({ percent }: { percent: number }) => {
  return (
    <View
      style={{
        height: "4px",
        width: `${percent}%`,
        marginBottom: "1em",
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
          style={{ marginBottom: "0.5em" }}
          value={index}
        >
          {option}
        </Radio>
      ))}
    </Comp.Group>
  );
};

export default Question;
