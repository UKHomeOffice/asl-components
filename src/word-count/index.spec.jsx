import React from 'react';
import { shallow } from 'enzyme';
import WordCount from '.';
import { describe, test, expect } from '@jest/globals';

describe('<WordCount />', () => {

    const values = { id: 'applicantTrainingUseAtWork' };

    test('displays how many words remaining', () => {
        const wrapper = shallow(<WordCount value="Hello world" maxWordCount={10} values={values} />);

        expect(wrapper.find('#applicantTrainingUseAtWork-wordcount-hint').text()).toContain('You have 8 words remaining');
    });

    test('displays maximum word count when textarea is empty', () => {
        const wrapper = shallow(<WordCount value="" maxWordCount={10} values={values}/>);

        expect(wrapper.find('#applicantTrainingUseAtWork-wordcount-hint').text()).toContain('You have 10 words remaining');
    });

    test('displays how many words above the maximum word limit are entered', () => {
        const wrapper = shallow(<WordCount value="Hello world" maxWordCount={1} values={values}/>);

        expect(wrapper.find('#applicantTrainingUseAtWork-wordcount-hint').text()).toContain('You have 1 word too many');
    });
});
