import React, { useState } from "react";
import { cloud } from "remax/wechat";
import { useQuery } from "react-query";
import { Button } from "annar";

const db = cloud.database({ env: "release-b83caf" });

const Question = () => {
  const totalQuestions = 5;
  const [questionNum, setQuestionNum] = useState(5);

  const { status, data, isLoading, isSuccess, isError, error } = useQuery(
    "test",
    () => db.collection("article").doc("a9bfcffc5ebcf83900957b9e3a74dc8").get(),
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

  return (
    <>
      <div>Question {questionNum}</div>
      {isSuccess ? <div>{data.data.title}</div> : null}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <Button
          type="primary"
          shape="square"
          disabled={questionNum === 0}
          onTap={() => setQuestionNum(questionNum - 1)}
          style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
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
    </>
  );
};

export default Question;
