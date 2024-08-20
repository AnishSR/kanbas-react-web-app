import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "./client";
import { AxiosError } from 'axios';

export default function QuizPreview() {
    console.log('Rendering QuizPreview component');
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.accountReducer.currentUser);
    const quiz = useSelector((state: any) =>
        state.quizReducer.quizzes.find((q: any) => q._id === qid)
    );
    const [answers, setAnswers] = useState<any>({});
    const [score, setScore] = useState<number | null>(null);

    useEffect(() => {
        console.log('Quiz data:', quiz);

        if (!quiz) {
            console.error("Quiz not found or not loaded.");
            return;
        }

        const fetchUserAnswers = async () => {
            try {
                const userAnswers = await client.getUserAnswers(qid!, user._id);
                if (Object.keys(userAnswers).length === 0) {
                    console.log("No previous answers found for this user.");
                    setAnswers({}); 
                } else {
                    setAnswers(userAnswers);
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response && error.response.status === 404) {
                        console.log("No answers found, starting fresh.");
                        setAnswers({}); 
                    } else {
                        console.error("Failed to load user answers:", error);
                    }
                } else {
                    console.error("An unknown error occurred:", error);
                }
            }
        };
        fetchUserAnswers();
    }, [qid, user._id, quiz]);

    const handleAnswerChange = (questionId: string, answer: any) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleSubmit = async () => {
        try {
            const formattedAnswers = Object.keys(answers).map(questionId => ({
                questionId: questionId,
                answer: answers[questionId]
            }));

            console.log('Submitting formatted answers:', formattedAnswers);

            const calculatedScore = await client.submitQuiz(qid!, user._id, formattedAnswers);
            setScore(calculatedScore);
            navigate(`/Kanbas/Courses/${cid}/Quizzes`);
        } catch (error) {
            console.error("Failed to submit quiz:", error);
        }
    };

    if (!quiz) {
        return <div>Loading quiz data...</div>;
    }

    return (
        <div className="quiz-preview">
            <h2>{quiz.title} - Preview</h2>
            {quiz.questions.map((question: any) => (
                <div key={question._id} className="mb-4">
                    <h5>{question.title}</h5>
                    <div dangerouslySetInnerHTML={{ __html: question.questionText }} />

                    {question.type === "multiple-choice" && (
                        <div>
                            {question.choices.map((choice: any, index: number) => (
                                <div key={index} className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name={`question-${question._id}`}
                                        checked={answers[question._id] === choice.text}
                                        onChange={() => handleAnswerChange(question._id, choice.text)}
                                    />
                                    <label className="form-check-label">{choice.text}</label>
                                </div>
                            ))}
                        </div>
                    )}

                    {question.type === "true-false" && (
                        <div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name={`question-${question._id}`}
                                    checked={answers[question._id] === true}
                                    onChange={() => handleAnswerChange(question._id, true)}
                                />
                                <label className="form-check-label">True</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name={`question-${question._id}`}
                                    checked={answers[question._id] === false}
                                    onChange={() => handleAnswerChange(question._id, false)}
                                />
                                <label className="form-check-label">False</label>
                            </div>
                        </div>
                    )}

                    {question.type === "fill-in-the-blank" && (
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                value={answers[question._id] || ""}
                                onChange={(e) =>
                                    handleAnswerChange(question._id, e.target.value)
                                }
                                placeholder="Your answer"
                            />
                        </div>
                    )}
                </div>
            ))}
            {(user.role === "STUDENT" || user.role === "FACULTY") && (
                <button className="btn btn-success" onClick={handleSubmit}>
                    Submit
                </button>
            )}
            {score !== null && <h4>Your Score: {score}</h4>}
            {user.role === "FACULTY" && (
                <button
                    className="btn btn-secondary mt-3"
                    onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`)}
                >
                    Edit Quiz
                </button>
            )}
        </div>
    );
}
