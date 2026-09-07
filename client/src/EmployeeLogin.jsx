import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    if (username === "ccs" && password === "1234") {
      localStorage.setItem("employeeLoggedIn", "true");
      localStorage.setItem("employeeDepartment", "CCS");
      navigate("/employee/ccs");
      return;
    }

    if (username === "cte" && password === "1234") {
      localStorage.setItem("employeeLoggedIn", "true");
      localStorage.setItem("employeeDepartment", "CTE");
      navigate("/employee/cte");
      return;
    }

    if (username === "ccje" && password === "1234") {
      localStorage.setItem("employeeLoggedIn", "true");
      localStorage.setItem("employeeDepartment", "CCJE");
      navigate("/employee/ccje");
      return;
    }

    if (username === "cas" && password === "1234") {
      localStorage.setItem("employeeLoggedIn", "true");
      localStorage.setItem("employeeDepartment", "CAS");
      navigate("/employee/cas");
      return;
    }

    if (username === "cba" && password === "1234") {
      localStorage.setItem("employeeLoggedIn", "true");
      localStorage.setItem("employeeDepartment", "CBA");
      navigate("/employee/cba");
      return;
    }

    setError("Invalid username or password.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-gray-800">Employee Login</h1>

          <p className="text-gray-500 mt-2">University Registrar</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Demo Accounts
          </h2>

          <div className="text-sm text-gray-600 space-y-1">
            <p>CCS: ccs / 1234</p>
            <p>CTE: cte / 1234</p>
            <p>CCJE: ccje / 1234</p>
            <p>CAS: cas / 1234</p>
            <p>CBA: cba / 1234</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
          >
            Login
          </button>
        </form>

        {error && (
          <p className="mt-5 text-center text-red-600 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}

export default EmployeeLogin;
