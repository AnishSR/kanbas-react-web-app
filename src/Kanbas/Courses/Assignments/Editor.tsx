import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);

  // check for editing or creating an assignment
  const isEditing = id !== "new";
  const assignment = isEditing ? assignments.find((assignment: any) => assignment._id === id) : null;

  const [name, setName] = useState(assignment ? assignment.title : "");
  const [description, setDescription] = useState(assignment ? assignment.description : "");
  const [points, setPoints] = useState(assignment ? assignment.points : 0);
  const [dueDate, setDueDate] = useState(assignment ? assignment.dueDate : "");
  const [availableFrom, setAvailableFrom] = useState(assignment ? assignment.availableFrom : "");
  const [availableUntil, setAvailableUntil] = useState(assignment ? assignment.availableUntil : "");

  const handleSave = () => {
    const newAssignment = {
      _id: isEditing ? assignment._id : new Date().getTime().toString(),
      title: name,
      description,
      points,
      dueDate,
      availableFrom,
      availableUntil,
      course: cid,
    };

    if (isEditing) {
      dispatch(updateAssignment(newAssignment));
    } else {
      dispatch(addAssignment(newAssignment));
    }

    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <h3>{isEditing ? "Edit Assignment" : "Create New Assignment"}</h3>
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input
          id="wd-name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Description</label>
        <textarea
          id="wd-description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-points" className="form-label">Points</label>
          <input
            id="wd-points"
            type="number"
            className="form-control"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-due-date" className="form-label">Due Date</label>
          <input
            id="wd-due-date"
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-available-from" className="form-label">Available From</label>
          <input
            id="wd-available-from"
            type="date"
            className="form-control"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-available-until" className="form-label">Available Until</label>
          <input
            id="wd-available-until"
            type="date"
            className="form-control"
            value={availableUntil}
            onChange={(e) => setAvailableUntil(e.target.value)}
          />
        </div>
      </div>
      <div className="text-end">
        <button className="btn btn-success me-2" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
