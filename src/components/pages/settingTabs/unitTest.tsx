
import { useQuestions } from "@/hooks/useCourses";
import { useUser } from "@/hooks/useUser";
import { RightUnitBar } from "@/components/common/RightUnitBar";
import { CreateQuesBtn, DeleteQuesBtn } from "@/components/common/buttons/QuesBtn";
import { QuestionEntity } from "@/domain/question.entity";

const UnitTest = ({unitID} : {unitID : string}) => {
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
    
    return (
        <main>
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
};

export default UnitTest;