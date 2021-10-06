import React, {FC, useState} from 'react';
import {Rating} from '@material-ui/lab';
import {useActions} from '../../hooks/useActions';
import {ICard} from '../../models/ICard';

type RatingProps = {
    card: ICard;
}
const CardRating: FC<RatingProps> = ({card}) => {
    console.log("RATING")
    const [value, setValue] = useState<number| null>(card.grade);
    const {estimateCard} = useActions();
    return (
        <Rating
            name='card grade'
            value={card.grade}
            onChange={(event, newValue) => {
                setValue(newValue);
                estimateCard(card._id, value);
            }}
        />
    );
};

export default CardRating;
