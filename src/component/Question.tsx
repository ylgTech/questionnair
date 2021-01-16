import React, { useState } from "react";
import { useQuery } from "react-query";
import { Button, Skeleton } from "annar";
import QuestionOption from "./QuestionOption";
import { fetchQuestions } from "../api";

const Question = () => {
  const totalQuestions = 20;
  const [questionNum, setQuestionNum] = useState(1);

  const { queryKey, queryFn } = fetchQuestions();
  const { status, data, isLoading, isSuccess, isError, error } = useQuery(
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

  const numQuestionOptions = Math.floor(Math.random() * 3) + 3;
  const selectedOptionIndex = Math.floor(Math.random() * numQuestionOptions);
  const questionOptions = Array(numQuestionOptions)
    .fill(0)
    .map((v, i) => ({
      id: "question" + i,
      label: String.fromCharCode(65 + i),
      selected: i === selectedOptionIndex,
      content: "选项 " + (i + 1),
    }));

  return (
    <>
      <Progress percent={(questionNum * 100) / totalQuestions} />
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
        <div
          style={{
            height: "calc(100vh - 4px - 1em)",
            display: "grid",
            gap: "40px",
            gridTemplateRows: "auto 1fr auto",
            color: "white",
          }}
        >
          {isSuccess ? (
            <div style={{ padding: "0 20px" }}>{data.data.title}</div>
          ) : null}
          <div
            style={{
              display: "grid",
              gap: "1em",
              alignContent: "start",
              padding: "0 20px",
            }}
          >
            {questionOptions.map(({ id, ...props }) => (
              <QuestionOption key={id} {...props} />
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <Button
              type="primary"
              look="secondary"
              shape="square"
              disabled={questionNum === 0}
              onTap={() => setQuestionNum(questionNum - 1)}
              style={{
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
              }}
            >
              上一题
            </Button>
            {questionNum === totalQuestions ? (
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
                onTap={() => setQuestionNum(questionNum + 1)}
              >
                下一题
              </Button>
            )}
          </div>
        </div>
      </Skeleton>
    </>
  );
};

const Progress = ({ percent }: { percent: number }) => {
  return (
    <div
      style={{
        height: "4px",
        width: `${percent}%`,
        marginBottom: "1em",
        position: "relative",
        borderRadius: "200rpx",
        backgroundColor: "#1890ff",
        transition: "all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s",
      }}
    ></div>
  );
};

export default Question;
