"use client";
import React from "react";
import { useTest } from '@/context/TestContext';
import { useUserTest } from "@/hooks/querys/useCourses";
import { SubmissionStatusEntity } from "@/type/test.entity";
import { useRouter } from "next/navigation";
import { createSubmission, updateSubmission } from "@/services/course/test";
import { TestActionDropdown } from "@/components/common/buttons/UnitBtn";
import { formatDateTime } from "@/lib/dateUtils";


const attemptLabels: Record<string, string> = {
  status: "Status",
  totalScore: "Total Score",
  numRightAns: "Correct Answers",
  timeTaken: "Time Taken",
  start: "Start",
  end: "End",
};

const AttemptCard = ({ sub }: { sub: SubmissionStatusEntity }) => {
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
    { key: "timeTaken", value: <span className="text-black">{sub.numRightAns}</span> },
    { key: "start", value: <span className="text-black">{formatDateTime(sub.createdAt)}</span> },
    { key: "end", value: <span className="text-gray-500">{endDate}</span> },
  ];

  return (
    <div className="w-[30vh] flex-1 bg-gray-100 rounded-lg shadow-lg shadow p-4">
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
      <a href="#" className="text-blue-600 hover:underline text-sm">Review</a>
    </div>
  );
};

export default function TestPage() {
  const { testID, setSubmissionID } = useTest();
  const router = useRouter();
  if (!testID) return <div>Loading test ID...</div>;

  const { data: userTest, isLoading, error, refetch } = useUserTest(testID as string);
  if (isLoading) return <div>Loading questions...</div>;
  if (error) return <div>Error loading questions: {error.message}</div>;

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

  const handleClick = async () => {
    if (userTest?.status === "continue") {
      setSubmissionID(userTest?.lastSubmissionID as string);
      router.push(`/test/${testID}/attempt`);
    } else if (userTest?.status === "allow") {
      if (confirm("Are you sure you want to take this test?")) {
      const response = await createSubmission(userTest?.userTestID as string);
      setSubmissionID(response.submissionID);
      router.push(`/test/${testID}/attempt`);
      }
    }
  }

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
          <div className="w-1/6">
            <TestActionDropdown testID={testID as string} />
          </div>
        </div>
        {["allow", "continue", "closed", "forbidden"].includes(userTest?.status ?? "") && (
          <button
            onClick={["allow", "continue"].includes(userTest?.status ?? "") ? handleClick : undefined}
            disabled={["closed", "forbidden"].includes(userTest?.status ?? "")}
            className={`font-semibold px-6 py-2 rounded mb-4 text-white ${
              userTest?.status === "allow"
                ? "bg-blue-600 hover:bg-blue-700"
                : userTest?.status === "continue"
                ? "bg-yellow-500 hover:bg-yellow-600"
                : userTest?.status === "closed"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 cursor-not-allowed"
            }`}
          >
            {userTest?.status === "allow"
              ? "Attempt"
              : userTest?.status === "continue"
              ? "Continue"
              : userTest?.status === "closed"
              ? "Closed"
              : "Forbidden"}
          </button>
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
        <div className="flex flex-wrap md:flex-row gap-6">
          {userTest?.submissions?.map(sub => <AttemptCard key={sub.submissionID} sub={sub} />)}
        </div>

      </div>
    </div>
  );
}
