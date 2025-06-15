// components/common/QuestionItem.tsx
import { useState } from "react";
import { QuestionEntity } from "@/type/question.entity";
import { DeleteQuesBtn } from "@/components/common/buttons/QuesBtn";

interface QuestionItemProps {
  question: QuestionEntity;
  mode: "attempt" | "review";
  isCollab: boolean;
  refetchQuestions?: () => void;
  onAnsChange?: (questionID: string, ans: string) => void;
}

const QuestionItem = ({ question, mode, isCollab, refetchQuestions, onAnsChange }: QuestionItemProps) => {
  const [selectedAns, setSelectedAns] = useState<string | null>(null); // For attempt mode

  const handleAnsSelect = (key:string) => {
    onAnsChange?.(question.questionID, key)
    setSelectedAns(key);
  };

  return (
    <div className="flex flex-col p-2 md:p-10 border border-solid border-black border-opacity-30 rounded-lg shadow-md">
      {isCollab && mode === "review" && (
        <div className="flex justify-end">
          <DeleteQuesBtn questionID={question.questionID} unitID={question.unitID} refetchQuestions={refetchQuestions}/>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="font-bold">
            Question {question.numericalOrder}: {question.content}
          </h1>
        </div>

        {Object.entries({
          A: question.ansA,
          B: question.ansB,
          C: question.ansC,
          D: question.ansD,
        }).map(([key, value]) => (
          <div
            className="flex gap-3 ml-2 md:ml-5 items-center text-gray-500"
            key={key}
          >
            {mode === "attempt" ? (
              <>
                <input
                  type="radio"
                  name={`question-${question.questionID}`}
                  value={key}
                  checked={selectedAns === key}
                  onChange={() => handleAnsSelect(key)}
                  className="w-5 h-5"
                />
                <p>{value}</p>
              </>
            ) : (
              <>
                <div
                  className={`flex justify-center items-center rounded-full w-8 h-8 ${
                    question.correctAns === key
                      ? "bg-green-500 text-white"
                      : "border border-solid border-gray-500"
                  }`}
                >
                  {key}
                </div>
                <p
                  className={
                    question.correctAns === key
                      ? "text-green-500 font-semibold"
                      : ""
                  }
                >
                  {value}
                </p>
              </>
            )}
          </div>
        ))}

        {mode === "review" && (
          <div>
            <h1 className="font-bold text-green-600">
              Explain: <span className="font-normal max-md:max-w-full">{question.explanation}</span>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionItem;