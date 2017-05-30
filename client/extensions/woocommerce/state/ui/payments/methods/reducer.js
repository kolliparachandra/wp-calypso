/**
 * External dependencies
 */
import { isEmpty, isEqual, reject } from 'lodash';

/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';
import {
	WOOCOMMERCE_PAYMENT_METHOD_ADD,
	WOOCOMMERCE_PAYMENT_METHOD_CANCEL,
	WOOCOMMERCE_PAYMENT_METHOD_CLOSE,
	WOOCOMMERCE_PAYMENT_METHOD_EDIT_NAME,
	WOOCOMMERCE_PAYMENT_METHOD_OPEN,
	WOOCOMMERCE_PAYMENT_METHOD_REMOVE,
} from '../../../action-types';
import { nextBucketIndex, getBucket } from '../../helpers';

const initialState = {
	creates: [],
	updates: [],
	deletes: [],
	currentlyEditingId: null,
};

function paymentMethodAddAction( state ) {
	const id = nextBucketIndex( state.creates );
	// The action of "adding" a method must not alter the edits, since the user can cancel the method edit later
	return paymentMethodOpenAction( state, { payload: { id } } );
}

function paymentMethodCancelAction( state ) {
	// "Canceling" editing a method is equivalent at "closing" it without any changes
	return paymentMethodCloseAction( { ...state,
		currentlyEditingChanges: {},
	} );
}

function paymentMethodCloseAction( state ) {
	const { currentlyEditingChanges, currentlyEditingId } = state;
	if ( null === currentlyEditingId ) {
		return state;
	}
	if ( isEmpty( currentlyEditingChanges ) ) {
		// Nothing to save, no need to go through the rest of the algorithm
		return { ...state,
			currentlyEditingId: null,
		};
	}

	const bucket = getBucket( { id: currentlyEditingId } );
	let found = false;
	const newBucket = state[ bucket ].map( method => {
		if ( isEqual( currentlyEditingId, method.id ) ) {
			found = true;
			// If edits for the method were already in the expected bucket, just update them
			return { ...method, ...currentlyEditingChanges };
		}
		return method;
	} );

	if ( ! found ) {
		// If edits for the method were *not* in the bucket yet, add them
		newBucket.push( { id: currentlyEditingId, ...currentlyEditingChanges } );
	}

	return { ...state,
		currentlyEditingId: null,
		[ bucket ]: newBucket,
	};
}

function paymentMethodEditNameAction( state, { payload: { name } } ) {
	if ( null === state.currentlyEditingId ) {
		return state;
	}
	return { ...state,
		currentlyEditingChanges: { ...state.currentlyEditingChanges,
			name,
		},
	};
}

function paymentMethodOpenAction( state, { payload: { id } } ) {
	return { ...state,
		currentlyEditingId: id,
		currentlyEditingChanges: {}, // Always reset the current changes
	};
}

function paymentMethodRemoveAction( state, { payload: { id } } ) {
	const newState = { ...state,
		currentlyEditingId: null,
	};

	const bucket = getBucket( { id } );
	if ( 'updates' === bucket ) {
		// We only need to add it to the list of "methods to delete" if the method was already present in the server
		newState.deletes = [ ...state.deletes, { id } ];
	}
	// In any case, remove the method edits from the bucket where they were
	newState[ bucket ] = reject( state[ bucket ], { id } );

	return newState;
}

export default createReducer( initialState, {
	[ WOOCOMMERCE_PAYMENT_METHOD_ADD ]: paymentMethodAddAction,
	[ WOOCOMMERCE_PAYMENT_METHOD_CANCEL ]: paymentMethodCancelAction,
	[ WOOCOMMERCE_PAYMENT_METHOD_CLOSE ]: paymentMethodCloseAction,
	[ WOOCOMMERCE_PAYMENT_METHOD_EDIT_NAME ]: paymentMethodEditNameAction,
	[ WOOCOMMERCE_PAYMENT_METHOD_OPEN ]: paymentMethodOpenAction,
	[ WOOCOMMERCE_PAYMENT_METHOD_REMOVE ]: paymentMethodRemoveAction,
} );
