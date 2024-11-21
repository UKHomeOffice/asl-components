import React from 'react';
import { shallow } from 'enzyme';
import WordCountHintMessage from './wordcount-hint-message';
import { describe, test, expect } from '@jest/globals';

describe('<WordCountHintMessage />', () => {
    const id = 'applicantTrainingUseAtWork';
    const wordCountHintId = '#applicantTrainingUseAtWork-wordcount-hint';

    test('displays max words remaining when wordCount is not provided', () => {
        const wrapper = shallow(<WordCountHintMessage maxWordCount={10} id={id} />);
        expect(wrapper.find(wordCountHintId).text()).toContain('You have 10 words remaining');
    });

    test('displays remaining words when wordCount is less than maxWordCount', () => {
        const wrapper = shallow(<WordCountHintMessage wordCount={8} maxWordCount={10} id={id} />);
        expect(wrapper.find(wordCountHintId).text()).toContain('You have 2 words remaining');
    });

    test('displays no remaining words when wordCount is equal to maxWordCount', () => {
        const wrapper = shallow(<WordCountHintMessage wordCount={10} maxWordCount={10} id={id} />);
        expect(wrapper.find(wordCountHintId).text()).toContain('You have 0 words remaining');
    });

    test('displays too many words when wordCount is greater than maxWordCount', () => {
        const wrapper = shallow(<WordCountHintMessage wordCount={12} maxWordCount={10} id={id} />);
        expect(wrapper.find(wordCountHintId).text()).toContain('You have 2 words too many');
    });

    test('displays singular word when there is only one word remaining', () => {
        const wrapper = shallow(<WordCountHintMessage wordCount={9} maxWordCount={10} id={id} />);
        expect(wrapper.find(wordCountHintId).text()).toContain('You have 1 word remaining');
    });

    test('displays singular word when there is only one word too many', () => {
        const wrapper = shallow(<WordCountHintMessage wordCount={11} maxWordCount={10} id={id} />);
        expect(wrapper.find(wordCountHintId).text()).toContain('You have 1 word too many');
    });
});