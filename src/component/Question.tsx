import React, { useRef, useState } from "react";
import { View } from "remax/wechat";
import { useQuery } from "react-query";
import { Button, Skeleton } from "annar";
import QuestionOption from "./QuestionOption";
import { fetchQuestions } from "../api";

const Question = () => {
  const [curQuestionIndex, setCurQuestionIndex] = useState(0);

  const answers = useRef([]);

  const { queryKey, queryFn } = fetchQuestions();
  const { data, isLoading, isSuccess, isError, error } = useQuery(
    queryKey,
    queryFn,
    {
      onSuccess: (res) => {
        console.log("success");
        console.log(res);
      },
      onError: (err: any) => {
        console.log("error");
        console.log(err.errMsg);
      },
      retry: 0,
    }
  );

  const submit = () => {};

  const questions = isSuccess ? data.data.results : [];
  const totalQuestions = questions.length;

  const questionOptions = isSuccess
    ? questions[curQuestionIndex].incorrect_answers
    : [];
  const numQuestionOptions = questionOptions.length;
  const selectedOptionIndex = Math.floor(Math.random() * numQuestionOptions);

  return (
    <>
      <Progress percent={(curQuestionIndex * 100) / totalQuestions} />
      <Skeleton
        paragraph={{
          rows: numQuestionOptions,
          width: Array(numQuestionOptions)
            .fill(0)
            .map(() => `${40 + Math.floor(Math.random() * 60)}%`),
        }}
        fade
        repetitions={3}
        loading={isLoading}
      >
        <View
          style={{
            height: "calc(100vh - 4px - 1em)",
            display: "grid",
            gap: "40px",
            gridTemplateRows: "auto 1fr auto",
            color: "white",
          }}
        >
          {isSuccess ? (
            <View style={{ padding: "0 20px" }}>
              {questions[curQuestionIndex].question}
            </View>
          ) : null}
          <View
            style={{
              display: "grid",
              gap: "1em",
              alignContent: "start",
              padding: "0 20px",
            }}
          >
            {questionOptions.map((item, index) => (
              <QuestionOption
                key={item}
                label={String.fromCharCode(65 + index)}
                content={item}
                onTap={() => {
                  answers.current[curQuestionIndex] = index;
                  setTimeout(() => {
                    if (curQuestionIndex < totalQuestions - 1)
                      setCurQuestionIndex((pre) => pre + 1);
                  }, 300);
                }}
                selected={
                  answers.current[curQuestionIndex] &&
                  answers.current[curQuestionIndex] === index
                }
              />
            ))}
          </View>
          <View style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <Button
              type="primary"
              look="secondary"
              shape="square"
              disabled={curQuestionIndex === 0}
              onTap={() => setCurQuestionIndex(curQuestionIndex - 1)}
              style={{
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
              }}
            >
              上一题
            </Button>
            {curQuestionIndex === totalQuestions - 1 ? (
              <Button
                type="primary"
                shape="square"
                onTap={submit}
                loading={isLoading}
                loadingText="提交中~"
                style={{
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                }}
              >
                提交
              </Button>
            ) : (
              <Button
                type="primary"
                shape="square"
                style={{
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                }}
                onTap={() => setCurQuestionIndex(curQuestionIndex + 1)}
              >
                下一题
              </Button>
            )}
          </View>
        </View>
      </Skeleton>
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

export default Question;
