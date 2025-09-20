let students = JSON.parse(localStorage.getItem("students")) || [];
let records = JSON.parse(localStorage.getItem("attendanceRecords")) || [];

// Add student
function addStudent() {
  let name = document.getElementById("studentName").value;
  let roll = document.getElementById("rollNumber").value;

  if (!name || !roll) {
    alert("Please enter both name and roll number!");
    return;
  }

  students.push({ name, roll });
  localStorage.setItem("students", JSON.stringify(students));

  alert("Student added successfully!");
  document.getElementById("studentName").value = "";
  document.getElementById("rollNumber").value = "";
}

// Load students into table
function loadStudents() {
  let tbody = document.querySelector("#studentTable tbody");
  if (!tbody) return; // Safe check
  tbody.innerHTML = "";

  students.forEach((s, index) => {
    let row = `
      <tr>
        <td>${s.roll}</td>
        <td>${s.name}</td>
        <td>
          <select id="status-${index}">
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

// Save attendance
function saveAttendance() {
  let date = new Date().toLocaleDateString();
  let todayRecord = { date, data: [] };

  students.forEach((s, index) => {
    let status = document.getElementById(`status-${index}`).value;
    todayRecord.data.push({ roll: s.roll, name: s.name, status });
  });

  records.push(todayRecord);
  localStorage.setItem("attendanceRecords", JSON.stringify(records));
  alert("Attendance saved for " + date);
}

// Show attendance records
function showRecords() {
  let recordDiv = document.getElementById("attendanceRecords");
  if (!recordDiv) return; // Safe check
  recordDiv.innerHTML = "";

  records.forEach(r => {
    let recordHTML = `<div class="record"><strong>${r.date}</strong><br>`;
    r.data.forEach(s => {
      recordHTML += `${s.roll} - ${s.name}: ${s.status}<br>`;
    });
    recordHTML += "</div>";
    recordDiv.innerHTML += recordHTML;
  });
}
