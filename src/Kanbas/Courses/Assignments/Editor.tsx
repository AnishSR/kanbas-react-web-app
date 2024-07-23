import { useParams, Link } from "react-router-dom";
import assignmentsData from "../../Database/assignments.json";


export default function AssignmentEditor() {
  const { cid, id } = useParams();
  const assignment = assignmentsData.find(assignment => assignment._id === id);
  /*
  console.log("the id is", id)
  */
  if (!assignment) {
    return <div>Assignment not found</div>;
  }
  
  return (
    <div id="wd-assignments-editor" className="p-4">
      <h3>Assignment Editor</h3>
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input id="wd-name" className="form-control" defaultValue={assignment.title} />
      </div>
      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Description</label>
        <textarea id="wd-description" className="form-control">
          {assignment.description}
        </textarea>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-points" className="form-label">Points</label>
          <input id="wd-points" className="form-control" defaultValue={assignment.points} />
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-group" className="form-label">Assignment Group</label>
          <select id="wd-group" className="form-control">
            <option value="assignments">ASSIGNMENTS</option>
            <option value="quizzes">QUIZZES</option>
            <option value="exams">EXAMS</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-display-grade-as" className="form-label">Display Grade As</label>
          <select id="wd-display-grade-as" className="form-control">
            <option value="percentage">PERCENTAGE</option>
            <option value="points">POINTS</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
          <select id="wd-submission-type" className="form-control">
            <option value="online">ONLINE</option>
            <option value="in-person">IN PERSON</option>
          </select>
        </div>
      </div>
      <div className="mb-3">
        <label>Online Entry Options</label>
        <div className="form-check">
          <input id="wd-text-entry" type="checkbox" className="form-check-input" value="text-entry" name="entry-options" />
          <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
        </div>
        <div className="form-check">
          <input id="wd-website-url" type="checkbox" className="form-check-input" value="website-url" name="entry-options" />
          <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
        </div>
        <div className="form-check">
          <input id="wd-media-recordings" type="checkbox" className="form-check-input" value="media-recordings" name="entry-options" />
          <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
        </div>
        <div className="form-check">
          <input id="wd-student-annotation" type="checkbox" className="form-check-input" value="student-annotation" name="entry-options" />
          <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
        </div>
        <div className="form-check">
          <input id="wd-file-upload" type="checkbox" className="form-check-input" value="file-upload" name="entry-options" />
          <label htmlFor="wd-file-upload" className="form-check-label">File Upload</label>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
          <input id="wd-assign-to" className="form-control" defaultValue="Everyone" />
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-due-date" className="form-label">Due</label>
          <input id="wd-due-date" type="date" className="form-control" defaultValue={assignment.until}/>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-available-from" className="form-label">Available From</label>
          <input id="wd-available-from" type="date" className="form-control" defaultValue={assignment.from}/>
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-available-until" className="form-label">Until</label>
          <input id="wd-available-until" type="date" className="form-control" defaultValue={assignment.until}/>
        </div>
      </div>
      <div className="text-end">
        <button className="btn btn-success">Save</button>
      </div>
    </div>
  );
}
