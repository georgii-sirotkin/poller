import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Config from '../Config';

export default function Poll()
{
  const [poll, setPoll] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const url = Config.apiUrl + '/admin/polls/' + id;
    setIsLoading(true);

    axios.get(url, {withCredentials: true})
      .then(response => {
        setPoll(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        alert('Something went wrong');
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!poll) {
    return <div>Poll not found</div>
  }

  return renderPoll(poll);
}

function renderPoll(poll)
{
  const shareableUrl = window.location.protocol + '//' + window.location.host + '/polls/' + poll.access_token;

  return (
    <div className="mb-4">
      <h1>{poll.name}</h1>
      <strong>Shareable link:</strong> {shareableUrl}
      <h3 className="mt-4">Responses:</h3>
      {renderResponses(poll.responses)}
    </div>
  )
}

function renderResponses(responses) {
  return responses.map(response => (
    <div key={response.id} className="mt-4">
      <h5>Response #{response.id}</h5>
      {renderAnswers(response.answers)}
    </div>
  ));
}

function renderAnswers(answers) {
  return answers.map(answer => (
    <div key={answer.id} className="mt-3">
      <div><strong>{answer.question.text}</strong></div>
      <div className="lead">{answer.text}</div>
    </div>
  ));
}