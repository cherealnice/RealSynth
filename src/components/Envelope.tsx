import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { State } from '../store/reducers/options';

const Wrapper = styled.div`
  padding: 0 8px;
`;

const Label = styled.label`
  display: inline-block;
  width: 70px;
`;

enum FilterType {
  Attack = 'attack',
  Decay = 'decay',
  Sustain = 'sustain',
  Release = 'release',
}

const getMax = (type: any) => {
  switch (type) {
    case FilterType.Attack:
    case FilterType.Sustain:
    case FilterType.Release:
      return 1;
    case FilterType.Decay:
      return 2;
    default:
      throw new Error(`${type} is not a valid envelope type`);
  }
};

interface Props {
  envelopeData: State['filterEnvelope'];
  onChange: (type: FilterType) => (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Envelope({ envelopeData, onChange }: Props) {
  return (
    <Wrapper>
      {[
        FilterType.Attack,
        FilterType.Decay,
        FilterType.Sustain,
        FilterType.Release,
      ].map((type) => (
        <div key={type}>
          <Label htmlFor="release">{type.toUpperCase()}</Label>
          <input
            name={type}
            type="range"
            value={envelopeData[type]}
            onChange={onChange(type)}
            min={0}
            max={getMax(type)}
            step={0.001}
          />
        </div>
      ))}
    </Wrapper>
  );
}
