"use client";
import * as React from "react";
import { useQuestions } from "@/hooks/useCourses";
import { QuestionEntity } from "@/domain/question.entity";
import { IoMdReturnLeft } from "react-icons/io";
import { CreateQuesBtn, DeleteQuesBtn } from "@/components/common/buttons/QuesBtn";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

export default function Page({ params }: { params: Promise<{ unitID: string }> }) {
  const [unitID, setUnitId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUnitId = async () => {
      const { unitID } = await params;
      setUnitId(unitID);
    };

    fetchUnitId();
  }, [params]);

  const { data: questionContents } = useQuestions(unitID as string);
  const { data: userInfo } = useUser();

  const questionContentElements = questionContents?.map((questionContent: QuestionEntity) => (
    <div key={questionContent.questionID} className="flex p-10 mt-5 border border-solid border-black border-opacity-30">
      <div className="w-11/12 flex flex-col gap-2">
        <div>
          <h1 className="font-bold">Question {questionContent.numericalOrder}: {questionContent.content} </h1>
        </div>

        {Object.entries({ A: questionContent.answerA, B: questionContent.answerB, C: questionContent.answerC, D: questionContent.answerD })
          .map(([key, value]) => (
            <div className="flex gap-5 ml-10 items-center" key={key}>
              <div className="flex justify-center items-center rounded-full w-8 h-8 border border-solid border-black">
                {key}
              </div>
              {value}
            </div>
          ))}

        <div>
          <h1 className="font-bold text-sky-600">Correct Answer: <span className="text-black max-md:max-w-full">{questionContent.correctAnswer}</span></h1>
          <h1 className="font-bold text-green-600">Explain: <span className="font-normal text-black max-md:max-w-full">{questionContent.explanation}</span></h1>
        </div>
      </div>
      <div className="w-1/12">
        {userInfo?.role === "COLLAB" &&
          <DeleteQuesBtn questionID={questionContent.questionID}/>
        }
      </div>
    </div>
  ));

  return (
    <main className="flex flex-col">
      <div className="pl-20 w-full h-[100vs] bg-blue-200 p-5">
        <div className="w-1/12">
          <Link href="/learner/dashboard" className="flex gap-3">
            <IoMdReturnLeft size={30} />
            Return
          </Link>
        </div>
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col mt-6 pt-6 ml-10 max-md:ml-4 gap-6 max-h-[100vh] overflow-y-auto rounded-lg border border-solid border-black border-opacity-20 bg-white w-9/12 max-md:w-full transition-all ease-in-out duration-300">

          <div className="flex justify-center items-center">
            <h1 className="text-5xl font-bold">Unit Test Overview</h1>
          </div>
          {userInfo?.role === "COLLAB" &&
            <div className="flex justify-end">
              <div className="w-1/6">
                <CreateQuesBtn unitID={unitID as string}/>
              </div>
            </div>
          }
          <div className="ml-20 mr-20 pb-20">
            {
              questionContentElements?.length === 0 ? (
                <div className="w-full">
                  <img
                    className="w-full"
                    src="https://nihotour.gov.ng/wp-content/plugins/tutor/assets/images/emptystate.svg"
                    alt="no course data"
                  />
                </div>
              ) : (
                // Hiển thị nội dung câu hỏi ở đây nếu questionContentElements không rỗng
                <div className="question-content">
                  {/* Thay thế phần này với cách bạn muốn hiển thị nội dung câu hỏi */}
                  {questionContentElements}
                </div>
              )
            }
          </div>
        </div>

        <div className="flex flex-wrap p-10 gap-10 h-screen bg-white w-3/12 max-md:w-full">
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
      </div>
    </main>
  );
}
