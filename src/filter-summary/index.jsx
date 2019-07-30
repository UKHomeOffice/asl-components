import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import capitalize from 'lodash/capitalize';
import qs from 'qs';

const FilterSummary = ({
  total,
  filtered,
  filteredLabel = filtered === 1 ? `${filtered} result` : `${filtered} results`,
  allShowingLabel = total === 1 ? `${total} result` : `${total} results`,
  filters
}) => {
  const searchString = filters.active['*'] && filters.active['*'][0];
  const activeFilters = omit(filters.active, '*');

  const removeFilter = filterKey => {
    return e => {
      e.preventDefault();
      const urlParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
      delete urlParams['filters'][filterKey];
      window.location.href = `//${window.location.host + window.location.pathname + qs.stringify(urlParams, { addQueryPrefix: true })}`;
    };
  };

  return (
    <Fragment>
      <h3 className="filter-summary">
        { filtered !== total ? filteredLabel : allShowingLabel }
      </h3>
      {
        !isEmpty(filters.active) &&
          <div className="applied-filters">
            {
              searchString &&
                <div>
                  <h3>Containing</h3>
                  <button className="govuk-button button-secondary search-filter" onClick={removeFilter('*')}>
                    <span>{searchString}</span>
                  </button>
                </div>
            }
            {
              Object.keys(activeFilters).map(key => !isEmpty(activeFilters[key]) && (
                <div key={key}>
                  <h3>{capitalize(key)}</h3>
                  <button className="govuk-button button-secondary search-filter" onClick={removeFilter(key)}>
                    <span>{activeFilters[key][0]}</span>
                  </button>
                </div>
              ))
            }
          </div>
      }
    </Fragment>
  );
};

const mapStateToProps = ({
  datatable: {
    pagination: {
      count: filtered,
      totalCount: total
    },
    filters
  }
}) => ({
  total: parseInt(total, 10),
  filtered: parseInt(filtered, 10),
  filters
});

export default connect(
  mapStateToProps
)(FilterSummary);
