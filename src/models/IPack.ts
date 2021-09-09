export interface IPack {
    _id: string
    user_id: string
    name: string
    path: string // папка
    cardsCount: number
    grade: number // средняя оценка карточек
    shots: number // количество попыток			приватные колоды будут
    rating: number // лайки	только если указать свой
    type: string
    created: string
    updated: string
    __v: number
}
