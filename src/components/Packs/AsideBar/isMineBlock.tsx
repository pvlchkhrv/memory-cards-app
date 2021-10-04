import React, {FC} from 'react';
import s from './AsideBar.module.css';
import {Button} from '@material-ui/core';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {useActions} from '../../../hooks/useActions';

const IsMineBlock = () => {
    console.log('IS MINE BLOCK')
    const status = useAppSelector(state => state.app.status);
    const isMine = useAppSelector(state => state.packs.isMine);
    const {setIsMine} = useActions();

    return (
        <div className={s.isMineBlock}>
            {
                isMine
                    ? <Button
                        color='primary'
                        variant='contained'
                        disabled={status === 'loading'}
                        onClick={() => setIsMine(false)}
                    >All Packs</Button>
                    : <Button
                              variant='contained'
                              color='primary'
                              disabled={status === 'loading'}
                              onClick={() => setIsMine(true)}
                    >My Packs</Button>
            }
        </div>
    );
};

export default IsMineBlock;
