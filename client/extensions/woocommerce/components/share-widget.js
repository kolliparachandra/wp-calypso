/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

const ShareWidget = ( { className, text, title, urlToShare } ) => {
	return (
		<div className={ className } >
			{ text }
			{ title }
			{ urlToShare }
		</div>
	);
};

ShareWidget.propTypes = {
	className: PropTypes.string,
	text: React.PropTypes.string,
	title: React.PropTypes.string,
	urlToShare: React.PropTypes.string,
};

export default ShareWidget;
