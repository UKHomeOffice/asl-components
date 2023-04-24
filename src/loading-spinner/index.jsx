import classNames from 'classnames';
import React from 'react';

export function LoadingSpinner({ small = false }) {
    return <div className={classNames('govuk-spinner', { small })} />;
}
