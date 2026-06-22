import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const Box = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
  index?: number;
}) => {
  return (
    <Card
      className="w-full max-w-sm bg-[#0B0B0B] border border-white/10 hover:border-[#CB2957]/50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(203,41,87,0.15)] overflow-hidden select-none border-l-4 border-l-[#CB2957] ring-0"
    >
      <CardHeader className="p-6">
        <CardTitle className="font-sans font-extrabold text-[#EEEEEE] mb-2 text-lg tracking-wide text-left">{title}</CardTitle>
        <CardDescription className="font-sans text-neutral-400 text-sm leading-relaxed text-left">
          {desc}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Box;

