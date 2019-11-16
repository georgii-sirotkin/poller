import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
        <Form.Group>
          <Button variant="outline-danger" onClick={this.props.onRemoveQuestion}>Delete question</Button>
        </Form.Group>
      </div>
    );
  }
}

export default QuestionInput;