/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import ExtensionsWidget from '../../components/extensions-widget';
import ProcessOrdersWidget from '../../components/process-orders-widget';
import ReadingWidget from '../../components/reading-widget';
import ShareWidget from '../../components/share-widget';
import WidgetGroup from '../../components/widget-group';

class ManageOrders extends Component {
	static propTypes = {
		site: PropTypes.shape( {
			slug: PropTypes.string.isRequired,
		} ),
	};

	itemLink = ( path ) => {
		const link = path.replace( ':site', this.props.site.slug );
		return link;
	}

	renderProcessOrdersWidget = () => {
		const { site } = this.props;
		return (
			<ProcessOrdersWidget className="dashboard__process-orders-widget" site={ site } />
		);
	}

	possiblyRenderReviewsWidget = () => {
		// TODO - implement in a follow-on PR
		return null;
	}

	possiblyRenderInventoryWidget = () => {
		// TODO - implement in a follow-on PR
		return null;
	}

	possiblyRenderRevenueWidget = () => {
		// TODO - implement in a follow-on PR
		return null;
	}

	possiblyRenderTopSellersWidget = () => {
		// TODO - implement in a follow-on PR
		return null;
	}

	possiblyRenderTopReferrersWidget = () => {
		// TODO - implement in a follow-on PR
		return null;
	}

	possiblyRenderTrafficSpikeWidget = () => {
		// TODO - implement in a follow-on PR
		return null;
	}

	possiblyRenderSearchHolesWidget = () => {
		// TODO - implement in a follow-on PR
		return null;
	}

	possiblyRenderExitPagesWidget = () => {
		// TODO - implement in a follow-on PR
		return null;
	}

	possiblyRenderPoorConvertorsWidget = () => {
		// TODO - implement in a follow-on PR
		return null;
	}

	possiblyRenderAbandonedCartsWidget = () => {
		// TODO - implement in a follow-on PR
		return null;
	}

	possiblyRenderTrafficWidget = () => {
		// TODO - implement in a follow-on PR
		return null;
	}

	possiblyRenderShareWidget = () => {
		// TODO - connect to display preferences in a follow-on PR
		const { translate } = this.props;
		return (
			<ShareWidget
				text={ translate( 'Share a link to your store on social media.' ) }
				title={ translate( 'Share your store' ) }
				urlToShare={ this.itemLink( 'https://:site' ) }
			/>
		);
	}

	possiblyRenderReadingWidget = () => {
		// TODO - connect to display preferences in a follow-on PR
		const { translate } = this.props;
		return (
			<ReadingWidget
				className="dashboard__reading-widget"
				title={ translate( 'Learn up' ) }
			/>
		);
	}

	possiblyRenderExtensionsWidget = () => {
		// TODO - connect to display preferences in a follow-on PR
		const { site, translate } = this.props;
		return (
			<ExtensionsWidget
				className="dashboard__extensions-widget"
				site={ site }
				title={ translate( 'Add features to your store' ) }
			/>
		);
	}

	render = () => {
		const { translate } = this.props;
		return (
			<div className="dashboard__manage-no-orders">
				<h2>
					{ translate( 'Welcome back, store owner' ) }
					<br />
					{ translate( 'You have new orders to process' ) }
				</h2>
				<WidgetGroup>
					{ this.renderProcessOrdersWidget() }
					{ this.possiblyRenderReviewsWidget() }
					( this.possiblyRenderInventoryWidget() }
				</WidgetGroup>
				<WidgetGroup>
					{ this.possiblyRenderRevenueWidget() }
					{ this.possiblyRenderTopSellersWidget() }
					( this.possiblyRenderTopReferrersWidget() }
				</WidgetGroup>
				<Button href={ this.itemLink( '/store/stats/orders/day/:site' ) }>
					{ translate( 'View full reports' ) }
				</Button>
				<WidgetGroup
					maxColumns="3"
					title={ translate( 'Here are some highlighted opportunities based on this weeks\' stats' ) }
				>
					{ this.possiblyRenderTrafficSpikeWidget() }
					{ this.possiblyRenderSearchHolesWidget() }
					( this.possiblyRenderExitPagesWidget() }
					{ this.possiblyRenderPoorConvertorsWidget() }
					{ this.possiblyRenderAbandonedCartsWidget() }
					( this.possiblyRenderTrafficWidget() }
				</WidgetGroup>
				{ this.possiblyRenderShareWidget() }
				<WidgetGroup>
					{ this.possiblyRenderReadingWidget() }
					{ this.possiblyRenderExtensionsWidget() }
				</WidgetGroup>
			</div>
		);
	}
}

export default localize( ManageOrders );
