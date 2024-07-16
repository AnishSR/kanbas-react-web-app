import { FaSearch, FaPlus } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";

export default function Assignments() {
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
          <button id="wd-add-assignment" className="btn btn-danger">
            <FaPlus className="me-2" />
            Assignment
          </button>
        </div>
      </div>
      <h3 id="wd-assignments-title" className="mb-3">
        ASSIGNMENTS 40% of Total
      </h3>
      <ul id="wd-assignment-list" className="list-unstyled">
        <li className="wd-assignment-list-item p-3 mb-2 border-start border-5 border-success">
          <a
            className="wd-assignment-link text-decoration-none text-dark fw-bold"
            href="#/Kanbas/Courses/1234/Assignments/123"
          >
            <MdAssignment className="me-2" />
            A1 - ENV + HTML
          </a>
          <p className="mb-0 text-muted">
            Multiple Modules | <strong>Not available until</strong> May 6 at 12:00 am | <strong>Due</strong> May 13 at 11:59 pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item p-3 mb-2 border-start border-5 border-success">
          <a
            className="wd-assignment-link text-decoration-none text-dark fw-bold"
            href="#/Kanbas/Courses/1234/Assignments/124"
          >
            <MdAssignment className="me-2" />
            A2 - CSS + BOOTSTRAP
          </a>
          <p className="mb-0 text-muted">
            Multiple Modules | <strong>Not available until</strong> May 13 at 12:00 am | <strong>Due</strong> May 20 at 11:59 pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item p-3 mb-2 border-start border-5 border-success">
          <a
            className="wd-assignment-link text-decoration-none text-dark fw-bold"
            href="#/Kanbas/Courses/1234/Assignments/125"
          >
            <MdAssignment className="me-2" />
            A3 - JAVASCRIPT + REACT
          </a>
          <p className="mb-0 text-muted">
            Multiple Modules | <strong>Not available until</strong> May 20 at 12:00 am | <strong>Due</strong> May 27 at 11:59 pm | 100 pts
          </p>
        </li>
      </ul>
    </div>
  );
}
