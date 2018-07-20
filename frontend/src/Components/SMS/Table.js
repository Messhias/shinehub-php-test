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
            }
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
        this.setState(state);
    }

    toggleActive() {
        let {
          newSMS,
          isActive
        } = this.state;

        isActive = !isActive;
        newSMS.active = isActive;

        this.setState({
            isActive,
            newSMS
        });
    }

    toggleExclusive() {
        let {
          newSMS,
          isExclusive
        } = this.state;

        isExclusive = !isExclusive;
        newSMS.exclusive = isExclusive;

        this.setState({
            isExclusive,
            newSMS
        });
    }

    sendMessage(closeModal) {
        const {
          newSMS
        } = this.state;

        delete newSMS.parent;
        delete newSMS['parent'];

        this.props.save(newSMS);
    }

    createCustomModalHeader(closeModal, save) {
        return (
            <InsertModalHeader
              title='Send new SMS message'
            />
        );
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
                        value={from}
                        onChange={this.onChange.bind(this)}
                    />
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
            <BootstrapTable
                className="table full-width"
                width="25%"
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
                <TableHeaderColumn
                    width="25%"
                    dataField='status'
                >
                    Status
                </TableHeaderColumn>
            </BootstrapTable>
        );
    }
}
