import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const updateQuiz = async (quiz: any) => {
    const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};


export const addQuestion = async (quizId: string, question: any) => {
    try {
        console.log('Sending question data to server:', question);
        const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
        console.log('Response from server after adding question:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding question:', error);
        throw error; 
    }
};


export const updateQuestion = async (quizId: string, questionId: string, question: any) => {
    const response = await axios.put(`${QUIZZES_API}/${quizId}/questions/${questionId}`, question);
    return response.data;
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
    return response.data;
};

export const getUserAnswers = async (quizId: string, userId: string) => {
    try {
      const response = await axios.get(`${QUIZZES_API}/${quizId}/answers/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user answers:', error);
      throw error;
    }
  };

export const submitQuiz = async (quizId: string, userId: string, answers: any) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/answers`, { userId, answers });
  return response.data;
};

