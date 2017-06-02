/**
 * External dependencies
 */
import config from 'config';
import { localize } from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';
import url from 'url';

/**
 * Internal dependencies
 */
import { PUBLICIZE_SERVICES_LABEL_ICON } from '../../../../state/stats/lists/constants';

class ShareWidget extends Component {
	static propTypes = {
		text: PropTypes.string,
		title: PropTypes.string,
		urlToShare: PropTypes.string,
	}

	renderServiceIcons = () => {
		const { translate, urlToShare } = this.props;
		const services = [
			{
				slug: 'facebook',
				urlProperties: {
					scheme: 'https',
					hostname: 'www.facebook.com',
					pathname: '/sharer.php',
					query: {
						u: urlToShare,
						app_id: config( 'facebook_api_key' ),
					},
				},
			},
			{
				slug: 'twitter',
				urlProperties: {
					scheme: 'https',
					hostname: 'twitter.com',
					pathname: '/intent/tweet',
					query: {
						text: translate( 'Come check out our store!' ),
						url: urlToShare,
						via: 'wordpressdotcom',
					},
				},
			},
			{
				slug: 'google_plus',
				urlProperties: {
					scheme: 'https',
					hostname: 'plus.google.com',
					pathname: '/share',
					query: {
						url: urlToShare,
					}
				},
			},
			{
				slug: 'linkedin',
				urlProperties: {
					scheme: 'https',
					hostname: 'www.linkedin.com',
					pathname: 'shareArticle',
					query: {
						url: urlToShare,
						mini: 'true',
					}
				},
			},
			{
				slug: 'tumblr',
				urlProperties: {
					scheme: 'https',
					hostname: 'www.tumblr.com',
					pathname: 'widgets/share/tool/preview',
					query: {
						_format: 'html',
						posttype: 'link',
						shareSource: 'legacy',
						url: urlToShare,
					}
				},
			},
		];

		return (
			<ul className="share-widget__services">
				{
					services.map( ( service ) => {
						const src = PUBLICIZE_SERVICES_LABEL_ICON[ service.slug ].icon;
						const link = url.format( service.urlProperties );
						const title = PUBLICIZE_SERVICES_LABEL_ICON[ service.slug ].label;
						return (
							<li className="share-widget__service" key={ service.slug }>
								<a href={ link } rel="noopener noreferrer" target="_blank">
									<img alt={ title } src={ src } width={ 48 } />
								</a>
							</li>
						);
					} )
				}
			</ul>
		);
	}

	render = () => {
		const { text, title, urlToShare } = this.props;
		return (
			<div className="share-widget__container" >
				<h2>{ title }</h2>
				<p>{ text }</p>
				{ this.renderServiceIcons( urlToShare ) }
			</div>
		);
	}
}

export default localize( ShareWidget );
