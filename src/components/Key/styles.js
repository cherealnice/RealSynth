import styled from '@emotion/styled';
import { css } from '@emotion/core';

const whiteKeyWidth = 70;
const blackKeyWidth = 50;

const blackKeyLefts = {
  1: 70,
  3: 140,
  6: 280,
  8: 350,
  10: 420,
};

const getKeyLeft = index => blackKeyLefts[index] || index * whiteKeyWidth;

export const StyledKey = styled('li')`
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
