import styled from '@emotion/styled'
import { propOr, prop } from 'ramda';

export const LeftControls = styled('div')`
  display: flex;
  max-width: 55%;
  max-height: 50px;
`;

export const Paragraph = styled('p')`
  width: 624px;
  text-align: center;
  background: black;
  overflow: scroll;
  color: green;
  border: 2px solid grey;
  box-sizing: border-box;
  padding-top: 10px;
  height: ${propOr('auto', 'height')};
  margin: ${propOr('none', 'margin')};
`;

export const Button = styled('button')`
  background: black;
  padding: 5px;
  cursor: pointer;
  border: 1px solid grey;
  display: block;
  min-width: ${propOr('auto', 'min-width')};
`

export const TopControls = styled('div')`
  display: flex;
  justify-content: space-between;
`;

export const BottomControls = styled('div')`
  margin-left: 8px;
  margin-top: -30px;
`;

export const TopWrapper = styled('div')`
  margin: 50px auto;
`;

export const SplashWrapper = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

export const Wrapper = styled('div')`
  display: block;
  margin: auto;
  height: 302px;
  width: 620px;
  background: red;
  border: 2px solid black;
  border-radius: 5px;
`;

export const StyledUl = styled('ul')`
  opacity: ${prop('shiftOpacity')};
  margin: auto;
  width: 560px;
  position: relative;
`;
