const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let queue = [];

const departments = {
  CCS: "College of Computer Studies",
  CTE: "College of Teacher Education",
  CCJE: "College of Criminal Justice",
  CAS: "College of Arts and Sciences",
  CBA: "College of Business and Accountancy",
};

app.get("/api/queue", (req, res) => {
  res.json(queue);
});

app.get("/api/queue/:queueNumber", (req, res) => {
  const { queueNumber } = req.params;

  const student = queue.find((student) => student.queueNumber === queueNumber);

  if (!student) {
    return res.status(404).json({
      message: "Queue number not found.",
    });
  }

  const departmentQueue = queue.filter(
    (queueStudent) => queueStudent.department === student.department,
  );

  const peopleAhead = departmentQueue.filter(
    (queueStudent) =>
      queueStudent.status === "WAITING" && queueStudent.id < student.id,
  ).length;

  const currentStudent = departmentQueue.find(
    (queueStudent) => queueStudent.status === "SERVING",
  );

  res.json({
    queueNumber: student.queueNumber,
    name: student.name,
    studentNumber: student.studentNumber,
    department: student.department,
    departmentName: student.departmentName,
    purpose: student.purpose,
    status: student.status,
    peopleAhead,
    currentlyServing: currentStudent ? currentStudent.queueNumber : null,
  });
});

app.post("/api/queue", (req, res) => {
  const { name, studentNumber, department, purpose } = req.body;

  if (!name || !studentNumber || !department || !purpose) {
    return res.status(400).json({
      message: "Name, student number, department, and purpose are required.",
    });
  }

  if (!departments[department]) {
    return res.status(400).json({
      message: "Invalid department.",
    });
  }

  const departmentQueue = queue.filter(
    (student) => student.department === department,
  );

  const queueNumber = departmentQueue.length + 1;

  const student = {
    id: queue.length + 1,
    queueNumber: `${department}-${String(queueNumber).padStart(3, "0")}`,
    name,
    studentNumber,
    department,
    departmentName: departments[department],
    purpose,
    status: "WAITING",
  };

  queue.push(student);

  res.status(201).json(student);
});

app.post("/api/queue/next", (req, res) => {
  const { department } = req.body;

  if (!department || !departments[department]) {
    return res.status(400).json({
      message: "A valid department is required.",
    });
  }

  const currentStudent = queue.find(
    (student) =>
      student.department === department && student.status === "SERVING",
  );

  if (currentStudent) {
    return res.status(400).json({
      message: `Please complete ${currentStudent.queueNumber} before calling the next student.`,
    });
  }

  const nextStudent = queue.find(
    (student) =>
      student.department === department && student.status === "WAITING",
  );

  if (!nextStudent) {
    return res.status(404).json({
      message: `No students are waiting in the ${department} queue.`,
    });
  }

  nextStudent.status = "SERVING";

  res.json(nextStudent);
});

app.post("/api/queue/complete", (req, res) => {
  const { department } = req.body;

  if (!department || !departments[department]) {
    return res.status(400).json({
      message: "A valid department is required.",
    });
  }

  const currentStudent = queue.find(
    (student) =>
      student.department === department && student.status === "SERVING",
  );

  if (!currentStudent) {
    return res.status(404).json({
      message: `No student is currently being served in the ${department} queue.`,
    });
  }

  currentStudent.status = "COMPLETED";

  res.json(currentStudent);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
