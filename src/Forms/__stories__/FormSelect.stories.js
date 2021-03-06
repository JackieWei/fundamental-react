import FormSelect from '../FormSelect';
import React from 'react';
import { storiesOf } from '@storybook/react';
import {
    boolean,
    select,
    withKnobs
} from '@storybook/addon-knobs';

const createProps = (overrides) => ({
    compact: boolean('compact', false),
    disabled: boolean('disabled', false),
    state: select('Validation State', {
        'default': null,
        'valid': 'valid',
        'invalid': 'invalid',
        'information': 'information',
        'warning': 'warning'
    }),
    ...overrides
});

storiesOf('Components|FormSelect', module)
    .addDecorator(withKnobs)
    .add('Default', () => (
        <FormSelect {...createProps()}>
            <option>Duis malesuada odio volutpat elementum</option>
            <option>Suspendisse ante ligula</option>
            <option>Sed bibendum sapien at posuere interdum</option>
        </FormSelect>
    ))
    .add('disable styles', () => (
        <FormSelect {...createProps()} disableStyles>
            <option>Duis malesuada odio volutpat elementum</option>
            <option>Suspendisse ante ligula</option>
            <option>Sed bibendum sapien at posuere interdum</option>
        </FormSelect>
    ));
