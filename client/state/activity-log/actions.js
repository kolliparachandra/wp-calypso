/**
 * Internal dependencies
 */
import {
	REWIND_ACTIVATE_FAILURE,
	REWIND_ACTIVATE_REQUEST,
	REWIND_ACTIVATE_SUCCESS,
} from 'state/action-types';

export function activateRewind( siteId ) {
	return {
		REWIND_ACTIVATE_REQUEST,
		siteId,
	};
}

export function rewindActivateSuccess( siteId ) {
	return {
		type: REWIND_ACTIVATE_SUCCESS,
		siteId,
	};
}

export function rewindActivateFailure( siteId ) {
	return {
		type: REWIND_ACTIVATE_FAILURE,
		siteId,
	};
}
