import type {DateTime} from '@gravity-ui/date-utils';

import type {Value} from '../RelativeDatePicker';
import type {
    DomProps,
    FocusableProps,
    InputBase,
    InputDOMProps,
    RangeValue,
    StyleProps,
    TextInputProps,
    Validation,
} from '../types';

import type {Preset} from './components/Presets/defaultPresets';
import type {PresetTab} from './components/Presets/utils';
import type {
    RelativeRangeDatePickerStateOptions,
    RelativeRangeDatePickerValue,
} from './hooks/useRelativeRangeDatePickerState';

export interface RelativeRangeDatePickerRenderControlProps {
    open: boolean;
    isMobile?: boolean;
    ref: React.Ref<HTMLInputElement>;
    value: RelativeRangeDatePickerValue | null;
    title: string;
    errorMessage?: React.ReactNode;
    validationState?: 'invalid';
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    onFocus: (e: React.FocusEvent<HTMLElement>) => void;
    onClickCalendar: (e: React.MouseEvent<HTMLElement>) => void;
    onUpdate: (value: string) => void;
}

export interface RelativeRangeDatePickerProps
    extends RelativeRangeDatePickerStateOptions,
        DomProps,
        InputBase,
        InputDOMProps,
        TextInputProps,
        Validation,
        FocusableProps,
        StyleProps {
    /** Format of the date when rendered in the input. [Available formats](https://day.js.org/docs/en/display/format) */
    format?: string;
    /** A placeholder date that controls the default values of each segment when the user first interacts with them. Defaults to today's date at midnight. */
    placeholderValue?: DateTime;
    /** Apply changes with button */
    withApplyButton?: boolean;
    /** Show time zone selector */
    withZonesList?: boolean;
    /** Show relative range presets */
    withPresets?: boolean;
    /** Custom preset tabs */
    presetTabs?: PresetTab[];
    /** Custom docs for presets, if empty array docs will be hidden */
    docs?: Preset[];
    /** Show selected relative values as absolute dates */
    alwaysShowAsAbsolute?: boolean;
    /** */
    getRangeTitle?: (value: RangeValue<Value | null> | null, timeZone: string) => string;
    /** Sets the CSS className for the popup element. */
    popupClassName?: string;
    /** Handler that is called when the popup's open state changes. */
    onOpenChange?: (open: boolean) => void;
    /** Used to render control. */
    renderControl?: (props: RelativeRangeDatePickerRenderControlProps) => React.ReactElement;
}
