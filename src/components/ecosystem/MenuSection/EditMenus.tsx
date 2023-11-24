import { MenuItem } from '@szhsin/react-menu';
import { RenoButton } from '../../organisms/Edits/RenoButton';
import { UndoButton } from '../../organisms/Edits/UndoButton';
import Typography from 'components/atoms/Typography';
import '@szhsin/react-menu/dist/index.css';

export const EditMenus = () => {
    return (
        <>
            <MenuItem>
                <UndoButton
                    css={{
                        width: '100%',
                    }}
                >
                    <Typography variant="small">元に戻す</Typography>
                </UndoButton>
            </MenuItem>
            <MenuItem>
                <RenoButton
                    css={{
                        width: '100%',
                    }}
                >
                    <Typography variant="small">やり直し</Typography>
                </RenoButton>
            </MenuItem>
        </>
    );
};
