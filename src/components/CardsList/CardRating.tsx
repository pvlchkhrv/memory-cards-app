import React, {FC, useState} from 'react';
import {Rating} from '@material-ui/lab';
type RatingProps = {
    grade: number;
}
const CardRating: FC<RatingProps> = ({grade}) => {
    const [value, setValue] = useState<number | null>(grade);
    return (
        <Rating
            name='card grade'
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        />
    );
};

export default CardRating;
