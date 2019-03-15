import { css } from '@emotion/core';

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
    font-style: inherit;
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
    background: linear-gradient(
      to right,
      rgba(179, 220, 237, 1) 0%,
      rgba(41, 184, 229, 1) 50%,
      rgba(188, 224, 238, 1) 100%
    );
    font-family: courier;
    color: green;
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
