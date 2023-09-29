import React from 'react';

import {Popup, TextInput, useFocusWithin, useMobile} from '@gravity-ui/uikit';

import {block} from '../../utils/cn.js';
import {Calendar} from '../Calendar/index.js';
import {DateField} from '../DateField/index.js';
import type {
    AccessibilityProps,
    DomProps,
    FocusableProps,
    KeyboardEvents,
    StyleProps,
    TextInputExtendProps,
    TextInputProps,
} from '../types/index.js';

import {useRelativeDateFieldProps} from './hooks/useRelativeDateFieldProps.js';
import {useRelativeDateFieldState} from './hooks/useRelativeDateFieldState.js';
import type {RelativeDateFieldOptions} from './hooks/useRelativeDateFieldState.js';

import './RelativeDateField.scss';

const b = block('relative-date-field');

export interface RelativeDateFieldProps
    extends RelativeDateFieldOptions,
        TextInputProps,
        TextInputExtendProps,
        DomProps,
        StyleProps,
        AccessibilityProps,
        FocusableProps,
        KeyboardEvents {
    /**
     * Show time field in popup
     * @default false
     */
    hasTime?: boolean;
}
export function RelativeDateField(props: RelativeDateFieldProps) {
    const state = useRelativeDateFieldState(props);
    const {inputProps, calendarProps, timeInputProps} = useRelativeDateFieldProps(state, props);

    const [isMobile] = useMobile();

    const anchorRef = React.useRef<HTMLElement>(null);

    const [isOpen, setOpen] = React.useState(false);

    const {focusWithinProps} = useFocusWithin({
        onBlurWithin: () => {
            setOpen(false);
        },
        isDisabled: isMobile,
    });

    return (
        <div
            role="group"
            className={b(null, props.className)}
            style={props.style}
            {...focusWithinProps}
        >
            <TextInput
                {...inputProps}
                className={b('field')}
                ref={anchorRef}
                onFocus={(e) => {
                    if (!isMobile) {
                        setOpen(true);
                    }
                    props.onFocus?.(e);
                }}
                onBlur={props.onBlur}
            />
            {!isMobile && (
                <Popup anchorRef={anchorRef} open={isOpen}>
                    <div className={b('popup-content')}>
                        <Calendar {...calendarProps} />
                        {props.hasTime ? (
                            <div className={b('time-field-wrapper')}>
                                <DateField className={b('time-field')} {...timeInputProps} />
                            </div>
                        ) : null}
                    </div>
                </Popup>
            )}
        </div>
    );
}
