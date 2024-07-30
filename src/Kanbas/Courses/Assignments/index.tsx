import { useParams, useNavigate } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import assignmentsData from "../../Database/assignments.json";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments.filter((assignment: any) => assignment.course === cid));

  const handleDelete = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div id="wd-assignments" className="flex-grow-1 p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <FaSearch />
          </span>
          <input
            id="wd-search-assignment"
            type="text"
            className="form-control border-start-0"
            placeholder="Search for Assignments"
          />
          <button id="wd-add-assignment-group" className="btn btn-primary">
            <FaPlus className="me-2" />
            Group
          </button>
          <button id="wd-add-assignment" className="btn btn-danger" onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/new`)}>
            <FaPlus className="me-2" />
            Assignment
          </button>
        </div>
      </div>
      <h3 id="wd-assignments-title" className="mb-3">
        ASSIGNMENTS 40% of Total
      </h3>
      <ul id="wd-assignment-list" className="list-unstyled">
        {assignments.map((assignment: any) => (
          <li key={assignment._id} className="wd-assignment-list-item p-3 mb-2 border-start border-5 border-success d-flex justify-content-between align-items-center">
            <div>
            <a
              className="wd-assignment-link text-decoration-none text-dark fw-bold"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`)}
            >
              <MdAssignment className="me-2" />
              {assignment.title}
            </a>
            <p className="mb-0 text-muted">
              Multiple Modules | <strong>Due</strong> {assignment.dueDate} | <strong>Available From </strong> {assignment.availableFrom} | {assignment.points } pts | 
            </p>
            <p> <strong>Description:</strong> {assignment.description}</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(assignment._id)}
            >
              <AiFillDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
