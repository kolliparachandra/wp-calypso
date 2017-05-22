/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */

const ExtensionsWidget = ( { className, site } ) => {
	return (
		<div className={ className } >
			{ site.slug }
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
