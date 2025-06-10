"use client";

import { useState } from "react";
import { useQuestions } from "@/hooks/useCourses";
import { useUser } from "@/hooks/useUser";
import { RightUnitBar } from "@/components/common/RightUnitBar";
import { CreateQuesBtn, SubmitTestBtn } from "@/components/common/buttons/QuesBtn";
import { QuestionEntity } from "@/domain/question.entity";
import QuestionItem from "@/components/common/QuestionItem";
import { motion, AnimatePresence } from "framer-motion";
import GradientButton from "@/components/common/buttons/GradientButton";

interface UnitTestProps {
  unitID: string;
  mode: "attempt" | "review";
}

const UnitTest = ({ unitID, mode }: UnitTestProps) => {
  const { data: questionContents, isLoading, error, refetch } = useQuestions(unitID);
  const { data: userInfo } = useUser();
  const [newQuestionIds, setNewQuestionIds] = useState<string[]>([]);
  const [anss, setAnss] = useState<Record<string, string>>({});

  if (isLoading) return <div>Loading questions...</div>;
  if (error) return <div>Error loading questions: {error.message}</div>;

  const handleQuestionCreated = () => {
    if (Array.isArray(questionContents) && questionContents.length > 0) {
      const newQuestionId = questionContents[questionContents.length - 1].questionID;
      setNewQuestionIds((prev) => [...prev, newQuestionId]);
      setTimeout(() => {
        setNewQuestionIds((prev) => prev.filter((id) => id !== newQuestionId));
      }, 1000);
    }
  };

  const handleAnsChange = (questionID: string, selected: string) => {
    setAnss(prev => ({ ...prev, [questionID]: selected }));
  };
  const questionContentElements = Array.isArray(questionContents) ? (
    <AnimatePresence>
      {questionContents.map((questionContent: QuestionEntity) => (
        <motion.div
          key={questionContent.questionID}
          initial={newQuestionIds.includes(questionContent.questionID) ? { opacity: 0, y: 20 } : false}
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
            // selectedAns={anss[questionContent.questionID]}
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
              <CreateQuesBtn unitID={unitID} onQuestionCreated={handleQuestionCreated}  refetchQuestions={refetch} />
            </div>
          )}
          <div>
            {Array.isArray(questionContents) && questionContents.length === 0 ? (
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
            )}
          </div>
          <div className="flex justify-center items-center mt-10">
            <SubmitTestBtn testID={unitID} anss={anss}/>
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