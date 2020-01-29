import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import nanoid from 'nanoid';
import orderBy from 'lodash.orderby';

export default function AnswerOptionsBuilder({ type, data, onDataChange }) {
  function handleOptionTextChange(id, text) {
    const options = data.options.map(option => option.id === id ? {...option, text} : option);
    onDataChange({ ...data, options });
  }

  function addOption() {
    const optionNumber = data.options.length + 1;

    const options = data.options.concat({
      id: nanoid(),
      text: 'Option ' + optionNumber
    });

    onDataChange({ ...data, options });
  }

  function addOtherOption() {
    const options = data.options.concat({
      id: nanoid(),
      text: 'Other',
      is_other: true
    });

    onDataChange({ ...data, options });
  }

  function removeOption(id) {
    const options = data.options.filter(option => option.id !== id);
    onDataChange({ ...data, options });
  }

  function renderOptions() {
    const sortedOptions = orderBy(data.options, ['is_other'], ['desc']);

    return sortedOptions.map(option => {
      const inputClassName = option.is_other ? 'bg-white' : '';

      return (
        <Form.Group key={option.id}>
          <InputGroup>
            <InputGroup.Prepend>
              {type === 'checkbox' ? <InputGroup.Checkbox disabled /> : <InputGroup.Radio disabled />}
            </InputGroup.Prepend>
            <Form.Control
                type="text"
                value={option.text}
                onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                className={inputClassName}
                disabled={option.is_other}
                required />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={() => removeOption(option.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      )
    });
  }

  const hasOtherOption = data.options.some(option => option.is_other);

  return (
    <div>
      {renderOptions()}
      <Form.Group>
        <Button variant="outline-primary" size="sm" onClick={addOption}>Add option</Button>
        {!hasOtherOption && <Button variant="outline-primary" size="sm" className="ml-2" onClick={addOtherOption}>Add "Other"</Button>}
      </Form.Group>
      <hr className="mt-4" />
    </div>
  );
}