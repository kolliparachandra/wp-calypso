/**
 * External dependencies
 */
import { get, find, findIndex, isNumber, remove } from 'lodash';

/**
 * Internal dependencies
 */
import { getSelectedSiteId } from 'state/ui/selectors';
import { getApiPaymentMethods, arePaymentMethodsLoaded } from '../../../wc-api/payment-methods/selectors';

const getPaymentMethodsEdits = ( state, siteId ) => {
	return get( state, [ 'extensions', 'woocommerce', 'ui', 'payments', siteId, 'methods' ] );
};

/**
 * @param {Object} state Whole Redux state tree
 * @param {Number} [siteId] Site ID to check. If not provided, the Site ID selected in the UI will be used
 * @return {Array} The list of payment methods that the UI should show. That will be the list of methods returned by
 * the wc-api with the edits "overlayed" on top of them.
 */
export const getPaymentMethods = ( state, siteId = getSelectedSiteId( state ) ) => {
	if ( ! arePaymentMethodsLoaded( state, siteId ) || ! getPaymentMethodsEdits( state, siteId ) ) {
		return [];
	}
	const methods = [ ...getApiPaymentMethods( state, siteId ) ];
	// Overlay the current edits on top of (a copy of) the wc-api methods
	const { creates, updates, deletes } = getPaymentMethodsEdits( state, siteId );
	deletes.forEach( ( { id } ) => remove( methods, { id } ) );
	updates.forEach( ( update ) => {
		const index = findIndex( methods, { id: update.id } );
		if ( -1 === index ) {
			return;
		}
		methods[ index ] = { ...methods[ index ], ...update };
	} );
	return [ ...methods, ...creates ];
};

/**
 * Gets group of payment methods. (offline, off-site, on-site)
 *
 * @param {Object} state Global state tree
 * @param {String} type type of payment method
 * @param {Number} siteId wpcom site id
 * @return {Array} Array of Payment Methods of requested type
 */
export function getPaymentMethodsGroup( state, type, siteId = getSelectedSiteId( state ) ) {
	return find( getPaymentMethods( state, siteId ), { methodType: type } );
}

/**
 * @param {Object} state Whole Redux state tree
 * @param {Number} [siteId] Site ID to check. If not provided, the Site ID selected in the UI will be used
 * @return {Object|null} The payment methods that's currently being edited, with all the edits
 * (including the non-committed changes). If no method is being edited, this will return null.
 */
export const getCurrentlyEditingPaymentMethod = ( state, siteId = getSelectedSiteId( state ) ) => {
	const { currentlyEditingId, currentlyEditingChanges } = getPaymentMethodsEdits( state, siteId );
	if ( null === currentlyEditingId ) {
		return null;
	}
	const method = find( getPaymentMethods( state, siteId ), { id: currentlyEditingId } );
	if ( ! method ) {
		return null;
	}
	return { ...method, ...currentlyEditingChanges };
};

/**
 * @param {Object} state Whole Redux state tree
 * @param {Number} [siteId] Site ID to check. If not provided, the Site ID selected in the UI will be used
 * @return {Boolean} Whether the user is currently editing a payment method.
 */
export const isCurrentlyEditingPaymentMethod = ( state, siteId = getSelectedSiteId( state ) ) => {
	return Boolean( getCurrentlyEditingPaymentMethod( state, siteId ) );
};

/**
 * @param {Number|Object} methodId Method ID (can be a temporal ID)
 * @return {Boolean} Whether this method is considered "editable". As a rule, every method is editable,
 * except the "Rest Of The World" method, which always has id = 0.
 */
const isEditablePaymentMethod = ( methodId ) => ! isNumber( methodId ) || 0 !== methodId;

/**
 * @param {Number|Object} methodId Method ID (can be a temporal ID)
 * @return {Boolean} Whether the name of this payment method can be changed by the user
 */
export const canChangePaymentMethodTitle = isEditablePaymentMethod;

/**
 * @param {Number|Object} methodId Method ID (can be a temporal ID)
 * @return {Boolean} Whether this payment method can be deleted
 */
export const canRemovePaymentMethod = isEditablePaymentMethod;

/**
 * @param {Number|Object} methodId Method ID (can be a temporal ID)
 * @return {Boolean} Whether the locations this method represents can be altered.
 */
export const canEditPaymentMethodLocations = isEditablePaymentMethod;
