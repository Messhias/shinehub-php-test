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
            <section class="section">
                <div class="container">
                  <h1 class="title">{title}</h1>
                  <h2 class="subtitle">
                    {subtitle} <strong>{strong}</strong>
                  </h2>
                </div>
            </section>
        );
    }
}
