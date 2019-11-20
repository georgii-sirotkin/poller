import React from 'react';
import Form from 'react-bootstrap/Form';

export default class FreeResponseInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const answer = {...this.props.answer, value: e.target.value};
    this.props.onAnswerChange(answer);
  }

  render() {
    const inputType = this.props.question.specialized_question.input_type;

    if (inputType === 'text' || inputType === 'email') {
      return <Form.Control type={inputType} value={this.props.answer.value} onChange={this.handleChange} />
    }

    return <Form.Control as="textarea" rows="3" value={this.props.answer.value} onChange={this.handleChange} />
  }
}