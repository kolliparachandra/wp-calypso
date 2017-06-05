/**
 * External dependencies
 */
import { find, findIndex, isEmpty, map, remove } from 'lodash';

/**
 * Internal dependencies
 */
import { getSelectedSiteId } from 'state/ui/selectors';
import { getAPIShippingZones, areShippingZonesLoaded } from 'woocommerce/state/wc-api/shipping-zones/selectors';
import { getShippingZoneMethod } from 'woocommerce/state/wc-api/shipping-zone-methods/selectors';
import { getShippingZonesEdits } from '../selectors';
import { getBucket } from 'woocommerce/state/ui/helpers';
import { builtInShippingMethods } from 'woocommerce/state/ui/shipping/zones/methods/reducer';

const getZoneId = ( state, zoneId, siteId ) => {
	if ( ! areShippingZonesLoaded( state, siteId ) ) {
		return null;
	}
	if ( null === zoneId ) {
		return getShippingZonesEdits( state, siteId ).currentlyEditingId;
	}
	return zoneId;
};

const getShippingZoneMethodsEdits = ( state, zoneId, siteId ) => {
	const zonesEdits = getShippingZonesEdits( state, siteId );
	if ( zonesEdits ) {
		const zoneEdits = find( zonesEdits[ getBucket( { id: zoneId } ) ], { id: zoneId } );
		if ( zoneEdits && ! isEmpty( zoneEdits.methods ) ) {
			return zoneEdits.methods;
		}
	}
	return {
		creates: [],
		updates: [],
		deletes: [],
	};
};

/**
 * @param {Object} state Whole Redux state tree
 * @param {Number} [zoneId] Shipping Zone ID. If not provided, it will default to the shipping zone currently being edited
 * @param {Number} [siteId] Site ID to check. If not provided, the Site ID selected in the UI will be used
 * @return {Array} The list of shipping methods included in the given shipping zone. On any failure, it will return
 * an empty Array
 */
export const getShippingZoneMethods = ( state, zoneId = null, siteId = getSelectedSiteId( state ) ) => {
	zoneId = getZoneId( state, zoneId, siteId );
	if ( null === zoneId ) {
		return [];
	}
	const zone = find( getAPIShippingZones( state, siteId ), { id: zoneId } );
	const methodIds = zone ? [ ...zone.methodIds ] : [];

	// Overlay the current edits on top of (a copy of) the wc-api zone methods
	const { creates, updates, deletes } = getShippingZoneMethodsEdits( state, zoneId, siteId );
	deletes.forEach( ( { id } ) => remove( methodIds, id ) );
	const methods = methodIds.map( methodId => getShippingZoneMethod( state, methodId, siteId ) );
	updates.forEach( ( update ) => {
		const index = findIndex( methodIds, update.id );
		if ( -1 === index ) {
			return;
		}
		methods[ index ] = { ...methods[ index ], ...update };
	} );
	return [ ...methods, ...creates ];
};

/**
 * @param {Object} state Whole Redux state tree
 * @param {Number} [zoneId] Shipping Zone ID. If not provided, it will default to the shipping zone currently being edited
 * @param {Number} [siteId] Site ID to check. If not provided, the Site ID selected in the UI will be used
 * @return {Array} The list of Shipping Method types that can be added to the given shipping Zone
 */
export const getNewMethodTypeOptions = ( state, zoneId = null, siteId = getSelectedSiteId( state ) ) => {
	const options = [];
	zoneId = getZoneId( state, zoneId, siteId );
	if ( null !== zoneId ) {
		const currentMethods = map( getShippingZoneMethods( state, zoneId, siteId ), 'method_id' );
		const allMethods = Object.keys( builtInShippingMethods );
		allMethods.forEach( ( methodId ) => {
			// A user can add as many "Local Pickup" methods as he wants for a given zone.
			if ( 'local_pickup' === methodId || find( currentMethods, methodId ) ) {
				options.push( methodId );
			}
		} );
	}

	return options.sort();
};

/**
 * @param {Object} state Whole Redux state tree
 * @param {Number} currentMethodId Shipping method type currently being used
 * @param {Number} [zoneId] Shipping Zone ID. If not provided, it will default to the shipping zone currently being edited
 * @param {Number} [siteId] Site ID to check. If not provided, the Site ID selected in the UI will be used
 * @return {Array} The list of Shipping Method types that this shipping zone method can be changed too. It
 * includes the current method type.
 */
export const getMethodTypeChangeOptions = ( state, currentMethodId, zoneId = null, siteId = getSelectedSiteId( state ) ) => {
	const options = getNewMethodTypeOptions( state, zoneId, siteId );
	return find( options, currentMethodId ) ? options : [ ...options, currentMethodId ].sort();
};

export const isTaxable = method => 'Taxable' === method.taxable;
