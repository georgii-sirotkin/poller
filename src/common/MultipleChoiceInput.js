import React from 'react';
import Form from 'react-bootstrap/Form';

export default class MultipleChoiceInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(answerOption, e) {
    const target = e.target;

    let value = null;

    if (target.type === 'radio') {
      value = answerOption.id;
    } else {
      value = [...this.props.answer.value];

      if (target.checked) {
        value.push(answerOption.id);
      } else {
        value = value.filter(answerOptionId => answerOptionId !== answerOption.id);
      }
    }

    const answer = {...this.props.answer, value};
    this.props.onAnswerChange(answer);
  }


  render() {
    const specializedQuestion = this.props.question.specialized_question;
    const inputType = specializedQuestion.only_one_answer_allowed ? 'radio' : 'checkbox';

    const inputs = specializedQuestion.answer_options.map(answerOption => {
      let isChecked = '';

      if (inputType === 'radio') {
        isChecked = this.props.answer.value === answerOption.id
      } else {
        isChecked = this.props.answer.value.includes(answerOption.id);
      }

      return (
        <Form.Check
          key={answerOption.id}
          type={inputType}
          label={answerOption.text}
          checked={isChecked}
          onChange={(e) => this.handleChange(answerOption, e)} />
      );
    });

    return (
        <>
          {inputs}
        </>
    )
  }
}
