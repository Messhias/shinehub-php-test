import React, { Component } from 'react';

import PageHeader from '../Components/Layout/PageHeader';
import Footer from '../Components/Layout/Footer';
import Container from '../Components/Layout/Container';

export default class SMSTable extends Component {

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
