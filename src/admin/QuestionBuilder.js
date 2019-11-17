import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import QuestionOptionsBuilder from './QuestionOptionsBuilder';

export default class QuestionBuilder extends React.Component {
  getSpecializedQuestionBuilder() {
    const questionType = this.props.question.type;

    if (questionType === 'radio' || questionType === 'checkbox') {
      return <QuestionOptionsBuilder
              type={this.props.question.type}
              data={this.props.question.data}
              onDataChange={this.props.onDataChange}/>
    }
  }

  render() {
    const specializedQuestionBuilder = this.getSpecializedQuestionBuilder();

    return (
      <div className="card bg-light mt-3 mb-4">
        <div className="card-body">
          <div className="row">

            <Form.Group className="col-lg-9">
              <Form.Control
                  as="textarea"
                  rows="1"
                  placeholder="Question"
                  value={this.props.question.text}
                  onChange={this.props.onTextChange} />
            </Form.Group>

            <Form.Group className="col-lg-3">
              <Form.Control
                  as="select"
                  value={this.props.question.type}
                  onChange={this.props.onTypeChange}>
                <option value="radio">Multiple choice</option>
                <option value="checkbox">Checkboxes</option>
                <option value="text">Short answer</option>
                <option value="email">Email</option>
                <option value="textarea">Paragraph</option>
                <option value="range">Linear scale</option>
              </Form.Control>
            </Form.Group>
          </div>

          {specializedQuestionBuilder}

          <Button variant="outline-danger" size="sm" onClick={this.props.onRemove}>Delete question</Button>
        </div>
      </div>
    );
  }
}
