import React from 'react';
import Form from 'react-bootstrap/Form';
import orderBy from 'lodash.orderby';

export default function MultipleChoiceInput({ question, answer, onAnswerChange }) {
  function handleChange(answerOption, e) {
    const target = e.target;
    let other = answer.other;
    let value = null;

    if (target.type === 'radio') {
      if (!answerOption.is_other) {
        other = '';
      }

      value = answerOption.id;
    } else {
      if (answerOption.is_other && !target.checked) {
        other = '';
      }

      value = [...answer.value];

      if (target.checked) {
        value.push(answerOption.id);
      } else {
        value = value.filter(answerOptionId => answerOptionId !== answerOption.id);
      }
    }

    onAnswerChange({ ...answer, value, other });
  }

  function handleOtherTextChange(e) {
    onAnswerChange({ ...answer, other: e.target.value });
  }

  function isOtherOptionSelected() {
    const selectedOptions = (answer.value instanceof Array) ? answer.value : [answer.value];

    return question.specialized_question.answer_options.some(option => {
      return option.is_other && selectedOptions.includes(option.id);
    });
  }

  function renderInputs() {
    const specializedQuestion = question.specialized_question;
    const sortedOptions = orderBy(specializedQuestion.answer_options, ['is_other'], ['asc']);
    const inputType = specializedQuestion.only_one_answer_allowed ? 'radio' : 'checkbox';

    return sortedOptions.map(answerOption => {
      let isChecked;

      if (inputType === 'radio') {
        isChecked = answer.value === answerOption.id
      } else {
        isChecked = answer.value.includes(answerOption.id);
      }

      return (
        <Form.Check
          key={answerOption.id}
          type={inputType}
          label={answerOption.text}
          checked={isChecked}
          id={`answer-option-${answerOption.id}`}
          onChange={(e) => handleChange(answerOption, e)} />
      );
    });
  }

  const otherInput = (
    <div className="mt-3">
      <Form.Label>Please specify</Form.Label>
      <Form.Control type="text" value={answer.other} onChange={handleOtherTextChange} />
    </div>
  );

  return (
    <>
      {renderInputs()}
      {isOtherOptionSelected() && otherInput}
    </>
  );
}
