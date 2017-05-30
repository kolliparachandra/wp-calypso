/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import FormPasswordInput from 'components/forms/form-password-input';
import FormTextInput from 'components/forms/form-text-input';
import FormSelect from 'components/forms/form-select';
import FormToggle from 'components/forms/form-toggle';
import ListItem from '../../../components/list/list-item';

class PaymentMethodEdit extends Component {

	static propTypes = {
		settingsFields: PropTypes.object,
	};

	renderEditCheckbox = ( setting ) => {
		const checked = setting.value === 'yes';
		return (
			<FormToggle checked={ checked } />
		);
	}

	renderEditField = ( editField ) => {
		const setting = this.props.settingsFields[ editField ];
		return (
			<div className="payments__method-edit-field-container" key={ editField }>
				{ setting.label }
				{ setting.type === 'checkbox' && this.renderEditCheckbox( setting ) }
				{ setting.type === 'email' && this.renderEditTextbox( setting ) }
				{ setting.type === 'password' && this.renderEditPassword( setting ) }
				{ setting.type === 'text' && this.renderEditTextbox( setting ) }
				{ setting.type === 'select' && this.renderEditSelect( setting ) }
				<hr />
			</div>
		);
	}

	renderEditPassword = ( setting ) => {
		return (
			<FormPasswordInput value={ setting.value } />
		);
	}

	renderEditSelect = ( setting ) => {
		const optionKeys = Object.keys( setting.options );
		return (
			<FormSelect value={ setting.value }>
				{ optionKeys && optionKeys.map( ( option ) => {
					return this.renderSelectOptions( option, setting.options[ option ] );
				} ) }
			</FormSelect>
		);
	}

	renderEditTextbox = ( setting ) => {
		return (
			<FormTextInput value={ setting.value } />
		);
	}

	renderSelectOptions = ( key, title ) => {
		return (
			<option key={ key } value={ key }>{ title }</option>
		);
	}

	render() {
		const { settingsFields } = this.props;
		const settingsFieldsKeys = Object.keys( settingsFields );
		return (
			<ListItem>
				{
					settingsFieldsKeys &&
					settingsFieldsKeys.length &&
					settingsFieldsKeys.map( this.renderEditField )
				}
			</ListItem>
		);
	}

}

export default localize( PaymentMethodEdit );
