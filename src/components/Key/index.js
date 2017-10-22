import { PureComponent, render } from 'dio.js'
import { compose } from 'ramda'
import { withHelpers } from 'Utils/decorators/dioHelpers'
import helpers from './helpers'

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
      <li className={`key ${pressed} ${index} ${color}`} />
    )
  }
}
