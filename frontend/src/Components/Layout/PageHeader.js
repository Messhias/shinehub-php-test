import React, { Component } from 'react';

/**
* Layout application component
* @author Fabio William Conceição
* @since 1.0
* @copyright Fabio William Conceição
*/
export default class PageHeader extends Component {

    render() {
        const {
            title = "Shinehub",
            subtitle = "Made by ",
            strong = "Fabio William Conceição"
        } = this.props;
        return (
            <section className="section">
                <div className="container">
                  <h1 className="title">{title}</h1>
                  <h2 className="subtitle">
                    {subtitle} <strong>{strong}</strong>
                  </h2>
                </div>
            </section>
        );
    }
}
