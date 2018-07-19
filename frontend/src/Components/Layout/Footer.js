import React,{ Component } from 'react';


/**
* MAIN APPLICATION COMPONENT
* @author Fabio William Conceição
* @since 1.0
* @copyright Fabio William Conceição
*/
export default class Footer extends Component {

    render() {
        const {
            strong = "This project was made by ",
            author = "Fabio William Conceição",
            authorLink = "https://github.com/messhias"
        } = this.props;
        return (
            <footer className="footer force-footer">
              <div className="content has-text-centered">
                <p>
                  <strong>{strong}</strong> by <a href={authorLink}>{author}</a>.
                </p>
              </div>
            </footer>
        );
    }
}
