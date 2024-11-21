import React from 'react';

const WordCountHintMessage = ({ content, id, maxWordCount = 0 }) => {

    const wordCount = content?.split(/\s+/).filter(Boolean).length;

    const hintId = `${id}-wordcount-hint`;

    let hintText = '';

    if (!wordCount && maxWordCount) {
        hintText = `You have ${maxWordCount} words remaining`;
    }

    const wordCountText = count => count === 1 ? 'word' : 'words';

    if (wordCount > maxWordCount) {
        const count = wordCount - maxWordCount;
        hintText = `You have ${count} ${wordCountText(count)} too many`;
    } else {
        const count = maxWordCount - wordCount;
        hintText = `You have ${count} ${wordCountText(count)} remaining`;
    }

    return (
        <div id={hintId} aria-live="polite" className="govuk-hint govuk-character-count__message">
            {hintText}
        </div>
    );
};

export default WordCountHintMessage;