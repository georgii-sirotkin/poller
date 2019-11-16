import React from 'react';
import QuestionInput from './QuestionInput';
import Button from 'react-bootstrap/Button';

const questionTemplate = {
  type: 'Multiple',
  text: ''
};

class AddPoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [
        {...questionTemplate}
      ]
    };

    this.addQuestion = this.addQuestion.bind(this);
  }

  handleQuestionTextChange(index, text) {
    const questions = [...this.state.questions];
    questions[index].text = text;
    this.setState({questions});
  }

  addQuestion() {
    this.setState({
      questions: this.state.questions.concat({...questionTemplate})
    });
  }

  removeQuestion(index) {
    let questions = [...this.state.questions];
    questions.splice(index, 1);
    this.setState({questions});
  }

  render() {
    const questions = this.state.questions.map((question, index) => {
      return <QuestionInput
              question={question}
              key={index}
              onQuestionTextChange={(e) => this.handleQuestionTextChange(index, e.target.value)}
              onRemoveQuestion={() => this.removeQuestion(index)}/>
    });

    return (
        <>
          <h1 className="h2">New Poll</h1>
          {questions}
          <div>
            <Button variant="outline-primary" onClick={this.addQuestion}>Add question</Button>
          </div>
        </>
    )
  }
}

export default AddPoll;
