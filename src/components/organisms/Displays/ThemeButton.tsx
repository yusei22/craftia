import Wrapper from "components/layout/Wrapper";
import { themeAtom } from "dataflow/themes/themeAtom";
import { useSetRecoilState } from "recoil";
import defaultTheme, { darkTheme } from "theme";

export type ThemeButtonProps = {
    children?: React.ReactNode;
    className?: string;
};

export const ThemeButton = ({ children, className }: ThemeButtonProps) => {
    const setTheme = useSetRecoilState(themeAtom)
    return (

        <Wrapper
            onClick={() => {
                setTheme((theme) => {
                    return theme.name === 'DEFAULT' ? darkTheme : defaultTheme
                })
            }}
            className={className}
        >
            {children}
        </Wrapper>
    )
}