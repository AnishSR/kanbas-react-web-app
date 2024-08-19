import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateQuiz } from "./reducer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router";

export default function QuizQuestions() {
  const dispatch = useDispatch();
  const { qid } = useParams();
  const quiz = useSelector((state: any) =>
    state.quizReducer.quizzes.find((q: any) => q._id === qid)
  );

  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);

  const addNewQuestion = () => {
    const newQuestion = {
      title: "",
      points: 1,
      questionText: "",
      type: "multiple-choice",
      choices: [{ text: "", isCorrect: false }],
    };
    setEditingQuestion(newQuestion);
  };

  const handleQuestionChange = (field: string, value: any) => {
    setEditingQuestion({ ...editingQuestion, [field]: value });
  };

  const handleSaveQuestion = () => {
    const updatedQuestions = [...(quiz.questions || [])];
    if (editingQuestion._id) {
      const index = updatedQuestions.findIndex(
        (q) => q._id === editingQuestion._id
      );
      updatedQuestions[index] = editingQuestion;
    } else {
      updatedQuestions.push(editingQuestion);
    }

    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    dispatch(updateQuiz(updatedQuiz));
    setEditingQuestion(null);
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };

  return (
    <div className="quiz-questions">
      <h4>Quiz Questions</h4>
      <button className="btn btn-primary mb-3" onClick={addNewQuestion}>
        New Question
      </button>

      {quiz?.questions?.map((question: any, index: number) => (
        <div key={index} className="question-preview">
          <h5>{question.title || `Question ${index + 1}`}</h5>
          <p>Points: {question.points}</p>
          <p>{question.questionText}</p>
          <button
            className="btn btn-secondary me-2"
            onClick={() => setEditingQuestion(question)}
          >
            Edit
          </button>
        </div>
      ))}

      {editingQuestion && (
        <div className="question-editor mt-4">
          <h5>{editingQuestion._id ? "Edit Question" : "New Question"}</h5>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={editingQuestion.title}
              onChange={(e) =>
                handleQuestionChange("title", e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Points</label>
            <input
              type="number"
              className="form-control"
              value={editingQuestion.points}
              onChange={(e) =>
                handleQuestionChange("points", parseInt(e.target.value, 10))
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Question</label>
            <ReactQuill
              theme="snow"
              value={editingQuestion.questionText}
              onChange={(value) => handleQuestionChange("questionText", value)}
            />
          </div>

          {editingQuestion.type === "multiple-choice" && (
            <>
              <div className="mb-3">
                <label className="form-label">Choices</label>
                {editingQuestion.choices.map((choice: any, index: number) => (
                  <div key={index} className="input-group mb-2">
                    <input
                      type="radio"
                      className="form-check-input me-2"
                      checked={choice.isCorrect}
                      onChange={() => {
                        const updatedChoices = editingQuestion.choices.map(
                          (c: any, i: number) => ({
                            ...c,
                            isCorrect: i === index,
                          })
                        );
                        handleQuestionChange("choices", updatedChoices);
                      }}
                    />
                    <textarea
                      className="form-control"
                      value={choice.text}
                      onChange={(e) => {
                        const updatedChoices = [...editingQuestion.choices];
                        updatedChoices[index].text = e.target.value;
                        handleQuestionChange("choices", updatedChoices);
                      }}
                    />
                  </div>
                ))}
                <button
                  className="btn btn-secondary mb-2"
                  onClick={() =>
                    handleQuestionChange("choices", [
                      ...editingQuestion.choices,
                      { text: "", isCorrect: false },
                    ])
                  }
                >
                  Add Choice
                </button>
              </div>
            </>
          )}

          {editingQuestion.type === "true-false" && (
            <div className="mb-3">
              <label className="form-label">Correct Answer</label>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input me-2"
                  checked={editingQuestion.isTrue}
                  onChange={() => handleQuestionChange("isTrue", true)}
                />
                <label className="form-check-label">True</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input me-2"
                  checked={!editingQuestion.isTrue}
                  onChange={() => handleQuestionChange("isTrue", false)}
                />
                <label className="form-check-label">False</label>
              </div>
            </div>
          )}

          {editingQuestion.type === "fill-in-the-blank" && (
            <div className="mb-3">
              <label className="form-label">Correct Answers</label>
              {editingQuestion.correctAnswers.map(
                (answer: any, index: number) => (
                  <div key={index} className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={answer.text}
                      onChange={(e) => {
                        const updatedAnswers = [
                          ...editingQuestion.correctAnswers,
                        ];
                        updatedAnswers[index].text = e.target.value;
                        handleQuestionChange("correctAnswers", updatedAnswers);
                      }}
                    />
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => {
                        const updatedAnswers = editingQuestion.correctAnswers.filter(
                          (_: any, i: number) => i !== index
                        );
                        handleQuestionChange("correctAnswers", updatedAnswers);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )
              )}
              <button
                className="btn btn-secondary mb-2"
                onClick={() =>
                  handleQuestionChange("correctAnswers", [
                    ...editingQuestion.correctAnswers,
                    { text: "" },
                  ])
                }
              >
                Add Answer
              </button>
            </div>
          )}

          <div className="text-end">
            <button
              className="btn btn-success me-2"
              onClick={handleSaveQuestion}
            >
              Save Question
            </button>
            <button className="btn btn-secondary" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
