"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useModal } from "@/context/ModalContext";
import Link from "next/link";
import { useTest } from "@/context/TestContext";
import { useUserTest } from "@/hooks/querys/useCourses";
import { useUser } from "@/hooks/querys/useUser";
import { SubmissionStatusEntity } from "@/type/test.entity";
import { useRouter } from "next/navigation";
import { createSubmission, forceEndAndCreate, NotEnrolledError, OngoingSubmissionError } from "@/services/course/test";
import { TestActionDropdown } from "@/components/common/buttons/UnitBtn";
import { formatDateTime } from "@/lib/dateUtils";
import Pagination from "@/components/common/pagination";


const attemptLabels: Record<string, string> = {
  status: "Status",
  totalScore: "Total Score",
  numRightAns: "Correct Answers",
  timeTaken: "Time Taken",
  start: "Start",
  end: "End",
};

const AttemptCard = ({ sub, testID }: { sub: SubmissionStatusEntity; testID: string }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "ongoing":
        return "text-yellow-600";
      case "failed":
        return "text-red-600";
      case "submitted":
        return "text-blue-600";
      case "graded":
        return "text-green-600";
      default:
        return "text-black";
    }
  };
  const endDate = sub.submittedAt != null ? formatDateTime(sub.submittedAt) : "Waiting...";

  const rows = [
    {
      key: "status",
      value: (
        <span className={`font-bold ${getStatusColor(sub.status)}`}>
          {sub.status}
        </span>
      ),
    },
    {
      key: "totalScore",
      value: (
        <>
          <span className="font-bold text-green-700">{sub.totalScore.toFixed(2)}</span>
          {" "}out of 100
        </>
      ),
    },
    { key: "numRightAns", value: <span className="text-black">{sub.numRightAns}</span> },
    { key: "timeTaken", value: <span className="text-black">{sub.timeTaken != null ? `${sub.timeTaken.toFixed(1)} min` : '-'}</span> },
    { key: "start", value: <span className="text-black">{formatDateTime(sub.createdAt)}</span> },
    { key: "end", value: <span className="text-gray-500">{endDate}</span> },
  ];

  return (
    <div className="min-w-0 flex-1 bg-gray-100 rounded-lg shadow-lg shadow p-4">
      <div className="text-lg font-semibold text-blue-700 mb-2">Attempt {sub.numericalOrder}</div>
      <table className="w-full text-sm mb-2">
        <tbody>
          {rows.map(row => (
            <tr key={row.key}>
              <td className="font-bold w-1/3">{attemptLabels[row.key]}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={`/test/${testID}/submission/${sub.submissionID}`} className="text-blue-600 hover:underline text-sm">Review</Link>
    </div>
  );
};

const CARDS_PER_ROW = 4;
const ROWS_PER_PAGE = 2;
const CARDS_PER_PAGE = CARDS_PER_ROW * ROWS_PER_PAGE;

export default function TestPage() {
  const { testID, setSubmissionID, setTimingFromCreate } = useTest();
  const router = useRouter();
  const { data: userInfo } = useUser();
  const { openModal, closeModal } = useModal();
  const { data: userTest, isLoading, error } = useUserTest(testID as string);
  const [attemptPage, setAttemptPage] = useState(1);

  const submissions = userTest?.submissions ?? [];
  const totalPages = Math.max(1, Math.ceil(submissions.length / CARDS_PER_PAGE));
  const paginatedSubmissions = useMemo(() => {
    const start = (attemptPage - 1) * CARDS_PER_PAGE;
    return submissions.slice(start, start + CARDS_PER_PAGE);
  }, [submissions, attemptPage]);

  useEffect(() => {
    setAttemptPage(1);
  }, [testID]);

  useEffect(() => {
    if (error instanceof NotEnrolledError && error.courseID) {
      openModal("NotEnrolledModal", {
        redirectTo: `/course/${error.courseID}/overview`,
      });
    }
  }, [error, openModal]);

  useEffect(() => {
    setTimingFromCreate(null);
  }, [setTimingFromCreate]);

  if (!testID) return <div>Loading test ID...</div>;
  if (error instanceof NotEnrolledError) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-gray-500">Please confirm the message above.</p>
      </div>
    );
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const formatTimeUnit = (minutes?: number) => {
    if (!minutes || minutes <= 0) return "0 seconds";
    const units = [
      { label: "month", value: 43200 },
      { label: "day", value: 1440 },
      { label: "hour", value: 60 },
      { label: "minute", value: 1 },
      { label: "second", value: 1 / 60 },
    ];
    let remaining = minutes;
    for (const unit of units) {
      if (remaining >= unit.value) {
        const val = remaining / unit.value;
        const rounded = Math.floor(val);
        return `${rounded} ${unit.label}${rounded > 1 ? "s" : ""}`;
      }
    }
    const seconds = Math.round(remaining * 60);
    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  };
  const testDuration = formatTimeUnit(userTest?.duration);

  const goToAttempt = (response: { submissionID: string; startedAt?: string; duration?: number; serverTime?: number }) => {
    setSubmissionID(response.submissionID);
    if (response.startedAt && response.duration != null && response.serverTime != null) {
      setTimingFromCreate({
        startedAt: response.startedAt,
        duration: response.duration,
        serverTime: response.serverTime,
      });
    } else {
      setTimingFromCreate(null);
    }
    router.push(`/test/${testID}/attempt`);
  };

  const handleContinue = () => {
    setSubmissionID(userTest?.lastSubmissionID as string);
    setTimingFromCreate(null);
    router.push(`/test/${testID}/attempt`);
  };

  const handleStartNew = async () => {
    if (userTest?.status !== "allow" && userTest?.status !== "continue") return;
    if (userTest?.status === "allow" && !confirm("Are you sure you want to take this test?")) return;
    try {
      const response = await createSubmission(userTest?.userTestID as string);
      closeModal();
      goToAttempt(response);
    } catch (e) {
      if ((e as OngoingSubmissionError)?.code === "ONGOING_SUBMISSION") {
        openModal("OngoingSubmissionModal", {
          onConfirm: async () => {
            try {
              const response = await forceEndAndCreate(userTest?.userTestID as string);
              closeModal();
              goToAttempt(response);
            } catch (err) {
              openModal("OngoingSubmissionModal", {
                errorMessage: err instanceof Error ? err.message : "Đã xảy ra lỗi. Vui lòng thử lại.",
                onClose: closeModal,
              });
            }
          },
          onClose: closeModal,
        });
      } else {
        openModal("OngoingSubmissionModal", {
          errorMessage: e instanceof Error ? e.message : "Đã xảy ra lỗi. Vui lòng thử lại.",
          onClose: closeModal,
        });
      }
    }
  };

  return (
    <div className="bg-white flex justify-center min-h-screen p-2 pt-6 md:p-6">
      <div className="w-full md:w-[60rem]">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-300 pb-4">
          <div className="bg-pink-100 text-pink-600 rounded-full p-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path d="M8 17l-5-5 5-5M16 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="w-5/6">
            <h1 className="text-xl md:text-3xl font-bold text-blue-800">
              Test {userTest?.numericalOrder}: <span className="text-blue-600">{userTest?.testName}</span>
            </h1>
          </div>
          {userInfo?.role === "COLLAB" && (
            <div className="w-1/6">
              <TestActionDropdown testID={testID as string} />
            </div>
          )}
        </div>
        {["allow", "continue", "closed", "forbidden"].includes(userTest?.status ?? "") && (
          <div className="flex gap-3 mb-4">
            {userTest?.status === "continue" && (
              <>
                <button
                  onClick={handleContinue}
                  className="font-semibold px-6 py-2 rounded text-white bg-yellow-500 hover:bg-yellow-600"
                >
                  Continue
                </button>
                <button
                  onClick={handleStartNew}
                  className="font-semibold px-6 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
                >
                  Start new attempt
                </button>
              </>
            )}
            {userTest?.status === "allow" && (
              <button
                onClick={handleStartNew}
                className="font-semibold px-6 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
              >
                Attempt
              </button>
            )}
            {["closed", "forbidden"].includes(userTest?.status ?? "") && (
              <button
                disabled
                className={`font-semibold px-6 py-2 rounded text-white ${
                  userTest?.status === "closed" ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 cursor-not-allowed"
                }`}
              >
                {userTest?.status === "closed" ? "Closed" : "Forbidden"}
              </button>
            )}
          </div>
        )}
        <div className="text-gray-600 mb-2">Test duration: {testDuration}</div>
        <div className="text-gray-600 mb-2">Number of questions: {userTest?.numQuests}</div>
        <div className="text-gray-600 mb-8">Scoring method: Last attempt</div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-semibold text-blue-400 mb-4">
            Last attempt score: <span className="text-blue-700">{(userTest?.totalScore ?? 0).toFixed(2)} / 100.00</span>
          </div>
          <div className="text-xl font-semibold text-blue-500 mb-4">Overview of your previous attempts</div>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedSubmissions.map(sub => (
              <AttemptCard key={sub.submissionID} sub={sub} testID={testID as string} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={attemptPage}
              totalPages={totalPages}
              onPageChange={setAttemptPage}
            />
          )}
        </div>

      </div>
    </div>
  );
}
