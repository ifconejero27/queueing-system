import { useEffect, useState } from "react";

function QueueDisplay() {
  const [queue, setQueue] = useState([]);
  const [error, setError] = useState("");

  const getQueue = async () => {
    try {
      const response = await fetch(
        "https://queueing-system-eko1.onrender.com/api/queue",
      );

      const data = await response.json();

      setQueue(data);
    } catch {
      setError("Unable to connect to the server.");
    }
  };

  useEffect(() => {
    getQueue();

    const interval = setInterval(getQueue, 1000);

    return () => clearInterval(interval);
  }, []);

  const departments = [
    {
      code: "CCS",
      window: 1,
      name: "College of Computer Studies",
    },
    {
      code: "CTE",
      window: 2,
      name: "College of Teacher Education",
    },
    {
      code: "CCJE",
      window: 3,
      name: "College of Criminal Justice",
    },
    {
      code: "CAS",
      window: 4,
      name: "College of Arts and Sciences",
    },
    {
      code: "CBA",
      window: 5,
      name: "College of Business and Accountancy",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6">
      <div className="w-full max-w-[1800px] mx-auto">
        <div className="bg-white rounded-xl shadow-md p-4 mb-5 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            University Registrar
          </h1>

          <p className="text-gray-500 text-sm mt-1">Queue Status</p>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {departments.map((department) => {
            const currentStudent = queue.find(
              (student) =>
                student.department === department.code &&
                student.status === "SERVING",
            );

            const waitingStudents = queue.filter(
              (student) =>
                student.department === department.code &&
                student.status === "WAITING",
            );

            return (
              <div
                key={department.code}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="bg-gray-800 text-white p-3 text-center">
                  <p className="text-xs font-semibold">
                    Window {department.window}
                  </p>

                  <h2 className="text-base font-bold mt-1">
                    {department.code}
                  </h2>

                  <p className="text-xs text-gray-300 mt-1 leading-tight">
                    {department.name}
                  </p>
                </div>

                <div className="h-28 px-3 text-center flex flex-col justify-center">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Now Serving
                  </p>

                  {currentStudent ? (
                    <h1 className="text-3xl font-bold text-gray-800 mt-1">
                      {currentStudent.queueNumber}
                    </h1>
                  ) : (
                    <p className="text-gray-400 text-sm mt-1">No student</p>
                  )}
                </div>

                <div className="border-t border-gray-200 p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-700 text-sm">Waiting</h3>

                    <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                      {waitingStudents.length}
                    </span>
                  </div>

                  {waitingStudents.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-2">
                      No students waiting
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {waitingStudents.map((student) => (
                        <div
                          key={student.id}
                          className="flex justify-between items-center bg-gray-100 rounded-lg px-2.5 py-1.5"
                        >
                          <span className="font-semibold text-gray-700 text-xs">
                            {student.queueNumber}
                          </span>

                          <span className="text-xs text-gray-500 truncate ml-2">
                            {student.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default QueueDisplay;
