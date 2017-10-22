import { PureComponent, render } from 'dio.js'
import { compose } from 'ramda'
import { withHelpers } from 'Utils/decorators/dioHelpers'
import helpers from './helpers'

@withHelpers(helpers)
export default class Key extends PureComponent {
  getInitialState = () => ({
    pressed: false
  })

  componentDidMount = () => {
    this.noteInstances = this.props.createNotes(this.props)
  }

  componentWillReceiveProps = (newProps) => {
    if (this.props.keys !== newProps.keys) this.changeHandler(newProps.keys)
    this.noteInstances.forEach((note) => {
      note.updateOptions(newProps.options, newProps.noteName)
    })
  }

  changeHandler = (keySet) => {
    const inKeys = keySet.has(this.props.noteName)
    if (!!inKeys) {
      this.noteInstances.forEach(note => note.start())
      this.setState({ pressed: true })
    } else {
      this.noteInstances.forEach(note => note.stop())
      this.setState({ pressed: false })
    }
  }

  render = () => {
    const { props, state } = this;
    let pressed = "";
    let color;
    const index = "_" + props.index;
    if (state.pressed) {
      pressed = "pressed"
    }
    if (props.noteName.length === 3) {
      color = "black"
    } else {
      color = "white"
    }
    return (
      <li className={`key ${pressed} ${index} ${color}`} />
    )
  }
}
