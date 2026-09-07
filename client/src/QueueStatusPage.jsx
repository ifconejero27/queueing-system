import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function QueueStatusPage() {
  const { queueNumber } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/queue/${queueNumber}`,
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        setStudent(data);
      } catch {
        setError("Unable to connect to the server.");
      }
    };

    getStatus();

    const interval = setInterval(getStatus, 1000);

    return () => clearInterval(interval);
  }, [queueNumber]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-7">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            University Registrar
          </h1>

          <p className="text-gray-500 text-sm mt-1">Queue Status</p>
        </div>

        <div className="bg-gray-800 text-white rounded-xl p-6 text-center mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide">
            Your Queue Number
          </p>

          <h1 className="text-5xl font-bold mt-2">{student.queueNumber}</h1>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="text-gray-500 font-semibold">Name</span>

            <span className="text-gray-800 text-right">{student.name}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="text-gray-500 font-semibold">Student Number</span>

            <span className="text-gray-800">{student.studentNumber}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="text-gray-500 font-semibold">Department</span>

            <span className="text-gray-800 text-right">
              {student.departmentName}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-3">
            <span className="text-gray-500 font-semibold">Purpose</span>

            <span className="text-gray-800 text-right">{student.purpose}</span>
          </div>
        </div>

        {student.status === "WAITING" && (
          <div className="bg-gray-100 rounded-xl p-5 text-center">
            <p className="text-gray-500 text-sm">Currently Serving</p>

            <p className="text-2xl font-bold text-gray-800 mt-1">
              {student.currentlyServing || "No student"}
            </p>

            <p className="text-gray-500 text-sm mt-4">People Ahead</p>

            <p className="text-3xl font-bold text-gray-800">
              {student.peopleAhead}
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Position #{student.peopleAhead + 1}
            </p>
          </div>
        )}

        {student.status === "SERVING" && (
          <div className="bg-gray-800 text-white rounded-xl p-5 text-center">
            <p className="text-sm uppercase tracking-wide">Now Serving</p>

            <p className="text-2xl font-bold mt-1">
              Please proceed to Window{" "}
              {student.department === "CCS"
                ? "1"
                : student.department === "CTE"
                  ? "2"
                  : student.department === "CCJE"
                    ? "3"
                    : student.department === "CAS"
                      ? "4"
                      : "5"}
            </p>
          </div>
        )}

        {student.status === "COMPLETED" && (
          <div className="bg-gray-100 rounded-xl p-5 text-center">
            <p className="text-xl font-bold text-gray-800">
              Transaction Completed
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Thank you for using the University Registrar queue system.
            </p>

            <button
              onClick={() => navigate("/")}
              className="w-full mt-5 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
            >
              Back to Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QueueStatusPage;
