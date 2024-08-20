import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes, addQuiz, updateQuiz } from "./reducer";
import * as client from "./client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuizQuestions from "./QuizQuestions";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizzes = useSelector((state: any) => state.quizReducer.quizzes);

  const isEditing = qid !== "new";
  const quiz = isEditing ? quizzes.find((quiz: any) => quiz._id === qid) : null;

  const [activeTab, setActiveTab] = useState("details");

  const [quizTitle, setQuizTitle] = useState(quiz ? quiz.title : "");
  const [description, setDescription] = useState(quiz ? quiz.description : "");
  const [assignmentGroup, setAssignmentGroup] = useState(quiz ? quiz.assignmentGroup : "Quizzes");
  const [quizType, setQuizType] = useState(quiz ? quiz.quizType : "Graded Quiz");
  const [points, setPoints] = useState(quiz ? quiz.points : 0);
  const [shuffleAnswers, setShuffleAnswers] = useState(quiz ? quiz.shuffleAnswers : true);
  const [timeLimit, setTimeLimit] = useState(quiz ? quiz.timeLimitEntry : 20);
  const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(quiz ? quiz.allowMultipleAttempts : false);
  const [showCorrectedAnswers, setShowCorrectedAnswers] = useState(quiz ? quiz.showCorrectedAnswers : false);
  const [accessCode, setAccessCode] = useState(quiz ? quiz.accessCodeEntry : "");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(quiz ? quiz.oneQuestionAtATime : true);
  const [webCamRequired, setWebCamRequired] = useState(quiz ? quiz.webCamRequired : false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(quiz ? quiz.lockQuestionsAfterAnswering : false);
  const formatDate = (dateString: string) => dateString ? new Date(dateString).toISOString().split('T')[0] : "";
  const [availableFrom, setAvailableFrom] = useState(quiz ? formatDate(quiz.availableFrom) : "");
  const [availableUntil, setAvailableUntil] = useState(quiz ? formatDate(quiz.availableUntil) : "");
  const [dueDate, setDueDate] = useState(quiz ? formatDate(quiz.dueDate) : "");
  const [attemptLimit, setAttemptLimit] = useState(quiz ? quiz.attemptLimit : 1);

  const saveQuiz = async (quiz: any) => {
    if (!qid) {
      console.error("Quiz ID is missing for editing.");
      return;
    }
    const updatedQuiz = { ...quiz, _id: qid };
    const status = await client.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
  };

  const createQuiz = async (quiz: any) => {
    const newQuiz = await client.createQuiz(cid as string, quiz);
    dispatch(addQuiz(newQuiz));
  };

  const handleSave = () => {
    const newQuiz = {
      title: quizTitle,
      description,
      assignmentGroup,
      quizType,
      points,
      shuffleAnswers,
      timeLimitEntry: timeLimit,
      allowMultipleAttempts,
      attemptLimit,
      showCorrectedAnswers,
      accessCodeEntry: accessCode,
      oneQuestionAtATime,
      webCamRequired,
      lockQuestionsAfterAnswering,
      dueDate: new Date(dueDate).toISOString(),
      availableFrom: new Date(availableFrom).toISOString(),
      availableUntil: new Date(availableUntil).toISOString(),
      course: cid,
    };

    if (isEditing) {
      saveQuiz(newQuiz);
    } else {
      createQuiz(newQuiz);
    }

    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const renderDetailsTab = () => (
    <div>
      <div className="mb-3">
        <label htmlFor="wd-title" className="form-label">Quiz Title</label>
        <input
          id="wd-title"
          className="form-control"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <ReactQuill theme="snow" value={description} onChange={setDescription} />
      </div>
      <div className="mb-3">
        <label className="form-label">Assignment Group</label>
        <select
          className="form-select"
          value={assignmentGroup}
          onChange={(e) => setAssignmentGroup(e.target.value)}
        >
          <option value="Quizzes">Quizzes</option>
          <option value="Exams">Exams</option>
          <option value="Assignments">Assignments</option>
          <option value="Project">Project</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Quiz Type</label>
        <select
          className="form-select"
          value={quizType}
          onChange={(e) => setQuizType(e.target.value)}
        >
          <option value="Graded Quiz">Graded Quiz</option>
          <option value="Practice Quiz">Practice Quiz</option>
          <option value="Graded Survey">Graded Survey</option>
          <option value="Ungraded Survey">Ungraded Survey</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Points</label>
        <input
          type="number"
          className="form-control"
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Shuffle Answers</label>
        <select
          className="form-select"
          value={shuffleAnswers ? "Yes" : "No"}
          onChange={(e) => setShuffleAnswers(e.target.value === "Yes")}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Time Limit (Minutes)</label>
        <input
          type="number"
          className="form-control"
          value={timeLimit}
          onChange={(e) => setTimeLimit(parseInt(e.target.value) || 0)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Multiple Attempts</label>
        <select
          className="form-select"
          value={allowMultipleAttempts ? "Yes" : "No"}
          onChange={(e) => setAllowMultipleAttempts(e.target.value === "Yes")}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      {allowMultipleAttempts && (
      <div className="mb-3">
        <label className="form-label">Attempt Limit</label>
        <input
          type="number"
          className="form-control"
          value={attemptLimit}
          onChange={(e) => setAttemptLimit(parseInt(e.target.value) || 1)}
          min="1"
        />
      </div>
       )}
      <div className="mb-3">
        <label className="form-label">Show Corrected Answers</label>
        <select
          className="form-select"
          value={showCorrectedAnswers ? "Yes" : "No"}
          onChange={(e) => setShowCorrectedAnswers(e.target.value === "Yes")}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Access Code</label>
        <input
          type="text"
          className="form-control"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">One Question at a Time</label>
        <select
          className="form-select"
          value={oneQuestionAtATime ? "Yes" : "No"}
          onChange={(e) => setOneQuestionAtATime(e.target.value === "Yes")}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Webcam Required</label>
        <select
          className="form-select"
          value={webCamRequired ? "Yes" : "No"}
          onChange={(e) => setWebCamRequired(e.target.value === "Yes")}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Lock Questions After Answering</label>
        <select
          className="form-select"
          value={lockQuestionsAfterAnswering ? "Yes" : "No"}
          onChange={(e) => setLockQuestionsAfterAnswering(e.target.value === "Yes")}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Available From</label>
          <input
            type="date"
            className="form-control"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Available Until</label>
          <input
            type="date"
            className="form-control"
            value={availableUntil}
            onChange={(e) => setAvailableUntil(e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderQuestionsTab = () => (
    <QuizQuestions />
  );

  return (
    <div id="wd-quiz-editor" className="p-4">
      <h3>{isEditing ? "Edit Quiz" : "Create New Quiz"}</h3>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </a>
        </li>
        {isEditing && (
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
              onClick={() => setActiveTab("questions")}
            >
              Questions
            </a>
          </li>
        )}
      </ul>
      {activeTab === "details" && renderDetailsTab()}
      {activeTab === "questions" && renderQuestionsTab()}
      <div className="text-end mt-4">
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
