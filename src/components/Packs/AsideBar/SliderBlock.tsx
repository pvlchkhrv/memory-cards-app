import React, {ChangeEvent} from 'react';
import s from './AsideBar.module.css';
import {Box, Button, Slider} from '@material-ui/core';
import {useActions} from '../../../hooks/useActions';
import {useAppSelector} from '../../../hooks/useAppSelector';

const SliderBlock = () => {
    const {fetchPacks, setCardsQuantity} = useActions();
    const user = useAppSelector(state => state.auth.user);
    const status = useAppSelector(state => state.app.status);
    const {maxCardsCount, minCardsCount} = useAppSelector(state => state.packs);
    const [value, setValue] = React.useState<number[]>([minCardsCount, maxCardsCount]);
    const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setValue(newValue as number[]);
    }
    // const getPacks = () => {
    //     debugger
    //     setCardsQuantity({min: value[1], max: value[0]});
    //     if (isMine) {
    //         fetchPacks({user_id: user._id, min: minCardsCount, max: maxCardsCount, pageCount});
    //     } else {
    //         fetchPacks({min: minCardsCount, max: maxCardsCount, pageCount});
    //     }
    // };

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
                        onClick={() => setCardsQuantity({min: value[0], max: value[1]})}
                        disabled={status === 'loading'}
                >Set</Button>
            </Box>
        </div>
    );
};

export default SliderBlock;
