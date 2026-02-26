"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useQuestions, useUserTest } from "@/hooks/querys/useCourses";
import { useUser } from "@/hooks/querys/useUser";
import { useSubmissionTiming } from "@/hooks/useSubmissionTiming";
import { RightUnitBar } from "@/components/common/RightUnitBar";
import { CreateQuesBtn, SubmitTestBtn } from "@/components/common/buttons/QuesBtn";
import { TestTimer } from "@/components/common/TestTimer";
import { QuestionEntity } from "@/type/question.entity";
import QuestionItem from "@/components/common/QuestionItem";
import { motion, AnimatePresence } from "framer-motion";
import type { SubmissionTimingData } from "@/context/TestContext";
import { getOngoingAnswers, updateSubmission, saveDraftKeepalive } from "@/services/course/test";
import { SubmissionEntity } from "@/type/submission.entity";

interface TestPageProps {
  testID: string;
  submissionID: string;
  mode: "attempt" | "review";
  timingFromCreate?: SubmissionTimingData | null;
}

const DEBOUNCE_SAVE_MS = 30000;

const TestPage = ({ testID, submissionID, mode, timingFromCreate }: TestPageProps) => {
  const { data: questionContents, isLoading, error, refetch } = useQuestions(testID);
  const { data: userInfo } = useUser();
  const { data: userTest } = useUserTest(testID);
  const [newQuestionIDs, setNewQuestionIDs] = useState<string[]>([]);
  const [submission, setSubmission] = useState<Record<string, string>>({});
  const [answersLoaded, setAnswersLoaded] = useState(false);
  const submitRef = useRef<{ submit: () => void } | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>("");
  const submissionRef = useRef(submission);
  submissionRef.current = submission;

  const timing = useSubmissionTiming(
    mode === "attempt" ? submissionID : null,
    timingFromCreate ?? undefined
  );

  const handleTimeUp = useCallback(() => {
    submitRef.current?.submit();
  }, []);

  const setSubmitRef = useCallback((ref: { submit: () => void } | null) => {
    submitRef.current = ref;
  }, []);

  const saveDraft = useCallback(() => {
    if (mode !== "attempt" || !questionContents?.length) return;
    const submissionArray = (questionContents as QuestionEntity[]).map((q) => ({
      questionID: q.questionID,
      selectedAns: submission[q.questionID] || "NULL",
    }));
    const payload: SubmissionEntity = { status: "ongoing", submission: submissionArray };
    const key = JSON.stringify(payload);
    if (key === lastSavedRef.current) return;
    lastSavedRef.current = key;
    updateSubmission(submissionID, payload).catch(() => {});
  }, [mode, submissionID, submission, questionContents]);

  useEffect(() => {
    if (mode !== "attempt" || !submissionID || !questionContents?.length) {
      setAnswersLoaded(true);
      return;
    }
    getOngoingAnswers(submissionID)
      .then(({ answers }) => {
        const init: Record<string, string> = {};
        answers.forEach((a) => {
          init[a.questionID] = a.selectedAns === "NULL" ? "" : a.selectedAns;
        });
        setSubmission(init);
      })
      .catch(() => {})
      .finally(() => setAnswersLoaded(true));
  }, [mode, submissionID, questionContents?.length]);

  useEffect(() => {
    if (mode !== "attempt" || !answersLoaded) return;
    const id = setTimeout(saveDraft, DEBOUNCE_SAVE_MS);
    saveTimeoutRef.current = id;
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [submission, answersLoaded, mode, saveDraft]);

  useEffect(() => {
    if (mode !== "attempt" || !questionContents?.length) return;
    const onBeforeUnload = () => {
      const sub = submissionRef.current;
      const arr = (questionContents as QuestionEntity[]).map((q) => ({
        questionID: q.questionID,
        selectedAns: sub[q.questionID] || "NULL",
      }));
      saveDraftKeepalive(submissionID, { status: "ongoing", submission: arr });
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") saveDraft();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [mode, submissionID, questionContents, saveDraft]);

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
            selectedAns={mode === "attempt" ? (submission[questionContent.questionID] ?? null) : undefined}
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
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl md:text-5xl font-semibold">
              {mode === "attempt" ? "Unit Test Attempt" : "Unit Test Overview"}
            </h1>
            {mode === "attempt" && timing.startedAt && Array.isArray(questionContents) && questionContents.length > 0 && (
              <TestTimer
                startedAt={timing.startedAt}
                durationMinutes={timing.duration}
                serverTimeOffset={timing.serverTimeOffset}
                onTimeUp={handleTimeUp}
              />
            )}
          </div>
          {userInfo?.role === "COLLAB" && mode === "review" && (
            <div className="flex justify-end">
              <CreateQuesBtn testID={testID} onQuestionCreated={handleQuestionCreated} refetchQuestions={refetch} />
            </div>
          )}
          <div>
            {Array.isArray(questionContents) && questionContents.length === 0 ? (
                <div className="w-full flex flex-col justify-center items-center gap-4 py-8">
                  <p className="text-xl font-semibold text-amber-800">This test is empty and not ready yet.</p>
                  <p className="text-gray-600">Please try again later.</p>
                  <img
                  className="max-w-[12vh] max-h-[12vh] md:max-w-[24vh] md:max-h-[24vh]"
                  src="https://res.cloudinary.com/dv2izp0a3/image/upload/v1750227722/empty-box_xv3l4d.png"
                  alt="no test data"
                  />
                  {mode === "attempt" && (
                    <Link
                      href={`/test/${testID}`}
                      className="mt-2 text-blue-600 hover:underline font-medium"
                    >
                      Back to test
                    </Link>
                  )}
                </div>
            ) : (
              <div className="question-content flex flex-col gap-5">
                {questionContentElements}
              </div>
            )}
          </div>
          {mode === "attempt" && Array.isArray(questionContents) && questionContents.length > 0 && (
            <div className="flex justify-center items-center mt-10">
              <SubmitTestBtn
                testID={testID}
                submissionID={submissionID}
                submission={submission}
                questionContents={questionContents as QuestionEntity[]}
                courseID={userTest?.courseID}
                onRef={setSubmitRef}
              />
            </div>
          )}
        </div>
        <div className="w-3/12 hidden md:block">
          <RightUnitBar
            questionContents={questionContents}
            submission={mode === "attempt" ? submission : undefined}
          />
        </div>
      </div>
    </main>
  );
};

export default TestPage;