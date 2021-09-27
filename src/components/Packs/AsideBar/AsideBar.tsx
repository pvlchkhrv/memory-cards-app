import React, {FC} from 'react';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {Button, Grid} from '@material-ui/core';
import s from './AsideBar.module.css';

type AsideBarProps = {
    isMine: boolean;
    setIsMine: (isMine: boolean) => void;
}

export const AsideBar: FC<AsideBarProps> = ({setIsMine, isMine}) => {
    const {status} = useAppSelector(state => state.app);
    return (
        <Grid item xs={3} className={s.settings}>
            <div>
                <h5>Show Card Packs</h5>
                {
                    isMine
                        ? <Button
                            color='secondary'
                            variant='contained'
                            disabled={status === 'loading'}
                            onClick={() => setIsMine(false)}
                        >Show All Packs</Button>
                        : <Button color='primary'
                                  variant='contained'
                                  disabled={status === 'loading'}
                                  onClick={() => setIsMine(true)}
                        >Show My Packs</Button>
                }
            </div>
            <div>
                <h5>Number Of Cards</h5>
                {/*<DoubleSlider/>*/}
            </div>
        </Grid>
    );
};
