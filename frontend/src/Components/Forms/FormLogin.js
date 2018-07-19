import React, { Component } from 'react';

export default class FormLogin extends Component {
    constructor(props){
    	super(props);
    	this.state = {
            number: ''
        };
    }

    resetField() {
        const number = "";

        this.setState({ number });
    }

    onChange(e) {
        this.setState({ number: e.target.value });
    }

    enter() {
        const {
            number
        } = this.state;

        if (number !== '') {
            this.props.enterInSMSTable(number);
        }
    }

    render() {
        const {
            number
        } = this.state;

        return (
            <div className="container">

                <div className="field">
                  <label className="label">Number</label>
                  <div className="control">
                    <input
                        className="input"
                        placeholder="type your number"
                        value={number}
                        onChange={this.onChange.bind(this)}
                    />
                  </div>
                </div>


                <div className="field is-grouped">
                  <div className="control">
                    <button
                        className="button is-link"
                        onClick={this.enter.bind(this)}
                    >
                        Enter
                    </button>
                  </div>
                  <div className="control">
                    <button
                        className="button is-text"
                        onClick={this.resetField.bind(this)}
                    >
                        Reset
                    </button>
                  </div>
                </div>
            </div>
        );
    }
}
