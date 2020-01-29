import React, { useState, useEffect } from 'react';
import {
  Link,
  useRouteMatch
} from "react-router-dom";
import axios from 'axios';
import Config from '../Config';

export default function Polls()
{
  const [polls, setPolls] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const match = useRouteMatch();

  useEffect(() => {
    const url = Config.apiUrl + '/admin/polls';

    axios.get(url, { withCredentials: true })
      .then(response => {
        setPolls(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        alert('Something went wrong');
        setIsLoading(false);
      })
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!polls) {
    return <div>Failed to load polls.</div>
  }

  if (!polls.length) {
    return <div>No polls created yet.</div>
  }

  return (
    <>
      {polls.map(poll => {
        const linkText = `#${poll.id} ${poll.name} (${poll.responses_count} responses)`;

        return (
          <div key={poll.id}>
            <Link to={`${match.url}/${poll.id}`} className="lead">
              {linkText}
            </Link>
          </div>
        )
      })}
    </>
  );
}