/**
 * Internal dependencies
 */
import { mergeHandlers } from 'state/action-watchers/utils';
import activate from './activate';

export default mergeHandlers( activate );
