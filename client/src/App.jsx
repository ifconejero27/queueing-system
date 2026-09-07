import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerPage from "./CustomerPage";
import EmployeeDashboard from "./EmployeeDashboard";
import QueueStatusPage from "./QueueStatusPage";
import QueueDisplay from "./queueDisplay";
import EmployeeLogin from "./EmployeeLogin";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerPage />} />

        <Route
          path="/employee/ccs"
          element={
            <ProtectedRoute department="CCS">
              <EmployeeDashboard
                department="CCS"
                windowNumber="1"
                departmentName="College of Computer Studies"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/cte"
          element={
            <ProtectedRoute department="CTE">
              <EmployeeDashboard
                department="CTE"
                windowNumber="2"
                departmentName="College of Teacher Education"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/ccje"
          element={
            <ProtectedRoute department="CCJE">
              <EmployeeDashboard
                department="CCJE"
                windowNumber="3"
                departmentName="College of Criminal Justice"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/cas"
          element={
            <ProtectedRoute department="CAS">
              <EmployeeDashboard
                department="CAS"
                windowNumber="4"
                departmentName="College of Arts and Sciences"
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/cba"
          element={
            <ProtectedRoute department="CBA">
              <EmployeeDashboard
                department="CBA"
                windowNumber="5"
                departmentName="College of Business and Accountancy"
              />
            </ProtectedRoute>
          }
        />
        <Route path="/queue/:queueNumber" element={<QueueStatusPage />} />
        <Route path="/display" element={<QueueDisplay />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
