import { useParams, useNavigate } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducer";
import * as client from "./client";
import { useState, useEffect } from "react";


export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizzes = useSelector((state: any) => state.quizReducer.quizzes.filter((quiz: any) => quiz.course === cid));
  const user = useSelector((state: any) => state.accountReducer.currentUser); 

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
  }

  function getAvailabilityStatus(quiz: any): string {
    const now = new Date();
    const availableFrom = new Date(quiz.availableFrom);
    const availableUntil = new Date(quiz.availableUntil);

    if (now > availableUntil) {
      return "Closed";
    } else if (now >= availableFrom && now <= availableUntil) {
      return "Available";
    } else if (now < availableFrom) {
      return `Not available until ${formatDate(quiz.availableFrom)}`;
    }
    return "Unavailable";
  }


  const removeQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const togglePublish = async (quiz: any) => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const handleDelete = (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      removeQuiz(quizId);
    }
  };
  const getScoreForStudent = (quiz: any) => {
    if (!user || user.role !== "STUDENT") return null;
    const studentScores = quiz.scores && Array.isArray(quiz.scores) ? quiz.scores : [];
    const studentScore = studentScores.find((score: any) => score.studentId === user._id);
    return studentScore ? studentScore.score : "No attempts made";
  };

  return (
    <div id="wd-quizzes" className="flex-grow-1 p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <FaSearch />
          </span>
          <input
            id="wd-search-quiz"
            type="text"
            className="form-control border-start-0"
            placeholder="Search for Quizzes"
          />
          <button id="wd-add-quiz" className="btn btn-danger" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/new/edit`)}>
            <FaPlus className="me-2" />
            Quiz
          </button>
        </div>
      </div>
      <h3 id="wd-quizzes-title" className="mb-3">
        QUIZZES
      </h3>
      <ul id="wd-quiz-list" className="list-unstyled">
        {quizzes.map((quiz: any) => (
          <li key={quiz._id} className="wd-quiz-list-item p-3 mb-2 border-start border-5 border-success d-flex justify-content-between align-items-center">
            <div>
            <a
              className="wd-quiz-link text-decoration-none text-dark fw-bold"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`)}
            >
              {quiz.title}
            </a>
            <p className="mb-0 text-muted">
              <strong>Due</strong> {formatDate(quiz.dueDate)} | <strong>Available From</strong> {formatDate(quiz.availableFrom)} |
            </p>
            <p className="mb-0 text-muted">
              <strong>Availability:</strong> {getAvailabilityStatus(quiz)}
            </p>
            <p className="mb-0 text-muted">
                <strong>Points:</strong> {quiz.points} | <strong>Number of Questions:</strong> {quiz.questions ? quiz.questions.length : 0}
            </p>
            {user && user.role === "STUDENT" && (
              <p className="mb-0 text-muted">
                <strong>Score:</strong> {getScoreForStudent(quiz)}
              </p>
            )}
            </div>
            <div className="d-flex align-items-center">
              <span
                className="me-3"
                style={{ cursor: "pointer", fontSize: "1.5rem" }}
                onClick={() => togglePublish(quiz)}
                title={quiz.published ? "Unpublish Quiz" : "Publish Quiz"}
              >
                {quiz.published ? "✅" : "🚫"}
              </span>
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id={`quiz-${quiz._id}-menu`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <BsThreeDotsVertical />
                </button>
                <ul className="dropdown-menu" aria-labelledby={`quiz-${quiz._id}-menu`}>
                  <li>
                    <a className="dropdown-item" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit`)}>
                      Edit
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={() => handleDelete(quiz._id)}>
                      Delete
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={() => togglePublish(quiz)}>
                      {quiz.published ? "Unpublish" : "Publish"}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
