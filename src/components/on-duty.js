import React from 'react'
import { Broadcast, Subscriber } from 'react-broadcast'
import PropTypes from 'prop-types'

import {
  getDay, getHours,
  setHours, setDay,
  addDays, addWeeks,
  distanceInWordsToNow
} from 'date-fns'
import deLocale from 'date-fns/locale/de'

class OnDuty extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  }
  initialState = {
    available: this.isAvailable(),
    timeTillOpen: this.calcTimeTillOpen()
  }
  state = this.initialState

  constructor (props) {
    super(props)

    this.recalc = this.recalc.bind(this)
  }

  componentDidMount () {
    this.recalc()
  }

  recalc () {
    const available = this.isAvailable()
    const timeTillOpen = this.calcTimeTillOpen()

    if (
      available !== this.state.available ||
      timeTillOpen !== this.state.timeTillOpen
    ) {
      this.setState({
        available,
        timeTillOpen
      })
    }

    window.requestAnimationFrame(this.recalc)
  }

  isAvailable () {
    const now = Date.now()
    const weekday = getDay(now)
    const hours = getHours(now)

    if (weekday >= 1 && weekday <= 5) {
      if (hours >= 8 && hours < 14) {
        return true
      }
    }

    return false
  }

  calcTimeTillOpen () {
    if (this.isAvailable()) {
      return null
    }
    const now = Date.now()
    const tomorrow = addDays(setHours(now, 8), 1)
    let nextOpenDay = tomorrow
    if (getDay(nextOpenDay) === 6 || getDay(nextOpenDay) === 0) {
      nextOpenDay = setDay(addWeeks(nextOpenDay, 1), 1)
    }
    return distanceInWordsToNow(nextOpenDay, {
      locale: deLocale,
      addSuffix: true
    })
  }

  render () {
    return this.props.render(this.state)
  }
}

export class OnDutyProvider extends React.Component {
  static channel = '__channel__roewo__on_duty__'
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  render () {
    const {
      children,
      ...remainingProps
    } = this.props
    return (
      <OnDuty
        {...remainingProps}
        render={onDuty => (
          <Broadcast
            channel={OnDutyProvider.channel}
            value={onDuty}
          >
            {children}
          </Broadcast>
        )}
      />
    )
  }
}

export function ConnectedOnDuty (props) {
  return (
    <Subscriber
      channel={OnDutyProvider.channel}
    >
      {toggle => props.render(toggle)}
    </Subscriber>
  )
}

ConnectedOnDuty.propTypes = {
  render: PropTypes.func.isRequired
}
