import React, {ChangeEvent, FC} from 'react';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {Avatar, Badge, Box, Button, Grid, Slider, styled} from '@material-ui/core';
import s from './AsideBar.module.css';

type AsideBarProps = {
    isMine: boolean;
    setIsMine: (isMine: boolean) => void;
}

function DoubleSlider() {
    return null;
}

export const AsideBar: FC<AsideBarProps> = ({setIsMine, isMine}) => {
    const {status} = useAppSelector(state => state.app);
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    }));
    const BigAvatar = styled(Avatar)(({theme}) => ({
        width: 150,
        height: 150
    }))

    return (
        <Grid item xs={3} >
            <div className={s.settings}>
                <div className={s.userInfoBlock}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        }
                    >
                        <BigAvatar alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
                    </Badge>
                </div>
                <div className={s.isMineBlock}>
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
                <div className={s.sliderBlock}>
                    <h5>Number Of Cards</h5>
                    <Box sx={{ width: 200 }}>
                        <Slider

                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                        />
                    </Box>
                </div>

            </div>
        </Grid>
    );
};
