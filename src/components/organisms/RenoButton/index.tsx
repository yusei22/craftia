import Button from 'components/atoms/Button';
import { useSpriteTreeReno } from 'dataflow';

export const RenoButton = () => {
    const reno = useSpriteTreeReno();
    return <Button onClick={reno}>やり直し</Button>;
};
