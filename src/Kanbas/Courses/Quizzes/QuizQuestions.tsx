import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addQuestion, updateQuestion, deleteQuestion } from './reducer';
import * as client from './client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuizQuestions = () => {
    const { qid } = useParams();
    const dispatch = useDispatch();
    const quiz = useSelector((state: any) => state.quizReducer.quizzes.find((q: any) => q._id === qid));
    const [editingQuestion, setEditingQuestion] = useState<any | null>(null);

    const handleAddQuestion = () => {
        const newQuestion = {
            title: '',
            points: 0,
            questionText: '',
            type: 'multiple-choice',
            choices: [{ text: '', isCorrect: false }],
            correctAnswers: [],
        };
        console.log('Creating new question:', newQuestion);
        setEditingQuestion(newQuestion);
    };
    

    const handleEditQuestion = (question: any) => {
        setEditingQuestion({ ...question });
    };

    const handleDeleteQuestion = async (questionId: string) => {
        if (!questionId) {
            console.error("Question ID is missing");
            return;
        }

        try {
            console.log('Deleting question with ID:', questionId);
            await client.deleteQuestion(qid!, questionId);
            dispatch(deleteQuestion({ quizId: qid!, questionId }));
        } catch (error) {
            console.error("Failed to delete the question:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingQuestion(null);
    };

    const handleSaveQuestion = async () => {
        if (!editingQuestion.title || editingQuestion.title.trim() === '') {
            console.error('Question title is missing or empty!');
            return;
        }
    
        try {
            if (editingQuestion._id) {
                console.log('Updating question:', editingQuestion);
                const updatedQuestion = await client.updateQuestion(qid!, editingQuestion._id, editingQuestion);
                dispatch(updateQuestion({ quizId: qid!, question: updatedQuestion }));
            } else {
                console.log('Adding new question:', editingQuestion);
                const savedQuestion = await client.addQuestion(qid!, editingQuestion);
                console.log(savedQuestion)
                dispatch(addQuestion({ quizId: qid!, question: savedQuestion }));
            }
            setEditingQuestion(null);
        } catch (error) {
            console.error("Error saving question:", error);
        }
    };
    

    const handleQuestionChange = (field: string, value: any) => {
        setEditingQuestion({ ...editingQuestion, [field]: value });
    };

    const handleChoiceChange = (index: number, field: string, value: any) => {
        const updatedChoices = editingQuestion.choices.map((choice: any, i: number) =>
            i === index ? { ...choice, [field]: value } : choice
        );
        setEditingQuestion({ ...editingQuestion, choices: updatedChoices });
    };

    const addChoice = () => {
        setEditingQuestion({
            ...editingQuestion,
            choices: [...editingQuestion.choices, { text: '', isCorrect: false }],
        });
    };

    const removeChoice = (index: number) => {
        const updatedChoices = editingQuestion.choices.filter((_: any, i: number) => i !== index);
        setEditingQuestion({ ...editingQuestion, choices: updatedChoices });
    };

    const handleCorrectAnswerChange = (index: number) => {
        const updatedChoices = editingQuestion.choices.map((choice: any, i: number) => ({
            ...choice,
            isCorrect: i === index,
        }));
        setEditingQuestion({ ...editingQuestion, choices: updatedChoices });
    };

    const renderQuestionForm = () => (
        <div className="question-editor card p-3 mt-3">
            <div className="mb-3">
                <label className="form-label">Question Type</label>
                <select
                    className="form-select"
                    value={editingQuestion.type}
                    onChange={(e) => handleQuestionChange('type', e.target.value)}
                >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="fill-in-the-blank">Fill in the Blank</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={editingQuestion.title}
                    onChange={(e) => handleQuestionChange('title', e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Points</label>
                <input
                    type="number"
                    className="form-control"
                    value={editingQuestion.points}
                    onChange={(e) => handleQuestionChange('points', parseInt(e.target.value) || 0)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Question Text</label>
                <ReactQuill
                    theme="snow"
                    value={editingQuestion.questionText}
                    onChange={(value) => handleQuestionChange('questionText', value)}
                />
            </div>

            {editingQuestion.type === 'multiple-choice' && (
                <div className="mb-3">
                    <label className="form-label">Choices</label>
                    {editingQuestion.choices.map((choice: any, index: number) => (
                        <div key={index} className="input-group mb-2">
                            <textarea
                                className="form-control"
                                value={choice.text}
                                onChange={(e) => handleChoiceChange(index, 'text', e.target.value)}
                            />
                            <div className="input-group-text">
                                <input
                                    type="radio"
                                    name="correctAnswer"
                                    checked={choice.isCorrect}
                                    onChange={() => handleCorrectAnswerChange(index)}
                                />
                            </div>
                            <button
                                className="btn btn-danger"
                                onClick={() => removeChoice(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button className="btn btn-secondary mt-2" onClick={addChoice}>
                        Add Choice
                    </button>
                </div>
            )}

            {editingQuestion.type === 'true-false' && (
                <div className="mb-3">
                    <label className="form-label">Correct Answer</label>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="isTrue"
                            checked={editingQuestion.isTrue === true}
                            onChange={() => handleQuestionChange('isTrue', true)}
                        />
                        <label className="form-check-label">True</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="isTrue"
                            checked={editingQuestion.isTrue === false}
                            onChange={() => handleQuestionChange('isTrue', false)}
                        />
                        <label className="form-check-label">False</label>
                    </div>
                </div>
            )}

            {editingQuestion.type === 'fill-in-the-blank' && (
                <div className="mb-3">
                    <label className="form-label">Correct Answers</label>
                    {editingQuestion.correctAnswers.map((answer: any, index: number) => (
                        <div key={index} className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                value={answer.text}
                                onChange={(e) =>
                                    handleQuestionChange(
                                        'correctAnswers',
                                        editingQuestion.correctAnswers.map((a: any, i: number) =>
                                            i === index ? { ...a, text: e.target.value } : a
                                        )
                                    )
                                }
                            />
                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    handleQuestionChange(
                                        'correctAnswers',
                                        editingQuestion.correctAnswers.filter((_: any, i: number) => i !== index)
                                    )
                                }
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={() =>
                            handleQuestionChange('correctAnswers', [
                                ...editingQuestion.correctAnswers,
                                { text: '' },
                            ])
                        }
                    >
                        Add Answer
                    </button>
                </div>
            )}

            <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-secondary me-2" onClick={handleCancelEdit}>
                    Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveQuestion}>
                    Save
                </button>
            </div>
        </div>
    );

    const totalPoints = quiz?.questions.reduce((acc: any, q: any) => acc + q.points, 0) || 0;

    return (
        <div className="quiz-questions">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Quiz Questions</h3>
                <button className="btn btn-success" onClick={handleAddQuestion}>
                    New Question
                </button>
            </div>

            {quiz?.questions?.length ? (
                <ul className="list-group">
                    {quiz.questions.map((question: any) => (
                        <li key={question._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{question.title}</h5>
                                <p>Points: {question.points}</p>
                                <p>Type: {question.type}</p>
                            </div>
                            <div>
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => handleEditQuestion(question)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteQuestion(question._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No questions added yet.</p>
            )}

            <h4 className="mt-3">Total Points: {totalPoints}</h4>

            {editingQuestion && renderQuestionForm()}
        </div>
    );
};

export default QuizQuestions;
