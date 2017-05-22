/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

const WidgetGroup = ( { className, maxColumns, title } ) => {
	return (
		<div className={ className } >
			{ maxColumns }
			{ title }
		</div>
	);
};

WidgetGroup.defaultProps = {
	maxColumns: 2
};

WidgetGroup.propTypes = {
	className: PropTypes.string,
	maxColumns: React.PropTypes.number,
	title: React.PropTypes.string,
};

export default WidgetGroup;
