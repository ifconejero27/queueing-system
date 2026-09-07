import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerPage() {
  const [name, setName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [purpose, setPurpose] = useState("");
  const [queueNumber, setQueueNumber] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const joinQueue = async (event) => {
    event.preventDefault();

    setError("");

    try {
      const response = await fetch(
        "https://queueing-system-eko1.onrender.com/api/queue",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            studentNumber,
            department,
            purpose,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      navigate(`/queue/${data.queueNumber}`);
    } catch {
      setError("Unable to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          University Registrar
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Student Queue Registration
        </p>

        {!queueNumber ? (
          <form onSubmit={joinQueue} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Student Number
              </label>

              <input
                type="text"
                value={studentNumber}
                onChange={(event) => setStudentNumber(event.target.value)}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                College Department
              </label>

              <select
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Select Department</option>
                <option value="CCS">College of Computer Studies</option>
                <option value="CTE">College of Teacher Education</option>
                <option value="CCJE">College of Criminal Justice</option>
                <option value="CAS">College of Arts and Sciences</option>
                <option value="CBA">College of Business and Accountancy</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Purpose
              </label>

              <select
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Select Purpose</option>
                <option value="Transcript of Records">
                  Transcript of Records
                </option>
                <option value="Certificate of Enrollment">
                  Certificate of Enrollment
                </option>
                <option value="Certificate of Grades">
                  Certificate of Grades
                </option>
                <option value="Document Request">Document Request</option>
                <option value="Student Records Inquiry">
                  Student Records Inquiry
                </option>
                <option value="Clearance">Clearance</option>
                <option value="Certification Request">
                  Certification Request
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
            >
              Join Queue
            </button>

            <button
              type="button"
              onClick={() => navigate("/employee/login")}
              className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Employee Login
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              You are in the queue!
            </h2>

            <h1 className="text-5xl font-bold text-gray-900 my-6">
              {queueNumber}
            </h1>

            <div className="text-left bg-gray-50 rounded-lg p-5 space-y-2">
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Student Number:</strong> {studentNumber}
              </p>
              <p>
                <strong>Department:</strong> {department}
              </p>
              <p>
                <strong>Purpose:</strong> {purpose}
              </p>
            </div>

            <p className="text-gray-500 mt-5">
              Please wait for your number to be called.
            </p>
          </div>
        )}

        {error && (
          <p className="mt-5 text-center text-red-600 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}

export default CustomerPage;
