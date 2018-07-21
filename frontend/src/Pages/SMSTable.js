import React, { Component } from 'react';

import PageHeader from '../Components/Layout/PageHeader';
import Footer from '../Components/Layout/Footer';
import Container from '../Components/Layout/Container';

import MessagesList from '../Requests/SMS/Get';
import AddMessage from '../Requests/SMS/Add';

import Table from '../Components/SMS/Table';


export default class SMSTable extends Component {
    constructor(props){
    	super(props);
    	this.state = {
            number: this.props.match.params.id || false,
            data: [],
            loading: true
        };

        this.save = this.save.bind(this);
    }

    componentWillMount() {
        const {
            number,
            loading
        } = this.state;

        if (!number) {
            window.location.href = '/';
        }

        this.setState({ loading: !loading });

        this._MessagesList(number);
    }

    save(data) {

        AddMessage(data)
            .then(response => {
                const {
                    data
                } = response;

                if (data.status) {
                    this.componentWillMount();
                }
            })
            .catch((err) => { console.log(err); });
    }

    _MessagesList(number) {
        const {
            loading
        } = this.state;

        MessagesList(number)
            .then((response) => {
                const {
                    data
                } = response;

                if (data.status) {
                    this.setState({
                        data: data.payload,
                        loading: !loading
                    });
                }
            })
            .catch((err) => { console.log(err); });
    }

    render() {
        const {
            data,
            number,
            loading
        } = this.state;

        if (loading) {
            return (
                <div>
                    <PageHeader />
                    <Container
                        customClass="level"
                    >
                        <h1>Loading...</h1>
                    </Container>
                </div>
            );
        }

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
                        save={this.save}
                    />
                </Container>
                <Footer />
            </div>
        );
    }
}
