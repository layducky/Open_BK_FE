import { QuestionEntity } from '@/type/question.entity';
import React from 'react';

export const RightUnitBar = ({
  questionContents,
  submission,
}: {
  questionContents: any;
  submission?: Record<string, string>;
}) => {
  return (
    <div className="flex flex-wrap p-10 gap-10 h-screen bg-white max-md:w-full">
      {questionContents && questionContents.length > 0 ? (
        questionContents.map((questionContent: QuestionEntity) => {
          const isCompleted =
            submission &&
            submission[questionContent.questionID] &&
            submission[questionContent.questionID] !== "" &&
            submission[questionContent.questionID] !== "NULL";
          return (
            <div key={questionContent.numericalOrder} className="flex">
              <div
                className={`flex justify-center items-center rounded w-10 h-10 border border-solid ${
                  isCompleted ? "border-sky-500 bg-sky-100 text-sky-700" : "border-black"
                }`}
              >
                <h1 className="font-bold">{questionContent.numericalOrder}</h1>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-xl text-gray-400 font-bold">Oh no, it's empty here!</p>
          <img
            className="max-w-[12vh] max-h-[12vh] md:max-w-[24vh] md:max-h-[24vh]"
            src="https://res.cloudinary.com/dv2izp0a3/image/upload/v1750227722/empty-box_xv3l4d.png"
            alt="no course data"
          />
        </div>
      )}
    </div>
  )
}