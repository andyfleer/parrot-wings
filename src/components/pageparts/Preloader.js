import React from 'react';
import PropTypes from 'prop-types';

const Preloader = (props) => (
    <div className={ `message-box-layer ${ props.show ? 'message-box__show' : '' }` }>
        <div className="message-box">
            <img src="img/progress.gif" className="message-box__proccess-image" alt="Progress" />
            <p className="message-box__text">
                {
                    props.message
                }
            </p>
        </div>
    </div>
);

Preloader.propTypes  = {
    show: PropTypes.bool,
    message: PropTypes.string
}

export default Preloader;