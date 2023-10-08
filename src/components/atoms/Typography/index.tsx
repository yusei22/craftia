import { Interpolation, Theme, FunctionInterpolation } from '@emotion/react';
import { HTMLAttributes } from 'react';

export type TypographyVariant =
    | 'extraSmall'
    | 'small'
    | 'medium'
    | 'mediumLarge'
    | 'large'
    | 'extraLarge'

export type TypographyProps = HTMLAttributes<HTMLSpanElement> & {
    variant?: TypographyVariant;
    css?: Interpolation<Theme>;
}

const variants: {
    [key in TypographyVariant]: FunctionInterpolation<Theme>;
} = {
    extraSmall: theme => ({
        fontSize: theme.fontSize.xs,
        letterSpacing: theme.letterSpacing.xs,
        lineHeight: theme.lineHeights.xs
    }),
    small: theme => ({
        fontSize: theme.fontSize.sm,
        letterSpacing: theme.letterSpacing.sm,
        lineHeight: theme.lineHeights.sm
    }),
    medium: theme => ({
        fontSize: theme.fontSize.md,
        letterSpacing: theme.letterSpacing.md,
        lineHeight: theme.lineHeights.md
    }),
    mediumLarge: theme => ({
        fontSize: theme.fontSize.md2,
        letterSpacing: theme.letterSpacing.md2,
        lineHeight: theme.lineHeights.md2
    }),
    large: theme => ({
        fontSize: theme.fontSize.lg,
        letterSpacing: theme.letterSpacing.lg,
        lineHeight: theme.lineHeights.lg
    }),
    extraLarge: theme => ({
        fontSize: theme.fontSize.xl,
        letterSpacing: theme.letterSpacing.xl,
        lineHeight: theme.lineHeights.xl
    }),
}

const Typography = ({ variant = 'medium', ...props }: TypographyProps) => {
    return (
        <span css={variants[variant]} {...props} />
    )
}

export default Typography;