import React from 'react';
import Form from 'react-bootstrap/Form';

class QuestionInput extends React.Component {
  render() {
    return (
      <div className="question-input">
        <Form.Group>
          <Form.Control
              type="text"
              size="lg"
              placeholder="Question"
              value={this.props.question.text}
              onChange={this.props.onQuestionTextChange} />
        </Form.Group>
      </div>
    );
  }
}

export default QuestionInput;