"use client";

import { useRouter } from "next/navigation";

interface SubmitSuccessModalProps {
  onClose: () => void;
  testID: string;
  courseID?: string | null;
  totalScore: number;
  numRightAns: number;
  numQuests: number;
  timeTaken?: number | null;
}

export default function SubmitSuccessModal({
  onClose,
  testID,
  courseID,
  totalScore,
  numRightAns,
  numQuests,
  timeTaken,
}: SubmitSuccessModalProps) {
  const router = useRouter();

  const handleViewTest = () => {
    onClose();
    router.push(`/test/${testID}`);
  };

  const handleViewCourse = () => {
    onClose();
    if (courseID) {
      router.push(`/course/${courseID}/overview`);
    } else {
      router.push(`/test/${testID}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Chúc mừng! Đã nộp bài thành công</h3>
        </div>
        <div className="mb-6 space-y-2 rounded-lg bg-gray-50 p-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Điểm số:</span>
            <span className="font-bold text-green-700">{totalScore.toFixed(2)} / 100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Số câu đúng:</span>
            <span className="font-semibold">{numRightAns} / {numQuests}</span>
          </div>
          {timeTaken != null && (
            <div className="flex justify-between">
              <span className="text-gray-600">Thời gian làm bài:</span>
              <span className="font-semibold">{timeTaken.toFixed(1)} phút</span>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleViewTest}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Xem bài test
          </button>
          <button
            onClick={handleViewCourse}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Về course
          </button>
        </div>
      </div>
    </div>
  );
}
