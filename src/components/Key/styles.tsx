import styled from '@emotion/styled';
import { css } from '@emotion/react';

const whiteKeyWidth = 70;
const blackKeyWidth = 50;

const getKeyLeft = (index: number) => {
  switch (index) {
    case 1:
      return 70;
    case 3:
      return 140;
    case 6:
      return 280;
    case 8:
      return 350;
    case 10:
      return 420;
    default:
      return index * whiteKeyWidth;
  }
};

export const StyledKey = styled.li<{
  color: 'black' | 'white';
  pressed: boolean;
  index: number;
}>`
  cursor: pointer;
  margin-top: 8px;
  float: left;
  width: ${whiteKeyWidth}px;
  border: 1px solid black;
  box-sizing: border-box;
  height: 200px;
  background: white;
  text-align: center;

  ${({ color }) =>
    color === 'black' &&
    css`
      height: 150px;
      background: black;
      width: ${blackKeyWidth}px;
      transform: translateX(-50%);
      position: absolute;
      color: white;
    `};

  ${({ pressed }) =>
    pressed &&
    css`
      background: rgb(51, 242, 111);
    `};

  left: ${({ index }) => `${getKeyLeft(index)}px`};
`;
