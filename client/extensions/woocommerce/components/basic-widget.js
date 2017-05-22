/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

const BasicWidget = ( { buttonLabel, buttonLink, className, title } ) => {
	return (
		<div className={ className } >
			{ buttonLabel }
			{ buttonLink }
			{ title }
		</div>
	);
};

BasicWidget.propTypes = {
	buttonLabel: PropTypes.string,
	buttonLink: PropTypes.string,
	className: PropTypes.string,
	title: PropTypes.string,
};

export default BasicWidget;
