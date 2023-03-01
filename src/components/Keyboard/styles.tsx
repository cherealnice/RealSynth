import styled from '@emotion/styled';
import { prop, propOr } from 'ramda';

export const LeftControls = styled('div')`
  display: flex;
  max-width: 55%;
  max-height: 50px;
`;

export const Paragraph = styled.p<{ margin?: string; height?: string }>`
  width: 624px;
  text-align: center;
  background: black;
  overflow: scroll;
  color: green;
  border: 2px solid grey;
  box-sizing: border-box;
  padding: 10px 5px;
  height: ${propOr('auto', 'height')};
  margin: ${propOr('none', 'margin')};
`;

export const Button = styled.button`
  background: black;
  padding: 5px;
  cursor: pointer;
  border: 1px solid grey;
  display: block;
  min-width: ${propOr('auto', 'min-width')};

  :hover {
    filter: invert(100%);
  }
`;

export const TopControls = styled('div')`
  display: flex;
  justify-content: space-between;
`;

export const SplashWrapper = styled('div')`
  display: grid;
  grid-row-gap: 5px;
  justify-content: center;
`;

export const Wrapper = styled('div')`
  display: block;
  margin: auto;
  height: 302px;
  width: 620px;
  background: red;
  border: 2px solid black;
  border-radius: 5px;
  user-select: none;
`;

export const StyledUl = styled.ul<{ opacity: number }>`
  opacity: ${prop('opacity')};
  margin: auto;
  width: 560px;
  position: relative;
`;
