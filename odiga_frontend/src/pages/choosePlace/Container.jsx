import update from 'immutability-helper';
import { memo, useCallback, useState } from 'react';
import { Card } from './Card.js';
import styled from "styled-components";

const Sty = styled.div `
    display:flex, flex-direction:column, flexWrap:wrap, border: '2px solid'
`
const ITEMS = [
  {
    id: 1,
    text: 'A',
  },
  {
    id: 2,
    text: 'B',
  },
  {
    id: 3,
    text: 'C',
  },
  {
    id: 4,
    text: 'D',
  },
  {
    id: 5,
    text: 'E',
  },
  {
    id: 6,
    text: 'F',
  }
]

// DND를 담는 컨테이너
export const Container = memo(function Container() {
  const [cards, setCards] = useState(ITEMS);
  // Card의 id에 해당하는 Card와 인덱스 리턴
  // {id:1, text:"duckgugong"}이 0번 인덱스면 {id: 1, text:"duckgugong"}, 0 리턴
  const findCard = useCallback(
    (id) => {
      const card = cards.filter((item) => `${item.id}` === id)[0]
      return {
        card,
        index: cards.indexOf(card),
      }
    },
    [cards],
  )
  /*
    Card의 위치 교환.
    state에서 {id: 1,text: 'duckgugong'}가 0번째 인덱스고 {id: 2,text: 'hungry'}가 1번째 인덱스면
    {id:1, text: 'duckgugong'}인 Card를 drag해서 {id:2, text: 'hungry'}에 hover하면
    {id:1, text: 'duckgugong'}가 1번째 인덱스가 되고 {id:2, text: 'hungry'}가 0번째 인덱스가 된다!
  */
  const moveCard = useCallback(
    (id, atIndex) => {
      const { card, index } = findCard(id)
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        }),
      )
    },
    [findCard, cards, setCards],
  )

  return (
    <Sty>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={`${card.id}`}
          text={card.text}
          moveCard={moveCard}
          findCard={findCard}
        />
      ))}
    </Sty>
  )
})

export default Container;