import { ChangeEvent } from 'react';

export type SelectorProps<T extends string> = {
    options?: SelectorOptions<T>;
    className?: string;
    defaultValue?: T;
    onChange?: (newVal: string) => void;
};

export type SelectorOptions<T extends string> = {
    value: T;
    label: string;
    disabled?: boolean;
}[];

export const Selector = <T extends string>({
    options = [],
    defaultValue,
    onChange,
    className,
}: SelectorProps<T>) => {
    const _onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.selectedOptions[0].value;
        onChange?.(val);
    };

    return (
        <select
            className={className}
            onChange={_onChange}
            multiple={false}
            defaultValue={defaultValue}
            css={(theme) => ({
                borderRadius: '3px',
                minWidth: '0ppx',
                border: `1px solid ${theme.colors.neutral300}`,
                outline: `0px solid #0000`,
                boxSizing: 'border-box',
                padding: '6px 8px',
                backgroundColor: theme.colors.neutral100,
                color: theme.colors.text,
                accentColor: theme.colors.neutral400,
                ':focus': {
                    outline: `0px solid #0000`,
                    border: `1px solid ${theme.colors.primary400}`,
                },
            })}
        >
            {options.map(({ value, label, disabled = false }) => (
                <option value={value} key={value} disabled={disabled}>
                    {label}
                </option>
            ))}
        </select>
    );
};
