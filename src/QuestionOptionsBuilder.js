import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import nanoid from 'nanoid';

export default class MultipleChoiceQuestionBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.addOption = this.addOption.bind(this);
  }

  handleOptionTextChange(id, text) {
    const options = this.props.data.options.map(option => option.id === id ? {...option, text} : option);
    const data = {...this.props.data, options};
    this.props.onDataChange(data);
  }

  addOption() {
    const optionNumber = this.props.data.options.length + 1;

    const options = this.props.data.options.concat([
      {
        id: nanoid(),
        text: 'Option ' + optionNumber
      }
    ]);

    const data = {...this.props.data, options};
    this.props.onDataChange(data);
  }

  removeOption(id) {
    const options = this.props.data.options.filter(option => option.id !== id);
    const data = {...this.props.data, options};
    this.props.onDataChange(data);
  }

  render() {
    const options = this.props.data.options.map((option) => {
      return (
        <Form.Group key={option.id}>
          <InputGroup>
            <Form.Control
              type="text"
              value={option.text}
              onChange={(e) => this.handleOptionTextChange(option.id, e.target.value)} />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={() => this.removeOption(option.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      )
    });

    return (
      <div>
        {options}
        <Form.Group>
          <Button variant="outline-primary" onClick={this.addOption}>Add option</Button>
        </Form.Group>
      </div>
    );
  }
}