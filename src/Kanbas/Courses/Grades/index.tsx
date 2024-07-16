import { FaSearch, FaUpload, FaDownload, FaFilter } from "react-icons/fa";

export default function Grades() {
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
              <th>A1 SETUP</th>
              <th>A2 HTML</th>
              <th>A3 CSS</th>
              <th>A4 BOOTSTRAP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jane Adams</td>
              <td>100%</td>
              <td>96.67%</td>
              <td>92.18%</td>
              <td>66.22%</td>
            </tr>
            <tr>
              <td>Christina Allen</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Samreen Ansari</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Han Bao</td>
              <td>100%</td>
              <td>100%</td>
              <td>
                <input type="number" className="form-control" defaultValue="88.03" />
              </td>
              <td>98.99%</td>
            </tr>
            <tr>
              <td>Mahi Sai Srinivas Bobbili</td>
              <td>100%</td>
              <td>96.67%</td>
              <td>98.37%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td>Siran Cao</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
