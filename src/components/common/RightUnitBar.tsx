import { QuestionEntity } from '@/domain/question.entity';
import React from 'react';

export const RightUnitBar = ({questionContents} : {questionContents: any}) => {
  return(
    <div className="flex flex-wrap p-10 gap-10 h-screen bg-white max-md:w-full">
      {questionContents && questionContents.length > 0 ? (
        questionContents.map((questionContent: QuestionEntity) => (
          <div key={questionContent.numericalOrder} className="flex">
            <div className="flex justify-center items-center rounded w-10 h-10 border border-solid border-black">
              <h1 className="font-bold">{questionContent.numericalOrder}</h1>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full">
          <img
            className="w-full"
            src="https://nihotour.gov.ng/wp-content/plugins/tutor/assets/images/emptystate.svg"
            alt="no course data"
          />
        </div>
      )}
    </div>
  )
}