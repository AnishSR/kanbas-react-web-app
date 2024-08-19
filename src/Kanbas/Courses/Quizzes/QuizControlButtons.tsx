import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
import { FaPencil } from "react-icons/fa6";

export default function QuizControlButtons({ quizId, deleteQuiz, editQuiz }: { quizId: string; deleteQuiz: (quizId: string) => void; editQuiz: (quizId: string) => void } ) {
  return (
    <div className="float-end">
      <FaPencil onClick={() => editQuiz(quizId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteQuiz(quizId)} />
      <GreenCheckmark />
      <BsPlus className="fs-4 me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
