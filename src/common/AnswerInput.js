import React from 'react';
import FreeResponseInput from './FreeResponseInput';
import MultipleChoiceInput from './MultipleChoiceInput';

export default class AnswerInput extends React.Component {
  render() {
    if (this.props.question.specialized_question_type === 'freeResponse') {
      return <FreeResponseInput
              answer={this.props.answer}
              question={this.props.question}
              onAnswerChange={this.props.onAnswerChange} />
    }

    return <MultipleChoiceInput
            answer={this.props.answer}
            question={this.props.question}
            onAnswerChange={this.props.onAnswerChange} />
  }
}
