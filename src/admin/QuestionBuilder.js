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
      <div className="card bg-light question-builder mt-3 mb-4">
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

          <Button variant="outline-danger" size="sm" onClick={this.props.onRemove}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg> Delete question</Button>
        </div>
      </div>
    );
  }
}
