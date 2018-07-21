import React, { Component } from 'react';
import {
  BootstrapTable,
  TableHeaderColumn,
  InsertModalHeader,
  InsertModalFooter
} from 'react-bootstrap-table';

export default class Tables extends Component {
    constructor(props){
        super(props);
        this.state = {
            newSMS: {
                to: '',
                from: this.props.from,
                message: ''
            },
            charLimit : 160,
            maxSplits : 15,
            indicator: '',
            breakPoint: '',
            messages : [],
            n: '',
            m:''
        };

        this.createCustomModalHeader = this.createCustomModalHeader.bind(this);
        this.createCustomModalBody = this.createCustomModalBody.bind(this);
        this.createCustomModalFooter = this.createCustomModalFooter.bind(this);
        this.beforeSend = this.beforeSend.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    createCustomModalHeader(closeModal, save) {
        return (
            <InsertModalHeader
              title='Send new SMS message'
            />
        );
    }

    beforeSend(e) {
        this.handleModalClose(e);
    }

    handleModalClose(closeModal) {
        closeModal();
    }

    onChange(e) {
        const state = this.state;

        state.newSMS[e.target.name] = e.target.value;

        if (e.target.name === 'message') {
            if (e.target.value === '') {
              state.newSMS[e.target.name] = '';
              state.charLimit = 160;
              state.maxSplits = 15;
              state.indicator = '(0/15)';
              state.breakPoint = '';
              state.messages = [];
              state.n = '';
              state.m = '';
            } else if (e.target.value.length > 160) {
              this.splitMessage();
            }
        }

        this.setState(state);
    }

    splitMessage() {
        const {
          messages,
          newSMS
        } = this.state;
        let n, m;
        let charLimit = 160;
        let breakPoint = '';
        let maxSplits = 15;
        let indicator = '';

        for (n = 0, m = 0; n < this.state.newSMS.message.length / charLimit && n < maxSplits; n++) {
            m = n * charLimit;
            // set the indicator so we can now how long it is
            indicator = '(' + (n + 1) + '/' + maxSplits + ')';
            // set the breakpoint, taking indicator length into consideration
            breakPoint = m + charLimit - indicator.length;
            // insert the indicator into the correct spot
            this.state.newSMS.message = this.state.newSMS.message.substring(0, breakPoint) +  this.state.newSMS.message.substring(breakPoint);
            // add a message (will be charLimit long and include the indicator)
            messages.push(
              {
                 from: newSMS.from,
                 to: newSMS.to,
                 message: this.state.newSMS.message.substring(m, m + charLimit)
              }
            );
        }

        this.setState({
            messages,
            m,
            n,
            charLimit,
            maxSplits,
            breakPoint,
            indicator
        });
    }

    sendMessage(closeModal) {
        const {
          newSMS,
          messages
        } = this.state;

        if (messages.length > 1) {
            this.props.save(messages);
        } else {
            this.props.save(newSMS);
        }
    }

    beforeSave(e) {
        this.handleModalClose(e);
    }

    createCustomModalFooter(closeModal, save) {
        return (
            <InsertModalFooter
                saveBtnText='Send'
                closeBtnText='Cancel'
                beforeSave={() => this.beforeSend(closeModal)}
                onSave={() => this.sendMessage(closeModal)}
            />
        );
    }

    createCustomModalBody(columns, validateState, ignoreEditable) {
        const { newSMS } = this.state;
        const {
            to,
            from,
            message
        } = newSMS;

        return (
            <div className="container">
                <div className="field">
                  <label
                    className="label"
                    htmlFor="from"
                  >
                    From
                  </label>
                  <div className="control">
                    <input
                        disabled
                        className="input"
                        placeholder="From"
                        name="name"
                        value={from}
                        onChange={this.onChange.bind(this)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label
                    className="label"
                  >
                    Number
                  </label>
                  <div className="control">
                    <input
                        className="input"
                        placeholder="Number to..."
                        name="to"
                        value={to}
                        onChange={this.onChange.bind(this)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label
                    className="label"
                  >
                    Message
                  </label>
                  <div className="field last-modal-field">
                    <textarea
                        className="input"
                        placeholder="Type your message..."
                        name="message"
                        value={message}
                        rows='5'
                        onChange={this.onChange.bind(this)}
                    ></textarea>
                    <p>
                        Message length: {message.length} <br />
                        {this.state.indicator !== '' ? `Your message splited ${this.state.indicator} ` : ''}
                    </p>
                    <p>
                        If your messages is over 160 characters it will be split into in max 15 messages.
                    </p>
                  </div>
                </div>
            </div>
        );
    }

    showShortMessage(cell, row) {
        return row.message;
    }

    render() {
        const options = {
              noDataText: "No SMS`s messages found out.",
              insertText: "Send an new SMS message",
              insertModalHeader: this.createCustomModalHeader,
              insertModalBody: this.createCustomModalBody,
              insertModalFooter: this.createCustomModalFooter,
        };

        return (
            <div className='full-width'>
                <BootstrapTable
                  className="table full-width"
                  data={this.props.data}
                  options={options}
                  striped
                  hover
                  insertRow
                  sorted
                  pagination
                  >
                  <TableHeaderColumn
                    width="25%"
                    isKey
                    dataField='id'
                    >
                    #
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="25%"
                    dataField='from'
                    >
                    From
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    width="25%"
                    dataField='to'
                    >
                    To
                  </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}
