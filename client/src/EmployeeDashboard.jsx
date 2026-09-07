import { useEffect, useState } from "react";

function EmployeeDashboard({ department, windowNumber, departmentName }) {
  const [queue, setQueue] = useState([]);
  const [error, setError] = useState("");

  const getQueue = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/queue");

      const data = await response.json();

      setQueue(data);
    } catch {
      setError("Unable to connect to the server.");
    }
  };

  const nextStudent = async () => {
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/queue/next", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department: department,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setQueue((currentQueue) =>
        currentQueue.map((student) =>
          student.id === data.id ? { ...student, status: "SERVING" } : student,
        ),
      );
    } catch {
      setError("Unable to connect to the server.");
    }
  };

  const completeStudent = async () => {
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/queue/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department: department,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setQueue((currentQueue) =>
        currentQueue.map((student) =>
          student.id === data.id
            ? { ...student, status: "COMPLETED" }
            : student,
        ),
      );
    } catch {
      setError("Unable to connect to the server.");
    }
  };

  useEffect(() => {
    getQueue();

    const interval = setInterval(getQueue, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentStudent = queue.find(
    (student) =>
      student.department === department && student.status === "SERVING",
  );

  const waitingStudents = queue.filter(
    (student) =>
      student.department === department && student.status === "WAITING",
  );

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Registrar - Window {windowNumber}
            </h1>

            <h2 className="text-lg text-gray-600 mt-1">{departmentName}</h2>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("employeeLoggedIn");
              localStorage.removeItem("employeeDepartment");
              window.location.href = "/employee/login";
            }}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>

        {/* Queue Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <p className="text-gray-500 text-sm">Students Waiting</p>

          <p className="text-4xl font-bold text-gray-800 mt-1">
            {waitingStudents.length}
          </p>
        </div>

        {/* Currently Serving */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Currently Serving
          </h2>

          {currentStudent ? (
            <div>
              <div className="bg-gray-100 rounded-xl p-6 text-center mb-6">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Queue Number
                </p>

                <h1 className="text-5xl font-bold text-gray-800 mt-2">
                  {currentStudent.queueNumber}
                </h1>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between border-b border-gray-200 pb-3">
                  <span className="font-semibold text-gray-500">Name</span>

                  <span className="text-gray-800">{currentStudent.name}</span>
                </div>

                <div className="flex justify-between border-b border-gray-200 pb-3">
                  <span className="font-semibold text-gray-500">
                    Student Number
                  </span>

                  <span className="text-gray-800">
                    {currentStudent.studentNumber}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-200 pb-3">
                  <span className="font-semibold text-gray-500">Purpose</span>

                  <span className="text-gray-800 text-right">
                    {currentStudent.purpose}
                  </span>
                </div>
              </div>

              <button
                onClick={completeStudent}
                className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
              >
                Complete Student
              </button>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <p className="text-gray-500">
                No student is currently being served.
              </p>
            </div>
          )}
        </section>

        {/* Next Student */}
        <button
          onClick={nextStudent}
          disabled={currentStudent}
          className={`w-full py-4 mb-6 font-bold text-lg rounded-xl transition ${
            currentStudent
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          Next Student
        </button>

        {/* Waiting Queue */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Waiting Queue
          </h2>

          {waitingStudents.length === 0 ? (
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <p className="text-gray-500">No students are waiting.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {waitingStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-bold text-gray-800">
                      {student.queueNumber}
                    </p>

                    <p className="text-gray-600">{student.name}</p>
                  </div>

                  <p className="text-sm text-gray-500">{student.purpose}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-100 border border-red-300 text-red-700 rounded-lg p-4 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
