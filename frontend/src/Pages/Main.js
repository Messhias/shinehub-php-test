import React, { Component } from 'react';

import PageHeader from '../Components/Layout/PageHeader';
import Footer from '../Components/Layout/Footer';
import Container from '../Components/Layout/Container';

import FormLogin from '../Components/Forms/FormLogin';

/**
* MAIN APPLICATION COMPONENT
* @author Fabio William Conceição
* @since 1.0
* @copyright Fabio William Conceição
*/
export default class Main extends Component {
    constructor(props){
    	super(props);
        this.enterInSMSTable = this.enterInSMSTable.bind(this);
    }

    enterInSMSTable(number) {
        this.props.history.push(`sms/${number}`, { number: number });
    }

    render() {
        return (
            <div>
                <PageHeader />
                <Container>
                    <FormLogin
                        enterInSMSTable={this.enterInSMSTable}
                    />
                </Container>
                <Footer />
            </div>
        );
    }
}
