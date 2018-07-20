import React, { Component } from 'react';

import PageHeader from '../Components/Layout/PageHeader';
import Footer from '../Components/Layout/Footer';
import Container from '../Components/Layout/Container';

import MessagesList from '../Requests/SMS/Get';

import Table from '../Components/SMS/Table';

export default class SMSTable extends Component {
    constructor(props){
    	super(props);
    	this.state = {
            number: this.props.match.params.id || false,
            data: []
        };
    }

    componentWillMount() {
        const {
            number
        } = this.state;

        if (!number) {
            window.location.href = '/';
        }

        this._MessagesList(number);
    }

    _MessagesList(number) {
        MessagesList(number)
            .then((response) => {
                const {
                    data
                } = response;

                if (data.status) {
                    this.setState({ data: data.payload });
                }
            })
            .catch((err) => { console.log(err); });
    }

    render() {
        const {
            data,
            number
        } = this.state;

        return (
            <div>
                <PageHeader />
                <Container
                    customClass="level"
                >
                    <Table
                        data={data}
                        loading={this.componentWillMount}
                        from={number}
                    />
                </Container>
                <Footer />
            </div>
        );
    }
}
