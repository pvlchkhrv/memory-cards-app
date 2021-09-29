import React, {ChangeEvent} from 'react';
import s from './AsideBar.module.css';
import {Box, Slider} from '@material-ui/core';
import {useActions} from '../../../hooks/useActions';
import {useAppSelector} from '../../../hooks/useAppSelector';

const SliderBlock = () => {
    const [value, setValue] = React.useState<number[]>([20, 37]);
    const {fetchPacks} = useActions();
    const user = useAppSelector(state => state.auth.user);
    const {isMine, maxCardsCount, minCardsCount} = useAppSelector(state => state.packs);
    const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setValue(newValue as number[]);

        setTimeout(() => {

        },1000)
    };

    return (
        <div className={s.sliderBlock}>
            <h5>Number Of Cards</h5>
            <Box sx={{ width: 200 }}>
                <Slider
                    getAriaLabel={() => 'Cards quantity range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                />
            </Box>
        </div>
    );
};

export default SliderBlock;
