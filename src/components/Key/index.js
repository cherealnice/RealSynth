import React, { PureComponent } from 'react'
import { compose } from 'ramda'
import { withHelpers } from 'Utils/decorators/componentHelpers'
import helpers from './helpers'
import { StyledKey } from './styles';

@withHelpers(helpers)
export default class Key extends PureComponent {
  state = { pressed: false }

  componentDidMount = () => {
    this.noteInstances = this.props.createNotes(this.props)
  }

  componentWillReceiveProps = (newProps) => {
    if (this.props.keys !== newProps.keys) this.changeHandler(newProps.keys)
    this.noteInstances.forEach((note) => {
      note.updateOptions(newProps.options, newProps.noteName)
    })

    if (this.props.level !== newProps.level) {
      this.noteInstances.map(note => note.updateLevel(newProps.level))
    }

    if (
      this.props.filterEnvelope.hashCode() !== 
      newProps.filterEnvelope.hashCode()
    ) {
      this.noteInstances.map(note => note.updateFilterEnvelope(newProps.filterEnvelope))
    }
  }

  changeHandler = (keySet) => {
    const inKeys = keySet.has(this.props.noteName)
    this.noteInstances.forEach(note => inKeys ? note.start() : note.stop())
    this.setState({ pressed: inKeys })
  }

  render = () => {
    const { props, state } = this
    const { index, noteName } = props;
    const pressed = state.pressed ? 'pressed' : ''
    const color = noteName.length === 3 ? 'black' : 'white'

    return (
      <StyledKey
        color={color}
        pressed={pressed}
        pressed={pressed}
        index={index}
      />
    )
  }
}
