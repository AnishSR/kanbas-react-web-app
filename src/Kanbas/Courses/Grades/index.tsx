import { useParams } from 'react-router-dom';
import { FaSearch, FaUpload, FaDownload, FaFilter } from "react-icons/fa";
import enrollmentsData from "../../Database/enrollments.json";
import usersData from "../../Database/users.json";
import assignmentsData from "../../Database/assignments.json";
import gradesData from "../../Database/grades.json";

export default function Grades() {
  const { cid } = useParams();

  const enrolled = enrollmentsData
    .filter(enrollment => enrollment.course === cid)
    .map(enrollment => usersData.find(user => user._id === enrollment.user))
    .filter(user => user); 

  const assignments = assignmentsData.filter(assignment => assignment.course === cid);

  const grades = gradesData.filter(grade => assignments.some(assignment => assignment._id === grade.assignment));

  if (!enrolled.length) {
    return <div>No students found for this course.</div>;
  }

  if (!assignments.length) {
    return <div>No assignments found for this course.</div>;
  }

  return (
    <div id="wd-grades" className="p-4">
      <h3>Grades</h3>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary me-2">
          <FaUpload className="me-2" />
          Import
        </button>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="exportDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <FaDownload className="me-2" />
            Export
          </button>
          <ul className="dropdown-menu" aria-labelledby="exportDropdown">
            <li><a className="dropdown-item" href="#">CSV</a></li>
            <li><a className="dropdown-item" href="#">Excel</a></li>
          </ul>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Student Names</label>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>
            <input type="text" className="form-control border-start-0" placeholder="Search Students" />
          </div>
        </div>
        <div className="col-md-6">
          <label className="form-label">Assignment Names</label>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>
            <input type="text" className="form-control border-start-0" placeholder="Search Assignments" />
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <button className="btn btn-secondary">
            <FaFilter className="me-2" />
            Apply Filters
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student Name</th>
              {assignments.map((assignment, index) => (
                <th key={index}>{assignment.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enrolled.map((student, index) => (
              <tr key={index}>
                <td>{student ? `${student.firstName} ${student.lastName}` : 'Unknown User'}</td>
                {assignments.map((assignment, idx) => {
                  const grade = grades.find(g => g.student === student?._id && g.assignment === assignment._id);
                  return (
                    <td key={idx}>{grade ? `${grade.grade}%` : 'No grade'}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
