import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { TextArea } from '@ukhomeoffice/react-components';
import classNames from 'classnames';

export default function CharacterCount(props) {

    const getWordCount = text => text?.split(/\s+/).filter(Boolean).length;

    const [{ content, wordCount }, setContent] = useState({
        content: props.value,
        wordCount: getWordCount(props.value) ?? 0,
    });

    const handleChange = useCallback(text => {
        console.log('useCallback', text);

        const words = text.split(/\s+/).filter(Boolean);

        if (words.length > props.limit) {
            setContent({
                content: text,
                wordCount: words.length
            });
            console.log('useCallback-content-1', content);

        } else {
            setContent({
                content: text,
                wordCount: words.length
            });
            console.log('useCallback-content-2', content);
        }
    },[props.limit, content]);

    // useEffect(() => {
    //     console.log('useEffect');
    //     handleChange(content);
    // }, []);

    const formErrorClass = classNames({
        'govuk-form-group': true,
        'govuk-character-count': true,
        'govuk-form-group--error': props.error
    });

    const textAreaClass = classNames({
        'govuk-textarea govuk-js-character-count': true,
        'govuk-textarea--error': props.error
    });

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

    return (
        <div className={formErrorClass}>
            <TextArea
                {...props}
                value={content}
                onChange={e => handleChange(e.target.value)}
            />
            {wordCountHintMessage(wordCount)}
        </div>
        // <>
        //     <div className={formErrorClass}>
        //         <label className="govuk-label govuk-label--s">
        //             {props.label}
        //         </label>
        //         <div id="with-hint-hint" className="govuk-hint">
        //             {props.hint}
        //         </div>
        //         <textarea
        //             className={textAreaClass}
        //             onChange={e => handleChange(e.target.value)}
        //             value={content}
        //         >
        //             {content}
        //         </textarea>
        //         {wordCountHintMessage(wordCount)}
        //     </div>
        // </>
    );
}