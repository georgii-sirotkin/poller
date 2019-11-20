import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import nanoid from 'nanoid';
import orderBy from 'lodash.orderby';

export default class QuestionOptionsBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.addOption = this.addOption.bind(this);
    this.addOtherOption = this.addOtherOption.bind(this);
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

  addOtherOption() {
    const options = this.props.data.options.concat([
      {
        id: nanoid(),
        text: 'Other',
        is_other: true
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

  renderOptions() {
    const sortedOptions = orderBy(this.props.data.options, ['is_other'], ['desc']);

    return sortedOptions.map((option) => {
      const inputClassName = option.is_other ? 'bg-white' : '';

      return (
        <Form.Group key={option.id}>
          <InputGroup>
            <InputGroup.Prepend>
              {this.props.type === 'checkbox' ? <InputGroup.Checkbox disabled /> : <InputGroup.Radio disabled />}
            </InputGroup.Prepend>
            <Form.Control
                type="text"
                value={option.text}
                onChange={(e) => this.handleOptionTextChange(option.id, e.target.value)}
                className={inputClassName}
                disabled={option.is_other}
                required />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={() => this.removeOption(option.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      )
    });
  }

  render() {
    const hasOtherOption = this.props.data.options.some(option => option.is_other);

    return (
      <div>
        {this.renderOptions()}
        <Form.Group>
          <Button variant="outline-primary" size="sm" onClick={this.addOption}>Add option</Button>
          {!hasOtherOption && <Button variant="outline-primary" size="sm" className="ml-2" onClick={this.addOtherOption}>Add "Other"</Button>}
        </Form.Group>
        <hr className="mt-4" />
      </div>
    );
  }
}