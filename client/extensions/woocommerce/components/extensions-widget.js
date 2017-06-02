/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

const ExtensionsWidget = ( { className } ) => {
	return (
		<div className={ className } >
		</div>
	);
};

ExtensionsWidget.propTypes = {
	className: PropTypes.string,
	site: React.PropTypes.shape( {
		slug: React.PropTypes.string.isRequired,
	} )
};

export default ExtensionsWidget;
