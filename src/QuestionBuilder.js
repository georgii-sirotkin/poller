import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import QuestionOptionsBuilder from './QuestionOptionsBuilder';

export default class QuestionBuilder extends React.Component {
  getSpecializedQuestionBuilder() {
    const questionType = this.props.question.type;

    if (questionType === 'multiple') {
      return <QuestionOptionsBuilder
              data={this.props.question.data}
              onDataChange={this.props.onDataChange}/>
    }
  }

  render() {
    const specializedQuestionBuilder = this.getSpecializedQuestionBuilder();

    return (
      <div className="question-input">
        <Form.Group>
          <Form.Control
              type="text"
              size="lg"
              placeholder="Question"
              value={this.props.question.text}
              onChange={this.props.onTextChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Question type</Form.Label>
          <Form.Control
              as="select"
              value={this.props.question.type}
              onChange={this.props.onTypeChange}>
            <option value="multiple">Multiple choice</option>
            <option value="checkboxes">Checkboxes</option>
            <option value="textInput">Short answer</option>
            <option value="textarea">Paragraph</option>
            <option value="range">Linear scale</option>
          </Form.Control>
        </Form.Group>

        {specializedQuestionBuilder}

        <Form.Group>
          <Button variant="outline-danger" onClick={this.props.onRemove}>Delete question</Button>
        </Form.Group>
      </div>
    );
  }
}
