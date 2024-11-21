import React from 'react';
import { shallow } from 'enzyme';
import WordCountHintMessage from './wordcount-hint-message';
import { describe, test, expect } from '@jest/globals';

describe('<WordCountHintMessage />', () => {

    const values = { id: 'applicantTrainingUseAtWork' };

    test('displays how many words remaining', () => {
        const wrapper = shallow(<WordCountHintMessage wordCount={8} maxWordCount={10} values={values} />);

        expect(wrapper.find('#applicantTrainingUseAtWork-wordcount-hint').text()).toContain('You have 2 words remaining');
    });

    test('displays maximum word count when textarea is empty', () => {
        const wrapper = shallow(<WordCountHintMessage wordCount={0} maxWordCount={10} values={values}/>);

        expect(wrapper.find('#applicantTrainingUseAtWork-wordcount-hint').text()).toContain('You have 10 words remaining');
    });

    test('displays how many words above the maximum word limit are entered', () => {
        const wrapper = shallow(<WordCountHintMessage wordCount={8} maxWordCount={1} values={values}/>);

        expect(wrapper.find('#applicantTrainingUseAtWork-wordcount-hint').text()).toContain('You have 7 words too many');
    });
});
