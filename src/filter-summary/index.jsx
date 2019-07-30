import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const FilterSummary = ({
  total,
  filtered,
  filteredLabel = filtered === 1 ? `${filtered} result` : `${filtered} results`,
  allShowingLabel = total === 1 ? `${total} result` : `${total} results`,
  filters
}) => {
  const searchString = filters.active['*'];

  const removeFilter = e => {
    e.preventDefault();
    window.location.href = `//${window.location.host + window.location.pathname}`;
  };

  return (
    <Fragment>
      <h3 className="filter-summary">
        { filtered !== total ? filteredLabel : allShowingLabel }
      </h3>
      {
        searchString &&
          <div className="applied-filters">
            <h3>Containing</h3>
            <button className="govuk-button button-secondary search-filter" onClick={removeFilter}>
              <span>{searchString}</span>
            </button>
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
  total: parseInt(total),
  filtered: parseInt(filtered),
  filters
});

export default connect(
  mapStateToProps
)(FilterSummary);
