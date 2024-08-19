import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import QuizEditor from './QuizEditor';
import { useNavigate } from 'react-router-dom';

interface QuizData {
  title: string;
  assignmentGroup: string;
  quizType: string;
  availableFrom: string;
  availableUntil: string;
  dueDate: string;
  course?: string;  
}
interface QuizControlsProps {
  quizTitle: string;
  setQuizTitle: (title: string) => void;
  addQuiz: (quizData: QuizData) => void;
}


export default function QuizControls({ quizTitle, setQuizTitle, addQuiz }: QuizControlsProps) {
  const navigate = useNavigate();

  return (
    <div id="wd-quizzes-controls" className="text-nowrap">
      <button
        id="wd-add-quiz-btn"
        className="btn btn-lg btn-danger me-1 float-end"
        onClick={() => navigate("/Quizzes/new")}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: '1px' }} />
        Quiz
      </button>
    </div>
  );
}
