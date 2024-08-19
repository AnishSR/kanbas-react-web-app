import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
  const user = useSelector((state: any) => state.accountReducer.currentUser); // Get current user
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  if (!quiz) {
    return <p>Quiz not found.</p>;
  }

  return (
    <div id="wd-quiz-details" className="p-4">
      <h3>Quiz Details</h3>
      <p><strong>Title:</strong> {quiz.title}</p>
      <p><strong>Description:</strong> {quiz.description}</p>
      <p><strong>Assignment Group:</strong> {quiz.assignmentGroup}</p>
      <p><strong>Quiz Type:</strong> {quiz.quizType}</p>
      <p><strong>Points:</strong> {quiz.points}</p>
      <p><strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? "Yes" : "No"}</p>
      <p><strong>Time Limit:</strong> {quiz.timeLimitEntry} Minutes</p>
      <p><strong>Multiple Attempts:</strong> {quiz.allowMultipleAttempts ? "Yes" : "No"}</p>
      <p><strong>Show Correct Answers:</strong> {quiz.showCorrectedAnswers ? "Yes" : "No"}</p>
      <p><strong>Access Code:</strong> {quiz.accessCodeEntry || "None"}</p>
      <p><strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? "Yes" : "No"}</p>
      <p><strong>Webcam Required:</strong> {quiz.webCamRequired ? "Yes" : "No"}</p>
      <p><strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</p>
      <p><strong>Due Date:</strong> {quiz.dueDate}</p>
      <p><strong>Available From:</strong> {quiz.availableFrom}</p>
      <p><strong>Available Until:</strong> {quiz.availableUntil}</p>

      {user.role === "FACULTY" ? (
        <>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`)}
          >
            Edit Quiz
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`)}
          >
            Preview Quiz
          </button>
        </>
      ) : (
        user.role === "STUDENT" && quiz.published && (
          <button
            className="btn btn-success"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/take`)}
          >
            Take Quiz
          </button>
        )
      )}
    </div>
  );
}
