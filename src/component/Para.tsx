import React from "react";
import { View } from "remax/wechat";

const Para = ({ content, style }: { content: string; style? }) => (
  <View style={{ textIndent: "2em", margin: "0.5em 0", ...style }}>
    {content}
  </View>
);

export default Para;
