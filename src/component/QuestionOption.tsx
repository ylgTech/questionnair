import { Button } from "annar";
import React from "react";

const QuestionOption = ({ label, content, selected }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "0.5em",
        alignItems: "center",
      }}
    >
      <Button
        type={selected ? "primary" : "default"}
        shape="circle"
        plain
        ghost
      >
        {label}
      </Button>
      <div>{content}</div>
    </div>
  );
};

export default QuestionOption;
