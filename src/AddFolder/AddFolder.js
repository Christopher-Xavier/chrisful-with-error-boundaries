import React, { Component } from 'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import './AddFolder.css';
import ApiContext from '../ApiContext';

export default class AddFolder extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      name: 'AddFolder',
      nameValid: false,
      validationMessage: 'isRequired'
    };
  }
  static contextType = ApiContext;

  isNameValid = event => {
    event.preventDefault();
    if (!this.state.name) {
      this.setState({
        validationMessage: 'isRequired',
        nameValid: false
      });
    } else {
      this.setState(
        {
          validationMessage: 'isRequired',
          nameValid: true
        },
        this.handleAddFolder()
      );
    }
  };

  handleAddFolder =() => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // id: cuid(),
        name: this.state.name
      })
    };
    console.log(options);

    fetch('"https://stark-thicket-28675.herokuapp.com", options')
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.context.handleAddFolder(data);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  };

  nameChange = letter => {
    this.setState({ name: letter });
  };

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm
          onSubmit={event => {
            this.isNameValid(event);
          }}
        >
          <div className='field'>
            <label htmlFor='AddFolder'>Name</label>
            <input
              type='text'
              id='folder-name-input'
              name='folder'
              onChange={event => this.nameChange(event.target.value)}
            />
            {!this.state.nameValid && (
              <div>
                <p>{this.state.validationMessage}</p>
              </div>
            )}
          </div>
          <div className='buttons'>
            <button type='submit'>Add folder</button>
          </div>
        </NotefulForm>
        {this.state.error && (
          <div>
            <p>{this.state.error}</p>
          </div>
        )}
      </section>
    );
  }
}