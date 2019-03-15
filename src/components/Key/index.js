import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withHelpers } from 'Utils/decorators/componentHelpers';
import helpers from './helpers';
import { StyledKey } from './styles';

@withHelpers(helpers)
export default class Key extends PureComponent {
  static propTypes = {
    createNotes: PropTypes.func.isRequired,
    keys: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    level: PropTypes.number.isRequired,
    filterEnvelope: PropTypes.shape().isRequired,
    noteName: PropTypes.string.isRequired,
  };

  state = { pressed: false };

  componentDidMount = () => {
    const { createNotes } = this.props;

    this.noteInstances = createNotes(this.props);
  };

  componentWillReceiveProps = newProps => {
    const { noteInstances, changeHandler } = this;
    const { keys, level, filterEnvelope } = this.props;

    if (keys !== newProps.keys) changeHandler(newProps.keys);
    noteInstances.forEach(note => {
      note.updateOptions(newProps.options, newProps.noteName);
    });

    if (level !== newProps.level) {
      noteInstances.map(note => note.updateLevel(newProps.level));
    }

    if (filterEnvelope.hashCode() !== newProps.filterEnvelope.hashCode()) {
      noteInstances.map(note =>
        note.updateFilterEnvelope(newProps.filterEnvelope),
      );
    }
  };

  changeHandler = keySet => {
    const { noteName } = this.props;
    const { noteInstances } = this;
    const inKeys = keySet.has(noteName);

    noteInstances.forEach(note => (inKeys ? note.start() : note.stop()));
    this.setState({ pressed: inKeys });
  };

  render = () => {
    const { props, state } = this;
    const { index, noteName } = props;
    const pressed = state.pressed ? 'pressed' : '';
    const color = noteName.length === 3 ? 'black' : 'white';

    return <StyledKey color={color} pressed={pressed} index={index} />;
  };
}
