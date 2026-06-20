let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

function addStudent() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let branch = document.getElementById("branch").value;
    let marks = document.getElementById("marks").value;

    if (name === "" || roll === "" || branch === "" || marks === "") {
        alert("Please fill all fields");
        return;
    }

    if (editIndex === -1) {

        let today = new Date();

        let dateAdded =
            today.getDate().toString().padStart(2, "0") + "/" +
            (today.getMonth() + 1).toString().padStart(2, "0") + "/" +
            today.getFullYear();

        let student = {
            name: name,
            roll: roll,
            branch: branch,
            marks: marks,
            dateAdded: dateAdded
        };

        students.push(student);

    } else {

        students[editIndex].name = name;
        students[editIndex].roll = roll;
        students[editIndex].branch = branch;
        students[editIndex].marks = marks;

        editIndex = -1;

        document.getElementById("submitBtn").innerText =
            "Add Student";
    }

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("marks").value = "";
}

function displayStudents() {

    let tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    students.forEach((student, index) => {

        let row = tableBody.insertRow();

        row.insertCell(0).innerHTML = student.name;
        row.insertCell(1).innerHTML = student.roll;
        row.insertCell(2).innerHTML = student.branch;
        row.insertCell(3).innerHTML = student.marks;
        row.insertCell(4).innerHTML =
            student.dateAdded || "N/A";

        row.insertCell(5).innerHTML = `
            <button onclick="editStudent(${index})">
                Edit
            </button>

            <button onclick="deleteStudent(${index})">
                Delete
            </button>
        `;
    });

    updateStudentCount();
}

function editStudent(index) {

    document.getElementById("name").value =
        students[index].name;

    document.getElementById("roll").value =
        students[index].roll;

    document.getElementById("branch").value =
        students[index].branch;

    document.getElementById("marks").value =
        students[index].marks;

    editIndex = index;

    document.getElementById("submitBtn").innerText =
        "Update Student";
}

function deleteStudent(index) {

    students.splice(index, 1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();
}

function searchStudent() {

    let input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let rows = document
        .getElementById("tableBody")
        .getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        let name =
            rows[i].cells[0].innerHTML.toLowerCase();

        if (name.includes(input)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

function updateStudentCount() {

    document.getElementById("studentCount").innerHTML =
        "Total Students: " + students.length;
}

function exportToCSV() {

    let csv =
        "Name,Roll No,Branch,Marks,Date Added\n";

    students.forEach(student => {

        csv +=
            student.name + "," +
            student.roll + "," +
            student.branch + "," +
            student.marks + "," +
            student.dateAdded + "\n";
    });

    let blob = new Blob(
        [csv],
        { type: "text/csv" }
    );

    let link = document.createElement("a");

    link.href =
        window.URL.createObjectURL(blob);

    link.download = "students.csv";

    link.click();
}

function clearAllStudents() {

    if (confirm("Delete all student records?")) {

        students = [];

        localStorage.removeItem("students");

        displayStudents();
    }
}

displayStudents();