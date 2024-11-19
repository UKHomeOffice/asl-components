import React, { useState, useCallback } from 'react';
import { TextArea } from '@ukhomeoffice/react-components';
import classNames from 'classnames';

export default function CharacterCount(props) {

    const getWordCount = text => text?.split(/\s+/).filter(Boolean).length;

    const [{ content, wordCount }, setContent] = useState({
        content: props.value,
        wordCount: getWordCount(props.value) ?? 0,
    });

    const handleChange = useCallback(text => {

        const wordCount = getWordCount(text);

        if (wordCount > props.limit) {
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
    },[props.limit, content]);

    const wordCountHintMessage = wordCount => {
        if (!wordCount) {
            return (
                <div id="with-hint-info" className="govuk-hint govuk-character-count__message">
                    You have {props.limit} words remaining
                </div>
            );
        }

        if (wordCount > props.limit) {
            const count = wordCount - props.limit;
            return (
                <div className="govuk-hint govuk-character-count__message">
                    You have {count === 1 ? count + ' word' : count + ' words' } too many
                </div>
            );
        } else {
            const count = props.limit - wordCount;
            return (
                <div className="govuk-hint govuk-character-count__message">
                    You have {count === 1 ? count + ' word' : count + ' words' } remaining
                </div>
            );
        }
    };

    const formErrorClass = classNames({
        'govuk-form-group': true,
        'govuk-character-count': true,
        'govuk-form-group--error': props.error
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