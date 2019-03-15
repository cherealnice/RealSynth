import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
  padding: 0 8px;
`;

const Label = styled('label')`
  display: inline-block;
  width: 70px;
`;

const max = {
  attack: 1,
  decay: 2,
  sustain: 1,
  release: 1,
};

const Envelope = ({ envelopeData, onChange }) => (
  <Wrapper>
    {['attack', 'decay', 'sustain', 'release'].map(type => (
      <div key={type}>
        <Label htmlFor="release">{type.toUpperCase()}</Label>
        <input
          name={type}
          type="range"
          value={envelopeData.get(type)}
          onChange={onChange(type)}
          min={0}
          max={max[type]}
          step={0.001}
        />
      </div>
    ))}
  </Wrapper>
);

Envelope.propTypes = {
  envelopeData: PropTypes.shape({
    attack: PropTypes.number,
    decay: PropTypes.number,
    sustain: PropTypes.number,
    release: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Envelope;
