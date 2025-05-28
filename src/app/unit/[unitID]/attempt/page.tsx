"use client";
import * as React from "react";
import { useQuestions } from "@/hooks/useCourses";
import { QuestionEntity } from "@/domain/question.entity";
import { IoMdReturnLeft } from "react-icons/io";
import { CreateQuesBtn, DeleteQuesBtn } from "@/components/common/buttons/QuesBtn";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { RightUnitBar } from "@/components/common/RightUnitBar";

export default function Page({ params }: { params: Promise<{ unitID: string }> }) {
  const [unitID, setUnitId] = React.useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const fetchUnitId = async () => {
      const { unitID } = await params;
      setUnitId(unitID);
    };

    fetchUnitId();
  }, [params]);

  const { data: questionContents, isLoading, error } = useQuestions(unitID as string);
  const { data: userInfo } = useUser();

  const questionContentElements = Array.isArray(questionContents) ? questionContents?.map((questionContent: QuestionEntity) => (
    <div key={questionContent.questionID} className="flex flex-col p-2 md:p-10 border border-solid border-black border-opacity-30 rounded-lg shadow-md">
      <div className="flex justify-end">
        {userInfo?.role === "COLLAB" &&
          <DeleteQuesBtn questionID={questionContent.questionID}/>
        }
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="font-bold">Question {questionContent.numericalOrder}: {questionContent.content} </h1>
        </div>

        {Object.entries({ 
          A: questionContent.answerA, 
          B: questionContent.answerB, 
          C: questionContent.answerC, 
          D: questionContent.answerD 
        }).map(([key, value]) => (
            <div className="flex gap-3 ml-2 md:ml-5 items-center text-gray-500" key={key}>
              <div className={`flex justify-center items-center rounded-full w-8 h-8
                 ${questionContent.correctAnswer === key
                 ? "bg-green-500 text-white" : "border border-solid border-gray-500"}`}>
                {key}                
              </div>
              <p className={`${questionContent.correctAnswer === key
                 ? "text-green-500 font-semibold" : ""}`}>{value}</p>
            </div>
          ))}

        <div>
          <h1 className="font-bold text-green-600">Explain: <span className="font-normal max-md:max-w-full">{questionContent.explanation}</span></h1>
        </div>
      </div>
    </div>
  )) : null;

  const handleClick = () => {
    router.push("/unit/" + unitID + "/attempt");
  }
  return (
    <main className="flex flex-col">
      <div className="flex justify-center md:justify-end items-center bg-blue-200 p-2 gap-5">
        <div className="relative inline-block w-11 h-5">
          <input 
            id="switch-component-desc" 
            type="checkbox" 
            className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300" 
            onClick={handleClick} 
          />
          <label 
            htmlFor="switch-component-desc" 
            className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
          </label>
        </div>
        <label htmlFor="switch-component-desc" className="text-sm cursor-pointer">
          <div>
            <p className="font-medium font-semibold">
              Edit Mode
            </p>
            <p className="text-slate-500">
              You&apos;ll be able to edit your own course.
            </p>
          </div>
        </label>
      </div>   

      <div className="flex gap-10 p-1 md:pt-0 md:p-10">
        <div className="flex flex-col pt-6 md:p-10 gap-6 max-h-[100vh] overflow-y-auto rounded-lg border border-solid border-black border-opacity-20 bg-white w-9/12 max-md:w-full transition-all ease-in-out duration-300">

          <div className="flex justify-center items-center">
            <h1 className="text-2xl md:text-5xl font-semibold">Unit Test Overview</h1>
          </div>
          {userInfo?.role === "COLLAB" &&
            <div className="flex justify-end">
              <div>
                <CreateQuesBtn unitID={unitID as string}/>
              </div>
            </div>
          }
          <div className="pb-20">
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
                <div className="question-content flex flex-col gap-5">
                  {questionContentElements}
                </div>
              )
            }
          </div>
        </div>
        
        <div className="w-3/12 hidden md:block">
          <RightUnitBar questionContents={questionContents} />
        </div>
      </div>
    </main>
  );
}
