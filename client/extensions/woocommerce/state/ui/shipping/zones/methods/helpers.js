/**
 * External dependencies
 */
import { findIndex, remove } from 'lodash';

/**
 * Internal dependencies
 */
import { getBucket } from 'woocommerce/state/ui/helpers';

export const mergeMethodEdits = ( zoneMethodEdits, currentMethodEdits ) => {
	const { creates, updates, deletes } = zoneMethodEdits;
	const { creates: currentCreates, updates: currentUpdates, deletes: currentDeletes } = currentMethodEdits;
	const mergedState = {
		creates: [ ...creates ],
		updates: [ ...updates ],
		deletes: [ ...deletes ],
	};

	currentDeletes.forEach( ( { id } ) => {
		const bucket = getBucket( { id } );
		if ( 'updates' === bucket ) {
			mergedState.deletes.push( { id } );
		}
		remove( mergedState[ bucket ], { id } );
	} );

	mergedState.creates.push.apply( currentCreates );

	currentUpdates.forEach( ( update ) => {
		const index = findIndex( updates, { id: update.id } );
		if ( -1 !== index ) {
			mergedState.updates.push( update );
		} else {
			mergedState.updates[ index ] = { ...mergedState.updates[ index ], ...update };
		}
	} );

	return mergedState;
};
