import React, { useContext, useEffect, useMemo, useState } from 'react';
import { StyledKey } from './styles';
import { createNotes } from './helpers';
import { State } from '../../store/reducers/options';
import GlobalContext from '../../containers/GlobalContext';
import { INDEX_TO_KEYBOARD_KEY, TONES } from '../../utils/constants';

export interface Props {
  keys: Set<string>;
  options: State;
  index: number;
  noteName: keyof typeof TONES;
  level: number;
  filterEnvelope: State['filterEnvelope'];
  onKeyPressed: (noteName: string, isPressed: boolean) => () => void;
}

export default function Key({
  keys,
  options,
  index,
  noteName,
  level,
  filterEnvelope,
  onKeyPressed,
}: Props) {
  const { audioContext } = useContext(GlobalContext);
  const [pressed, setPressed] = useState(false);
  const noteInstances = useMemo(
    () =>
      createNotes({
        options,
        noteName,
        level,
        filterEnvelope,
        ctx: audioContext!,
      }),
    [audioContext]
  );

  useEffect(() => {
    changeHandler(keys);
  }, [keys]);

  useEffect(() => {
    noteInstances.forEach((note) => {
      note.updateOptions(options, noteName);
    });
  }, [options, noteName]);

  useEffect(() => {
    noteInstances.map((note) => note.updateLevel(level));
  }, [level]);

  useEffect(() => {
    noteInstances.map((note) => note.updateFilterEnvelope(filterEnvelope));
  }, [filterEnvelope]);

  const changeHandler = (keySet: Set<string>) => {
    const inKeys = keySet.has(noteName);
    noteInstances.forEach((note) => (inKeys ? note.start() : note.stop()));
    setPressed(inKeys);
  };

  const color = noteName.length === 3 ? 'black' : 'white';

  // TODO: find a better way to determine this
  const isMobile = window.innerWidth < 1200;

  return (
    <StyledKey
      color={color}
      pressed={pressed}
      index={index}
      onMouseDown={isMobile ? undefined : onKeyPressed(noteName, true)}
      onMouseUp={isMobile ? undefined : onKeyPressed(noteName, false)}
      onTouchStart={onKeyPressed(noteName, true)}
      onTouchEnd={onKeyPressed(noteName, false)}
    >
      {INDEX_TO_KEYBOARD_KEY[index]}
    </StyledKey>
  );
}
