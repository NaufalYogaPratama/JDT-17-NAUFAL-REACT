import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const Box = ({
  title,
  desc,
  index,
}: {
  title: string;
  desc: string;
  index: number;
}) => {
  return (
    <Card
      className={`mx-32 w-48 max-w-sm mt-8 mb-8  ${index % 2 == 0 ? "bg-slate-100" : "bg-slate-200"}`}
    >
      <CardHeader>
        <CardTitle className="font-serif italic font-bold text-black mb-2 text-xl">{title}</CardTitle>
        <CardDescription className="font-mono">
          {desc}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Box;
