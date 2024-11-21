import React, { useState } from 'react';
import { TextArea } from '@ukhomeoffice/react-components';
import classNames from 'classnames';
import WordCountHintMessage from './wordcount-hint-message';
import omit from 'lodash/omit';

export default function WordCount(props) {

    const { value, maxWordCount, error, values, name } = props;
    const getWordCount = text => text?.split(/\s+/).filter(Boolean).length;

    const [{ content, wordCount }, setContent] = useState({
        content: value,
        wordCount: getWordCount(value) ?? 0,
    });

    const handleChange = text => {
        const wordCount = getWordCount(text);
        setContent({
            content: text,
            wordCount
        });
    };

    const formErrorClass = classNames({
        'govuk-form-group': true,
        'govuk-character-count': true,
        'govuk-form-group--error': error
    });

    return (
        <div className={formErrorClass} id={`${name}-form-group`}>
            <TextArea
                {...omit(props, 'maxWordCount')}
                value={content}
                onChange={e => handleChange(e.target.value)}
            />
            <WordCountHintMessage wordCount={wordCount} values={values} maxWordCount={maxWordCount} />
        </div>
    );
}
