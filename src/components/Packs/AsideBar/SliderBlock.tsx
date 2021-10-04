import React, {ChangeEvent} from 'react';
import s from './AsideBar.module.css';
import {Box, Button, Slider} from '@material-ui/core';
import {useActions} from '../../../hooks/useActions';
import {useAppSelector} from '../../../hooks/useAppSelector';

const SliderBlock = () => {
    const {setCardsQuantity} = useActions();
    const status = useAppSelector(state => state.app.status);
    const {maxCardsCount, minCardsCount} = useAppSelector(state => state.packs);
    const [value, setValue] = React.useState<number[]>([minCardsCount, maxCardsCount]);
    const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setValue(newValue as number[]);
    }

    return (
        <div className={s.sliderBlock}>
            <h5>Number Of Cards</h5>
            <Box sx={{width: 200}}>
                <Slider
                    getAriaLabel={() => 'CardsList quantity range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay='auto'
                />
                <Button variant='contained'
                        color='primary'
                        onClick={() => setCardsQuantity({min: value[0], max: value[1]})}
                        disabled={status === 'loading'}
                >Set</Button>
            </Box>
        </div>
    );
};

export default SliderBlock;
