import React from 'react';
import Form from 'react-bootstrap/Form';

export default class MultipleChoiceInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleOtherTextChange = this.handleOtherTextChange.bind(this);
  }

  handleChange(answerOption, e) {
    const target = e.target;
    let other = this.props.answer.other;
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

      value = [...this.props.answer.value];

      if (target.checked) {
        value.push(answerOption.id);
      } else {
        value = value.filter(answerOptionId => answerOptionId !== answerOption.id);
      }
    }

    const answer = {...this.props.answer, value, other};
    this.props.onAnswerChange(answer);
  }

  handleOtherTextChange(e) {
    const answer = {...this.props.answer, other: e.target.value};
    this.props.onAnswerChange(answer);
  }

  isOtherOptionSelected() {
    const answer = this.props.answer;
    const selectedOptions = (answer.value instanceof Array) ? answer.value : [answer.value];

    return this.props.question.specialized_question.answer_options.some(option => {
      return option.is_other && selectedOptions.includes(option.id);
    });
  }

  renderInputs() {
    const specializedQuestion = this.props.question.specialized_question;
    const inputType = specializedQuestion.only_one_answer_allowed ? 'radio' : 'checkbox';

    return specializedQuestion.answer_options.map(answerOption => {
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
  }

  render() {
    const inputs = this.renderInputs();
    const selectedOtherOption = this.isOtherOptionSelected();

    const otherInput = (
      <div className="mt-3">
        <Form.Label>Please specify</Form.Label>
        <Form.Control type="text" value={this.props.answer.other} onChange={this.handleOtherTextChange} />
      </div>
    );

    return (
        <>
          {inputs}
          {selectedOtherOption && otherInput}
        </>
    )
  }
}
