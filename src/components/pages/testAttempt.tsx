"use client";

import { useState } from "react";
import { useQuestions } from "@/hooks/querys/useCourses";
import { useUser } from "@/hooks/querys/useUser";
import { RightUnitBar } from "@/components/common/RightUnitBar";
import { CreateQuesBtn, SubmitTestBtn } from "@/components/common/buttons/QuesBtn";
import { QuestionEntity } from "@/type/question.entity";
import QuestionItem from "@/components/common/QuestionItem";
import { motion, AnimatePresence } from "framer-motion";

interface TestPageProps {
  testID: string;
  submissionID: string;
  mode: "attempt" | "review";
}

const TestPage = ({ testID, submissionID, mode }: TestPageProps) => {
  const { data: questionContents, isLoading, error, refetch } = useQuestions(testID);
  const { data: userInfo } = useUser();
  const [newQuestionIDs, setNewQuestionIDs] = useState<string[]>([]);
  const [submission, setSubmission] = useState<Record<string, string>>({});

  if (isLoading) return <div>Loading questions...</div>;
  if (error) return <div>Error loading questions: {error.message}</div>;

  const handleQuestionCreated = () => {
    if (Array.isArray(questionContents) && questionContents.length > 0) {
      const newQuestionID = questionContents[questionContents.length - 1].questionID;
      setNewQuestionIDs((prev) => [...prev, newQuestionID]);
      setTimeout(() => {
        setNewQuestionIDs((prev) => prev.filter((id) => id !== newQuestionID));
      }, 1000);
    }
  };

  const handleAnsChange = (questionID: string, selected: string) => {
    setSubmission(prev => ({ ...prev, [questionID]: selected }));
  };
  const questionContentElements = Array.isArray(questionContents) ? (
    <AnimatePresence>
      {questionContents.map((questionContent: QuestionEntity) => (
        <motion.div
          key={questionContent.questionID}
          initial={newQuestionIDs.includes(questionContent.questionID) ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <QuestionItem
            question={questionContent}
            mode={mode}
            isCollab={userInfo?.role === "COLLAB"}
            refetchQuestions={refetch}
            onAnsChange={handleAnsChange}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  ) : null;

  return (
    <main>
      <div className="flex gap-10 p-1 md:pt-0 md:p-10">
        <div className="flex flex-col pt-6 md:p-10 gap-6 max-h-[100vh] overflow-y-auto rounded-lg border border-solid border-black border-opacity-20 bg-white w-9/12 max-md:w-full transition-all ease-in-out duration-300">
          <div className="flex justify-center items-center">
            <h1 className="text-2xl md:text-5xl font-semibold">
              {mode === "attempt" ? "Unit Test Attempt" : "Unit Test Overview"}
            </h1>
          </div>
          {userInfo?.role === "COLLAB" && mode === "review" && (
            <div className="flex justify-end">
              <CreateQuesBtn testID={testID} onQuestionCreated={handleQuestionCreated} refetchQuestions={refetch} />
            </div>
          )}
          <div>
            {Array.isArray(questionContents) && questionContents.length === 0 ? (
                <div className="w-full flex flex-col justify-center items-center">
                  <p className="text-xl text-gray-400 font-bold">Oh no, it's empty here!</p>
                  <img
                  className="max-w-[12vh] max-h-[12vh] md:max-w-[24vh] md:max-h-[24vh]"
                  src="https://res.cloudinary.com/dv2izp0a3/image/upload/v1750227722/empty-box_xv3l4d.png"
                  alt="no test data"
                  />
                </div>
            ) : (
              <div className="question-content flex flex-col gap-5">
                {questionContentElements}
              </div>
            )}
          </div>
          <div className="flex justify-center items-center mt-10">
            <SubmitTestBtn testID={testID} submissionID={submissionID} submission={submission}/>
          </div>
        </div>
        <div className="w-3/12 hidden md:block">
          <RightUnitBar questionContents={questionContents} />
        </div>
      </div>
    </main>
  );
};

export default TestPage;