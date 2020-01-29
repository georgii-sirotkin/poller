import React from 'react';
import FreeResponseInput from './FreeResponseInput';
import MultipleChoiceInput from './MultipleChoiceInput';

export default function AnswerInput({ question, answer, onAnswerChange }) {
  if (question.specialized_question_type === 'freeResponse') {
    return (
      <FreeResponseInput
        answer={answer}
        question={question}
        onAnswerChange={onAnswerChange} />
    );
  }

  return (
    <MultipleChoiceInput
      answer={answer}
      question={question}
      onAnswerChange={onAnswerChange} />
  );
}
