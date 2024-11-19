import React, { useState, useCallback } from 'react';
import { TextArea } from '@ukhomeoffice/react-components';
import classNames from 'classnames';

export default function CharacterCount(props) {

    const { value, maxWordCount, error, values } = props;
    const getWordCount = text => text?.split(/\s+/).filter(Boolean).length;

    const [{ content, wordCount }, setContent] = useState({
        content: value,
        wordCount: getWordCount(value) ?? 0,
    });

    const handleChange = useCallback(text => {

        const wordCount = getWordCount(text);

        if (wordCount > maxWordCount) {
            setContent({
                content: text,
                wordCount
            });
        } else {
            setContent({
                content: text,
                wordCount
            });
        }
    },[maxWordCount, content]);

    const wordCountHintMessage = wordCount => {
        if (!wordCount) {
            return (
                <div id={`${values.id}-wordcount-hint`} aria-live="polite" className="govuk-hint govuk-character-count__message">
                    You have {maxWordCount} words remaining
                </div>
            );
        }

        if (wordCount > maxWordCount) {
            const count = wordCount - maxWordCount;
            return (
                <div id={`${values.id}-wordcount-hint`} aria-live="polite" className="govuk-hint govuk-character-count__message">
                    You have {count === 1 ? count + ' word' : count + ' words' } too many
                </div>
            );
        } else {
            const count = maxWordCount - wordCount;
            return (
                <div id={`${values.id}-wordcount-hint`} aria-live="polite" className="govuk-hint govuk-character-count__message">
                    You have {count === 1 ? count + ' word' : count + ' words' } remaining
                </div>
            );
        }
    };

    const formErrorClass = classNames({
        'govuk-form-group': true,
        'govuk-character-count': true,
        'govuk-form-group--error': error
    });

    return (
        <div className={formErrorClass}>
            <TextArea
                {...props}
                value={content}
                onChange={e => handleChange(e.target.value)}
            />
            {wordCountHintMessage(wordCount)}
        </div>
    );
}