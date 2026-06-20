import React from "react";
import { useNavigate } from "react-router";
import Box from "../../components/box";
import Button from "../../components/button";


const Home = () => {
  const navigate = useNavigate();
  const Experience = () => [
    {
      title: "PT Indivara Group",
      desc: "Frontend Developer yang mengerjakan 3 Aplikasi Wealth Management System",
    },
    {
      title: "PT Suka Group",
      desc: "Backend Developer yang mengerjakan 3 Aplikasi Distribution Management System",
    },
  ];

  const movePage = (url: string) => {
    navigate(url);
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        {Experience().map((el, index) => {
          return <Box key={index} title={el.title} desc={el.desc} index={index} />;
        })}
      </div>
      <div className="flex flex-col">
        <Button
          onClick={() => movePage("/cv-page")}
          content="Move to CV Page"
        />
        <Button
          onClick={() => movePage("/todo")}
          content="Move to Todo Page"
        />
        <Button
          onClick={() => movePage("/movie-page")}
          content="Move to Movies Page"
        />
      </div>
    </>
  );
};

export default Home;
