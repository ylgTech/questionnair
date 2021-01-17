import React, { useState } from "react";
import { View } from "remax/wechat";
import { Button } from "annar";

const QuestionOption = React.memo(
  ({
    label,
    content,
    selected,
    onTap,
  }: {
    label: string;
    content: string;
    selected: boolean;
    onTap: () => void;
  }) => {
    const [tap, setTap] = useState(false);

    return (
      <View
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "0.5em",
          alignItems: "center",
        }}
        onTap={() => {
          onTap();
          setTap(true);
        }}
      >
        <Button
          type={tap || selected ? "primary" : "default"}
          shape="circle"
          plain
          ghost
        >
          {label}
        </Button>
        <View>{content}</View>
      </View>
    );
  }
);

export default QuestionOption;
