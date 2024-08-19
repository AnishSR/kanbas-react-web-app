import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, quiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (q: any) => q._id !== quizId
      );
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      )as any;
    },
    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, editing: true } : q
      ) as any;
    },
    addQuestion: (state, { payload: { quizId, question } }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId
          ? { ...q, questions: [...(q.questions || []), question] }
          : q
      ) as any;
    },
    
  
    updateQuestion: (state, { payload: { quizId, question } }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId
          ? {
              ...q,
              questions: q.questions.map((qstn: any) =>
                qstn._id === question._id ? question : qstn
              ),
            }
          : q
      ) as any;
      console.log('State after updating question:', state.quizzes);
    },
    deleteQuestion: (state, { payload: { quizId, questionId } }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId
          ? {
              ...q,
              questions: q.questions.filter((qstn: any) => qstn._id !== questionId),
            }
          : q
      )as any;
      console.log('State after deleting question:', state.quizzes);
    },

  },
});

export const {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  editQuiz,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;

