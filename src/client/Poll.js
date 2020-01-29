import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import LoadingPage from '../common/LoadingPage';
import Config from '../Config';
import AnswerInput from "../common/AnswerInput";

export default function Poll() {
  const [poll, setPoll] = useState(null);
  const [isLoadingPoll, setIsLoadingPoll] = useState(true);
  const [answers, setAnswers] = useState(null);
  const [isSavingResponse, setIsSavingResponse] = useState(false);
  const [isResponseSaved, setIsResponseSaved] = useState(false);
  const { token } = useParams();

  function handleAnswerChange(changedAnswer) {
    setAnswers(answers => answers.map(
      answer => answer.question_id === changedAnswer.question_id ? changedAnswer : answer)
    );
  }

  function saveResponse(event) {
    event.preventDefault();
    setIsSavingResponse(true);

    const url = Config.apiUrl + '/responses';
    const data = {
      poll_access_token: poll.access_token,
      answers
    };

    axios.post(url, data)
      .then(response => {
        setIsSavingResponse(false);
        setIsResponseSaved(true);
      })
      .catch(error => {
        alert('Something went wrong');
        setIsSavingResponse(false);
      });
  }

  function renderPageContent() {
    if (!poll) {
      return <h1>Poll not found</h1>
    }

    if (isResponseSaved) {
      return (
        <>
          <h1>{poll.name}</h1>
          <Alert variant="success" className="mt-4">
            Your response was saved!
          </Alert>
        </>
      );
    }

    return (
      <>
        <h1>{poll.name}</h1>
        <Form onSubmit={saveResponse}>
          {renderAnswerInputs()}
          <hr className="mt-5 mb-4" />
          <div className="text-right mb-4">
            <Button
              variant="primary"
              type="submit"
              disabled={isSavingResponse}>
              Save response
            </Button>
          </div>
        </Form>
      </>
    );
  }

  function renderAnswerInputs() {
    return answers.map((answer, index) => {
      const question = poll.questions[index];

      return (
        <div key={question.id} className="mt-4">
          <h5>{question.text}</h5>
          <AnswerInput
            answer={answer}
            question={question}
            onAnswerChange={handleAnswerChange} />
        </div>
      );
    });
  }

  useEffect(() => {
    const url = Config.apiUrl + '/polls/' + token;

    axios.get(url)
      .then(response => {
        const poll = response.data;
        const answers = poll.questions.map(question => createAnswerForQuestion(question));
        setPoll(poll);
        setAnswers(answers);
        setIsLoadingPoll(false);
      })
      .catch(error => {
        setIsLoadingPoll(false);
      });
  }, [token]);

  if (isLoadingPoll) {
    return <LoadingPage />
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col xl={{span: 10, offset: 1}}>
          <Row>
            <Col xl={{span: 6, offset: 3}}>
              {renderPageContent()}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

function createAnswerForQuestion(question) {
  const answer = {
    question_id: question.id,
  };

  const questionType = question.specialized_question_type;

  if (questionType === 'freeResponse') {
    answer.value = '';
  }

  if (questionType === 'multipleChoice') {
    answer.other = '';

    if (question.specialized_question.only_one_answer_allowed) {
      answer.value = '';
    } else {
      answer.value = [];
    }
  }

  return answer;
}