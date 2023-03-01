import { css } from '@emotion/react';

export default css`
  html,
  body,
  ul,
  li,
  div,
  p,
  h1,
  h3,
  button {
    margin: 0;
    padding: 0;
    border: 0;
    text-decoration: none;
    box-sizing: inherit;
    font: inherit;
    background: transparent;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  body {
    background: rgb(2, 0, 36);
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(9, 9, 121, 1) 35%,
      rgba(0, 212, 255, 1) 100%
    );
    font-family: courier, monospace;
    color: green;
    margin-top: 100px;
    height: 100vh;
  }

  .group:after {
    content: '';
    display: block;
    clear: both;
  }

  h3 {
    margin: auto;
    text-align: center;
    color: black;
  }

  h1 {
    text-align: center;
    margin: 20px;
    font-size: 36px;
    font-weight: bold;
  }
`;
