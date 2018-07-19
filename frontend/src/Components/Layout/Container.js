import React, { Component } from 'react';


/**
* APPLICATION LAYOUT COMPONENT
* @author Fabio William Conceição
* @since 1.0
* @copyright Fabio William Conceição
*/
export default class Container extends Component {
    render() {
        const {
            customClass = []
        } = this.props;
        const classes = customClass.length > 0 ? customClass.split(' ') : [];
        return (
            <div class={`container ${classes.join(' ')}`}>
                {this.props.children}
            </div>
        );
    }
}
