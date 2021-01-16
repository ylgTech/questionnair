import React from "react";
import { Button } from "annar";

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
