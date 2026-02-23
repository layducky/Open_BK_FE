"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSubmissionReview } from "@/services/course/test";
import { formatDateTime } from "@/lib/dateUtils";

const ansLabel: Record<string, string> = { A: "A", B: "B", C: "C", D: "D", NULL: "—" };

export default function SubmissionReviewPage() {
  const params = useParams();
  const testID = params?.testID as string;
  const submissionID = params?.submissionID as string;

  const { data: submission, isLoading, error } = useQuery({
    queryKey: ["submissionReview", submissionID],
    queryFn: () => getSubmissionReview(submissionID),
    enabled: !!submissionID,
  });

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {(error as Error).message}</div>;
  if (!submission) return <div className="p-6">Submission not found.</div>;

  const test = submission.test_submissions;
  const answers = submission.quesAns || [];

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/test/${testID}`}
          className="inline-flex items-center text-dodger-blue-600 hover:underline mb-6"
        >
          ← Back to test
        </Link>

        <div className="bg-white rounded-xl shadow border p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Review attempt
          </h1>
          {test && (
            <p className="text-slate-600 mb-6">
              {test.testName} · Attempt #{submission.numericalOrder}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div>
              <span className="text-slate-500">Status</span>
              <p className="font-semibold capitalize">{submission.status}</p>
            </div>
            <div>
              <span className="text-slate-500">Score</span>
              <p className="font-semibold text-green-700">
                {typeof submission.totalScore === "number"
                  ? submission.totalScore.toFixed(2)
                  : submission.totalScore}{" "}
                / 100
              </p>
            </div>
            <div>
              <span className="text-slate-500">Correct answers</span>
              <p className="font-semibold">{submission.numRightAns ?? 0}</p>
            </div>
            <div>
              <span className="text-slate-500">Submitted at</span>
              <p className="font-semibold">
                {submission.submittedAt
                  ? formatDateTime(submission.submittedAt)
                  : "—"}
              </p>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-slate-900 mb-4">Questions & answers</h2>
          <div className="space-y-6">
            {answers
              .sort(
                (a: any, b: any) =>
                  (a.questionInfo?.numericalOrder ?? 0) -
                  (b.questionInfo?.numericalOrder ?? 0)
              )
              .map((qa: any, index: number) => {
                const q = qa.questionInfo || {};
                const correctLabel = ansLabel[q.correctAns] ?? q.correctAns;
                const selectedLabel = ansLabel[qa.selectedAns] ?? qa.selectedAns;
                const isCorrect = qa.isCorrect;

                return (
                  <div
                    key={qa.quesAnsID || index}
                    className={`border rounded-lg p-4 ${
                      isCorrect ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"
                    }`}
                  >
                    <p className="font-medium text-slate-900 mb-2">
                      {index + 1}. {q.content}
                    </p>
                    <ul className="space-y-1 text-sm text-slate-700 mb-3">
                      {["A", "B", "C", "D"].map((key) => (
                        <li key={key}>
                          {key}. {q[`ans${key}`] ?? ""}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span>
                        Your answer:{" "}
                        <strong className={isCorrect ? "text-green-700" : "text-red-700"}>
                          {selectedLabel}
                        </strong>
                      </span>
                      {!isCorrect && (
                        <span>
                          Correct: <strong className="text-green-700">{correctLabel}</strong>
                        </span>
                      )}
                    </div>
                    {q.explanation && (
                      <p className="mt-2 text-slate-600 text-sm border-t pt-2">
                        Explanation: {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
