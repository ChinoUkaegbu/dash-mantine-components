import { YearPickerInput } from "@mantine/dates";
import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";
import { BoxProps } from "props/box";
import { DashBaseProps, PersistenceProps } from "props/dash";
import { DateInputSharedProps, YearPickerBaseProps } from "props/dates";
import { StylesApiProps } from "props/styles";
import React, { useState } from "react";
import {
    isDisabled,
    stringToDate,
    toDates,
    toStrings,
} from "../../utils/dates";

interface Props
    extends DashBaseProps,
        PersistenceProps,
        BoxProps,
        DateInputSharedProps,
        YearPickerBaseProps,
        StylesApiProps {
    /** Dayjs format to display input value, "MMMM D, YYYY" by default  */
    valueFormat?: string;
    /** Specifies days that should be disabled */
    disabledDates?: string[];
    /** An integer that represents the number of times that this element has been submitted */
    n_submit?: number;
    /** Debounce time in ms */
    debounce?: number;
}

/** DatePicker */
const YearPicker = (props: Props) => {
    const {
        setProps,
        n_submit,
        value,
        type,
        debounce,
        minDate,
        maxDate,
        disabledDates,
        persistence,
        persisted_props,
        persistence_type,
        ...others
    } = props;

    const [date, setDate] = useState(toDates(value));
    const [debounced] = useDebouncedValue(date, debounce);

    useDidUpdate(() => {
        setProps({ value: toStrings(date) });
    }, [debounced]);

    useDidUpdate(() => {
        setDate(toDates(value));
    }, [value]);

    const handleKeyDown = (ev) => {
        if (ev.key === "Enter") {
            setProps({ n_submit: n_submit + 1 });
        }
    };

    const isExcluded = (date: Date) => {
        return isDisabled(date, disabledDates || []);
    };

    console.log(type)

    return (
        <YearPickerInput
            wrapperProps={{ autoComplete: "off" }}
            onKeyDown={handleKeyDown}
            onChange={setDate}
            value={date}
            type={type}
            minDate={stringToDate(minDate)}
            maxDate={stringToDate(maxDate)}
            {...others}
        />
    );
};

YearPicker.defaultProps = {
    persisted_props: ["value"],
    persistence_type: "local",
    debounce: 0,
    n_submit: 0,
};

export default YearPicker;