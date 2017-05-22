/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

const ReadingWidget = ( { className, title } ) => {
	return (
		<div className={ className } >
			{ title }
		</div>
	);
};

ReadingWidget.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
};

export default ReadingWidget;
