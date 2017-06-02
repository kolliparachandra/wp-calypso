/**
 * External Dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';
import { take, map, times } from 'lodash';
import Gridicon from 'gridicons';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import ConnectedSubscriptionListItem from 'blocks/reader-subscription-list-item/connected';
import Button from 'components/button';
import ReaderSubscriptionListItemPlaceholder
	from 'blocks/reader-subscription-list-item/placeholder';
import { READER_FOLLOWING_MANAGE_SEARCH_RESULT } from 'reader/follow-button/follow-sources';
import { recordTracksRailcarRender } from 'reader/stats';
import InfiniteStream from 'components/reader-infinite-stream';
import { siteRowRenderer } from 'components/reader-infinite-stream/row-renderers';

const FollowingManageSearchFeedsResults = ( {
	showMoreResults,
	showMoreResultsClicked,
	searchResults,
	translate,
	width,
	fetchNextPage,
	hasNextPage,
	forceRefresh,
	searchResultsCount,
	query,
} ) => {
	const isEmpty = !! ( query && query.length > 0 && searchResults && searchResults.length === 0 );
	const classNames = classnames( 'following-manage__search-results', {
		'is-empty': isEmpty,
	} );

	if ( ! searchResults ) {
		return (
			<div className={ classNames }>
				{ times( 10, i => <ReaderSubscriptionListItemPlaceholder key={ `placeholder-${ i }` } /> ) }
			</div>
		);
	} else if ( isEmpty ) {
		return (
			<div className={ classNames }>
				{ translate( 'Sorry, no sites match {{italic}}%s.{{/italic}}', {
					components: { italic: <i /> },
					args: query,
				} ) }
			</div>
		);
	}

	const recordResultRender = index => railcar =>
		recordTracksRailcarRender(
			'following_manage_search',
			railcar,
			{ ui_algo: 'following_manage_search', ui_position: index }
		);

	if ( ! showMoreResults ) {
		const resultsToShow = map(
			take( searchResults, 10 ),
			( site, index ) => (
				<ConnectedSubscriptionListItem
					showLastUpdatedDate={ false }
					url={ site.feed_URL || site.URL }
					feedId={ +site.feed_ID }
					siteId={ +site.blog_ID }
					key={ `search-result-site-id-${ site.feed_ID || 0 }-${ site.blog_ID || 0 }` }
					followSource={ READER_FOLLOWING_MANAGE_SEARCH_RESULT }
					railcar={ site.railcar }
					onComponentMountWithNewRailcar={ recordResultRender( index ) }
				/>
			)
		);

		return (
			<div className={ classNames }>
				{ resultsToShow }
				<div className="following-manage__show-more">
					{ searchResultsCount > 3 &&
						<Button
							compact
							icon
							onClick={ showMoreResultsClicked }
							className="following-manage__show-more-button button"
						>
							<Gridicon icon="chevron-down" />
							{ translate( 'Show more' ) }
						</Button> }
				</div>
			</div>
		);
	}

	return (
		<div className={ classNames }>
			<InfiniteStream
				extraRenderItemProps={ {
					showLastUpdatedDate: false,
					followSource: READER_FOLLOWING_MANAGE_SEARCH_RESULT,
					recordResultRender
				} }
				items={ searchResults }
				width={ width }
				fetchNextPage={ fetchNextPage }
				hasNextPage={ hasNextPage }
				forceRefresh={ forceRefresh }
				rowRenderer={ siteRowRenderer }
			/>
		</div>
	);
};

export default localize( FollowingManageSearchFeedsResults );
