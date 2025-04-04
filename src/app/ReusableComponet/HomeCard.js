import React from "react";

export const HomeCard = ({ iconPath, tittle, paragraph, button, width }) => {
  return (
    <div
      className={`flex flex-col rounded-lg bg-[#233dc033] backdrop-blur-xl mx-3 my-2 py-4 px-4 w-${width} max-md:w-full`}
    >
      <div className="w-full text-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 mr-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
      </div>
      <h3 className="text-2xl font-medium my-4 text-left">{tittle}</h3>
      <p className="my-5 text-[17px] font-medium text-left">{paragraph}</p>
      <button className="py-2 px-4 bg-[#284CFF] text-white cursor-pointer rounded-lg">
        {button}
      </button>
    </div>
  );
};
