/**
 * External Dependencies
 */
import React from 'react';
import { localize } from 'i18n-calypso';
import { take, times } from 'lodash';
import Gridicon from 'gridicons';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import Button from 'components/button';
import ReaderSubscriptionListItemPlaceholder
	from 'blocks/reader-subscription-list-item/placeholder';
import { READER_FOLLOWING_MANAGE_SEARCH_RESULT } from 'reader/follow-button/follow-sources';
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

	return (
		<div className={ classNames }>
			<InfiniteStream
				extraRenderItemProps={ {
					showLastUpdatedDate: false,
					followSource: READER_FOLLOWING_MANAGE_SEARCH_RESULT,
				} }
				items={ showMoreResults ? searchResults : take( searchResults, 10 ) }
				width={ width }
				fetchNextPage={ fetchNextPage }
				hasNextPage={ showMoreResults ? hasNextPage : undefined }
				forceRefresh={ forceRefresh }
				rowRenderer={ siteRowRenderer }
				renderEventName={ 'following_manage_search' }
			/>
			{ ! showMoreResults &&
				searchResultsCount > 10 &&
				<div className="following-manage__show-more">
					<Button
						compact
						icon
						onClick={ showMoreResultsClicked }
						className="following-manage__show-more-button button"
					>
						<Gridicon icon="chevron-down" />
						{ translate( 'Show more' ) }
					</Button>
				</div> }
		</div>
	);
};

export default localize( FollowingManageSearchFeedsResults );
