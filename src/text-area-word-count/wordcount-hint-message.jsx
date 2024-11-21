import React from 'react';

const WordCountHintMessage = ({ content, id, maxWordCount = 0 }) => {

    const wordCount = content?.split(/\s+/).filter(Boolean).length;

    const hintId = `${id}-wordcount-hint`;

    if (!wordCount && maxWordCount) {
        return (
            <div id={hintId} aria-live="polite" className="govuk-hint govuk-character-count__message">
                You have {maxWordCount} words remaining
            </div>
        );
    }

    if (wordCount > maxWordCount) {
        const count = wordCount - maxWordCount;
        return (
            <div id={hintId} aria-live="polite" className="govuk-hint govuk-character-count__message">
                You have {count === 1 ? count + ' word' : count + ' words' } too many
            </div>
        );
    } else {
        const count = maxWordCount - wordCount;
        return (
            <div id={hintId} aria-live="polite" className="govuk-hint govuk-character-count__message">
                You have {count === 1 ? count + ' word' : count + ' words' } remaining
            </div>
        );
    }
};

export default WordCountHintMessage;