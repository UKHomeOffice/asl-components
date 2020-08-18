import React from 'react';
import { EditableField, Snippet } from '../';

export default function RestrictionsField(props) {
  return <EditableField
    {...props}
    label={<Snippet>fields.restrictions.label</Snippet>}
    currentLabel={<Snippet>fields.restrictions.currentLabel</Snippet>}
    proposedLabel={<Snippet>fields.restrictions.proposedLabel</Snippet>}
    deleteItemWarning="Are you sure you want to remove these restrictions?"
    format={val => val || 'None'}
    original={props.model && props.model.restrictions}
    proposed={props.value}
  />;
}
