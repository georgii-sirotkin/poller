import React from 'react';
import Form from 'react-bootstrap/Form';

export default function FreeResponseInput({ onAnswerChange, question, answer }) {
  function handleChange(e) {
    onAnswerChange({ ...answer, value: e.target.value });
  }

  const inputType = question.specialized_question.input_type;

  if (inputType === 'text' || inputType === 'email') {
    return <Form.Control type={inputType} value={answer.value} onChange={handleChange} />
  }

  return <Form.Control as="textarea" rows="3" value={answer.value} onChange={handleChange} />
}