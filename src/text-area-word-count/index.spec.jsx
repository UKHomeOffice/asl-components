import React from 'react';
import { shallow } from 'enzyme';
import WordCountHintMessage from './wordcount-hint-message';
import { describe, test, expect } from '@jest/globals';

describe('<WordCountHintMessage />', () => {
    const id = 'applicantTrainingUseAtWork';
    const wordCountHintId = '#applicantTrainingUseAtWork-wordcount-hint';

    test('displays max words remaining when wordCount is not provided', () => {
        const wrapper = shallow(<WordCountHintMessage content='' maxWordCount={10} id={id} />);
        expect(wrapper.find(wordCountHintId).text()).toContain('You have 10 words remaining');
    });

    test('displays remaining words when wordCount is less than maxWordCount', () => {
        const wrapper = shallow(<WordCountHintMessage content='This is a sentence with 8 words' maxWordCount={10} id={id} />);
        expect(wrapper.find(wordCountHintId).text()).toContain('You have 3 words remaining');
    });

    test('displays no remaining words when wordCount is equal to maxWordCount', () => {
        const wrapper = shallow(<WordCountHintMessage content='This is a sentence with 10 words - 2 more' maxWordCount={10} id={id} />);
        expect(wrapper.find(wordCountHintId).text()).toContain('You have 0 words remaining');
    });

    test('displays too many words when wordCount is greater than maxWordCount', () => {
        const wrapper = shallow(<WordCountHintMessage content='This is a sentence with 10 words - 2 more plus 2' maxWordCount={10} id={id} />);
        expect(wrapper.find(wordCountHintId).text()).toContain('You have 2 words too many');
    });

    test('displays singular word when there is only one word remaining', () => {
        const wrapper = shallow(<WordCountHintMessage content='This is a sentence with 10 words i think' maxWordCount={10} id={id} />);
        expect(wrapper.find(wordCountHintId).text()).toContain('You have 1 word remaining');
    });

    test('displays singular word when there is only one word too many', () => {
        const wrapper = shallow(<WordCountHintMessage content='This is a sentence with 10 words - no' maxWordCount={10} id={id} />);
        expect(wrapper.find(wordCountHintId).text()).toContain('You have 1 word too many');
    });
});