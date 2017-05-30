/**
 * Internal dependencies
 */
import {
	WOOCOMMERCE_PAYMENT_METHOD_ADD,
	WOOCOMMERCE_PAYMENT_METHOD_CANCEL,
	WOOCOMMERCE_PAYMENT_METHOD_CLOSE,
	WOOCOMMERCE_PAYMENT_METHOD_EDIT_NAME,
	WOOCOMMERCE_PAYMENT_METHOD_OPEN,
	WOOCOMMERCE_PAYMENT_METHOD_REMOVE,
} from '../../../action-types';

export const addNewPaymentMethod = ( siteId ) => {
	return { type: WOOCOMMERCE_PAYMENT_METHOD_ADD, siteId };
};

export const openPaymentMethodForEdit = ( siteId, id ) => {
	return { type: WOOCOMMERCE_PAYMENT_METHOD_OPEN, siteId, payload: { id } };
};

export const closeEditingPaymentMethod = ( siteId ) => {
	return { type: WOOCOMMERCE_PAYMENT_METHOD_CLOSE, siteId };
};

export const cancelEditingPaymentMethod = ( siteId ) => {
	return { type: WOOCOMMERCE_PAYMENT_METHOD_CANCEL, siteId };
};

export const changePaymentMethodName = ( siteId, name ) => {
	return { type: WOOCOMMERCE_PAYMENT_METHOD_EDIT_NAME, siteId, payload: { name } };
};

export const deletePaymentMethod = ( siteId, id ) => {
	return { type: WOOCOMMERCE_PAYMENT_METHOD_REMOVE, siteId, payload: { id } };
};
