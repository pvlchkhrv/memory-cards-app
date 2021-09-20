import React, {FC, useEffect, useState} from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Paper, Typography} from '@material-ui/core';
import {ICard} from '../models/ICard';
import {useAppSelector} from '../hooks/useAppSelector';
import {useHistory, useParams} from 'react-router';
import {useActions} from '../hooks/useActions';
import {RouteNames} from '../router';
const grades = ['Didn`t know', 'Forgot', 'Too much thinking', 'Confused', 'Got it'];

const getCard = (cards: ICard[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)
    return cards[res.id + 1];
};

const Learn: FC = () => {
    const [card, setCard] = useState<ICard>({
        _id: 'fake',
        cardsPack_id: '',

        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        answerImg: 'url or base 64',
        questionImg: 'url or base 64',
        questionVideo: 'url or base 64',
        answerVideo: 'url or base 64',
        type: '',
        rating: 0,
        more_id: '',

        created: '',
        updated: '',
    });
    const [first, setFirst] = useState<boolean>(true);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const {cards} = useAppSelector(state => state.cards);
    const {id} = useParams<{ id: string }>();
    const {fetchCards} = useActions();
    const {packs} = useAppSelector(state => state.packs);
    const pack = packs.find(p => p._id === id)
    const history = useHistory();

    useEffect(() => {
        if (first) {
            fetchCards({cardsPack_id: id});
            setFirst(false);
        }

        if (cards.length > 0) setCard(getCard(cards));
    }, [id, cards, first]);

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            setCard(getCard(cards));
        } else {

        }
    }

    return (
        <Card style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            width: '450px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div style={{display: 'flex'}}>
                <Button onClick={() => history.push(RouteNames.PACKS)}
                >Back</Button>
                <h3>You are learning {pack?.name}</h3>
            </div>
            <CardContent>
                {
                    card.questionImg && <CardMedia
                        component='img'
                        height='194'
                        image={card.questionImg}
                        alt='Question image'
                    />
                }
                <Typography variant='body2'>
                    {card.question}
                </Typography>
            </CardContent>
            <CardActions>
                <div>
                    <Button onClick={() => setIsChecked(true)}>check</Button>
                </div>
            </CardActions>
            {isChecked && (
                <>
                    <Paper style={{margin: 10, padding:10}}>
                        {
                            card.answerImg && <CardMedia
                                component='img'
                                height='194'
                                image={card.answerImg}
                                alt='Answer image'
                            />
                        }
                        {card.answer}
                    </Paper>
                    <div style={{
                        marginTop: 10,
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {grades.map((g, i) => (
                            <div style={{margin: 5}}>
                                <Button variant='outlined'
                                        key={'grade-' + i}
                                        onClick={() => {
                                        }}>{g}</Button>
                            </div>
                        ))}
                    </div>
                    <div style={{margin: 20}}><Button
                        color='primary'
                        variant='contained'
                        onClick={onNext}
                    >next</Button></div>
                </>
            )}
        </Card>
    );
};

export default Learn;

