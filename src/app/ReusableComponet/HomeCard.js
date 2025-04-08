import React from "react";

export const HomeCard = ({ iconPath, tittle, paragraph, button }) => {
  return (
    <div className="flex flex-col rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 mx-3 my-2 p-6 w-full md:w-[22%] min-w-[250px] border border-gray-100 dark:border-gray-700">
      <div className="w-full text-left mb-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg inline-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-blue-600 dark:text-blue-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
        {tittle}
      </h3>
      <p className="mb-5 text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
        {paragraph}
      </p>
      <button className="mt-auto w-fit py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
        {button}
      </button>
    </div>
  );
};
