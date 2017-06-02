/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import {
	ACTIVITY_LOG_FETCH,
} from 'state/action-types';
import { dispatchRequest } from 'state/data-layer/wpcom-http/utils';
import { http } from 'state/data-layer/wpcom-http/actions';

const fetchLogs = ( { dispatch }, action ) => {
	dispatch( http( {
		method: 'GET',
		// FIXME: Real path
		// path: `/activity-log/${ action.siteId }/rewind`,
		path: `/sites/${ action.siteId }`,
	}, action ) );
	// setTimeout( () => dispatch( {
	// 	action,
	// 	data,
	// } ), 250 );
};

const updateLogs = ( { dispatch }, { siteId }, _, { data } ) => {
	dispatch( {
		type: ACTIVITY_LOG_FETCH,
		siteId,
		data,
	} );
};

export default {
	[ ACTIVITY_LOG_FETCH ]: [ dispatchRequest( fetchLogs, updateLogs, console.error.bind( console ) ) ],
};
