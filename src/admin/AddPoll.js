import React, { useState } from 'react';
import QuestionBuilder from './QuestionBuilder';
import { Button, Alert, Form } from 'react-bootstrap';
import nanoid from 'nanoid';
import Config from '../Config';
import axios from 'axios';

export default function AddPoll() {
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState(() => [createNewQuestion()]);
  const [createdPoll, setCreatedPoll] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  function handlePollNameChange(e) {
    setName(e.target.value);
  }

  function handleQuestionTextChange(id, text) {
    setQuestions(questions => questions.map(
      question => (question.id === id) ? {...question, text} : question
    ));
  }

  function handleQuestionTypeChange(id, type) {
    setQuestions(questions => questions.map(
      question => {
        if (question.id !== id) {
          return question;
        }

        const changedQuestion = {...question, type};
        changedQuestion.data = getInitialDataForQuestion(changedQuestion);
        return changedQuestion;
      }
    ));
  }

  function handleQuestionDataChange(id, data) {
    setQuestions(questions => questions.map(
      question => (question.id === id) ? {...question, data} : question
    ));
  }

  function addQuestion() {
    setQuestions(questions => questions.concat(createNewQuestion()));
  }

  function removeQuestion(id) {
    setQuestions(questions => questions.filter(
      question => question.id !== id
    ));
  }

  function createPoll(e) {
    e.preventDefault();
    setIsSaving(true);

    const url = Config.apiUrl + '/admin/polls';
    const data = {
      name,
      questions
    };

    axios.post(url, data, {withCredentials: true})
      .then(response => {
        setCreatedPoll(response.data);
        setIsSaving(false);
      })
      .catch(error => {
        setIsSaving(false);

        if (error.response.status === 422) {
          alert('Invalid data');
          return;
        }

        if (error.response.status === 401) {
          alert('Session expired');
          window.location.reload(false);
          return;
        }

        alert('Something went wrong');
      })
  }

  function renderPageContent() {
    if (createdPoll) {
      const url = window.location.protocol + '//' + window.location.host + '/polls/' + createdPoll.access_token;

      return (
        <Alert variant="success" className="mt-4">
          Poll was successfully created! Shareable link: {url}<br />
        </Alert>
      );
    }

    return (
      <Form onSubmit={createPoll}>
        <div className="row">
          <div className="col-lg-7">
            <div className="mt-3 mb-4">
              <Form.Control
                  size="lg"
                  type="text"
                  value={name}
                  onChange={handlePollNameChange}
                  placeholder="Poll name"
                  required />
            </div>
            {renderQuestions()}
            <div>
              <Button variant="outline-primary" onClick={addQuestion}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus align-text-top"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add question</Button>
            </div>
            <hr className="mt-5 mb-4" />
            <div className="text-right mb-5 pb-5">
              <Button type="submit" variant="outline-primary" size="lg" disabled={isSaving}>
                Save poll
              </Button>
            </div>
          </div>
        </div>
      </Form>
    )
  }

  function renderQuestions() {
    return questions.map(question => {
      return (
          <QuestionBuilder
            question={question}
            key={question.id}
            onTextChange={(e) => handleQuestionTextChange(question.id, e.target.value)}
            onTypeChange={(e) => handleQuestionTypeChange(question.id, e.target.value)}
            onDataChange={(data) => handleQuestionDataChange(question.id, data)}
            onRemove={() => removeQuestion(question.id)}/>
      );
    });
  }

  return (
    <>
      <h1 className="h2">New Poll</h1>
      {renderPageContent()}
    </>
  );
}

function createNewQuestion() {
  const question = {
    id: nanoid(),
    type: 'radio',
    text: ''
  };

  question.data = getInitialDataForQuestion(question);
  return question;
}

function getInitialDataForQuestion(question) {
  if (question.type === 'radio' || question.type === 'checkbox') {
    if (question.data && question.data.options) {
      return question.data;
    }

    return {
      options: [{
        id: nanoid(),
        text: 'Option 1'
      }]
    }
  }

  return {};
}