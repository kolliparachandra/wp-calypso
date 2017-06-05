/**
 * Internal dependencies
 */
import {
	REWIND_ACTIVATE_REQUEST,
} from 'state/action-types';
import {
	rewindActivateFailure,
	rewindActivateSuccess,
} from 'state/activity-log/actions';
import { dispatchRequest } from 'state/data-layer/wpcom-http/utils';
import { http } from 'state/data-layer/wpcom-http/actions';

const activateRewind = ( { dispatch }, action ) => {
	dispatch( http( {
		method: 'POST',
		path: `/activity-log/${ action.siteId }/rewind/activate`,
		apiVersion: '1',
	}, action ) );
};

export const activateSucceeded = ( { dispatch }, { siteId } ) => {
	dispatch( rewindActivateSuccess( siteId ) );
};

export const activateFailed = ( { dispatch }, { siteId } ) => {
	dispatch( rewindActivateFailure( siteId ) );
};

export default {
	[ REWIND_ACTIVATE_REQUEST ]: [ dispatchRequest(
		activateRewind,
		activateSucceeded,
		activateFailed
	) ],
};
