import React, { Component } from 'react';

import PageHeader from '../Components/Layout/PageHeader';
import Footer from '../Components/Layout/Footer';
import Container from '../Components/Layout/Container';

import MessagesList from '../Requests/SMS/Get';

export default class SMSTable extends Component {
    constructor(props){
    	super(props);
    	this.state = {
            number: this.props.match.params.id,
            data: []
        };
    }

    componentWillMount() {
        const {
            number
        } = this.state;

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
        return (
            <div>
                <PageHeader />
                <Container
                    customClass="level"
                >
                    content
                </Container>
                <Footer />
            </div>
        );
    }
}
