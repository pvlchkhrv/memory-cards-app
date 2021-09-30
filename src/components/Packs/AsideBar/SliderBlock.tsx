import React, {ChangeEvent} from 'react';
import s from './AsideBar.module.css';
import {Box, Button, Slider} from '@material-ui/core';
import {useActions} from '../../../hooks/useActions';
import {useAppSelector} from '../../../hooks/useAppSelector';

const SliderBlock = () => {
    const [value, setValue] = React.useState<number[]>([1, 10]);
    const {fetchPacks, setCardsQuantity} = useActions();
    const user = useAppSelector(state => state.auth.user);
    const status = useAppSelector(state => state.app.status);
    const {isMine, maxCardsCount, minCardsCount, pageCount} = useAppSelector(state => state.packs);
    const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setValue(newValue as number[]);
        setCardsQuantity({min: value[0], max: value[1]});
    }
    const getPacks = () => {
        if (isMine) {
            fetchPacks({ min: minCardsCount, max: maxCardsCount, user_id: user._id, pageCount});
        } else {
            fetchPacks({min: minCardsCount, max: maxCardsCount, pageCount});
        }
    };

    return (
        <div className={s.sliderBlock}>
            <h5>Number Of Cards</h5>
            <Box sx={{width: 200}}>
                <Slider
                    getAriaLabel={() => 'Cards quantity range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay='auto'
                />
                <Button variant='contained'
                        onClick={getPacks}
                        disabled={status === 'loading'}
                >Set</Button>
            </Box>
        </div>
    );
};

export default SliderBlock;
