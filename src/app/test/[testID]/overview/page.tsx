import React from "react";

const fakeData = {
  lastScore: 9.67,
  maxScore: 10,
  attempts: [
    {
      id: 3,
      status: "Đã xong",
      start: "Thứ Tư, 5 tháng 2 2025, 4:14 PM",
      end: "Thứ Tư, 5 tháng 2 2025, 4:22 PM",
      duration: "7 phút 59 giây",
      score: 2.9,
      max: 3,
      totalScore: 9.67,
      totalMax: 10,
      percent: 96.67,
    },
    {
      id: 2,
      status: "Đã xong",
      start: "Thứ Tư, 15 tháng 1 2025, 3:31 PM",
      end: "Thứ Tư, 15 tháng 1 2025, 4:05 PM",
      duration: "33 phút 34 giây",
      score: 1.5,
      max: 3,
      totalScore: 5,
      totalMax: 10,
      percent: 50,
    },
  ],
};

export default function TestPage() {
  return (
    <div className="bg-white min-h-screen p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-pink-100 text-pink-600 rounded-full p-2">
          {/* Example icon: Code SVG */}
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path d="M8 17l-5-5 5-5M16 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-blue-800">
          Programming code: <span className="text-blue-600">Lexer</span>
        </h1>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded mb-4">
        Thực hiện lại đề thi
      </button>
      <div className="text-gray-600 mb-2">Thời gian làm bài: 2 giờ</div>
      <div className="text-gray-600 mb-8">Cách chấm điểm: Kiểm tra lần cuối</div>

      <div className="text-2xl font-semibold text-blue-700 mb-4">
        Kiểm tra lần cuối: {fakeData.lastScore} / {fakeData.maxScore.toFixed(2)}
      </div>

      <div className="text-xl font-semibold text-blue-800 mb-4">
        Tổng quan các lần làm bài trước của bạn
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {fakeData.attempts.map((attempt, idx) => (
          <div key={attempt.id} className="flex-1 bg-gray-100 rounded-lg shadow p-4">
            <div className="text-lg font-semibold text-blue-700 mb-2">
              Lần thử nghiệm {attempt.id}
            </div>
            <table className="w-full text-sm mb-2">
              <tbody>
                <tr>
                  <td className="font-bold w-1/3">Trạng thái</td>
                  <td>{attempt.status}</td>
                </tr>
                <tr>
                  <td className="font-bold">Bắt đầu vào lúc</td>
                  <td>{attempt.start}</td>
                </tr>
                <tr>
                  <td className="font-bold">Kết thúc lúc</td>
                  <td>{attempt.end}</td>
                </tr>
                <tr>
                  <td className="font-bold">Thời gian thực hiện</td>
                  <td>{attempt.duration}</td>
                </tr>
                <tr>
                  <td className="font-bold">Điểm</td>
                  <td>
                    {attempt.score}/{attempt.max}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Điểm</td>
                  <td>
                    <span className="font-bold text-green-700">
                      {attempt.totalScore.toFixed(2)}
                    </span>{" "}
                    trên {attempt.totalMax.toFixed(2)} (
                    {attempt.percent}%)
                  </td>
                </tr>
              </tbody>
            </table>
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Xem lại
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}