import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import {
  getDay, getHours,
  differenceInSeconds, distanceInWordsToNow,
  addDays, addWeeks,
  setHours, setDay
} from 'date-fns'
import deLocale from 'date-fns/locale/de'

import 'normalize.css'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Header = styled.div`
  flex: 0 0 auto;
  background: #fd2321;
  color: #fff;
`

const Headline = styled.h1`
  color: inherit;
  margin: 0;
  padding: 1rem 0;
`

const Footer = Header.extend``

const FooterText = styled.p`
  margin: 0;
  padding: 1rem;
`

const Main = styled.div`
  flex: 1 1 auto;
`

const Row = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1rem;
`

class Telephone extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      available: true,
      now: Date.now()
    }

    this.calcAvailablity = this.calcAvailablity.bind(this)
    this.recalc = this.recalc.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.available !== this.state.available) {
      return true
    }
    return false
  }

  componentDidMount () {
    this.recalc()
  }

  recalc () {
    const now = Date.now()
    if (differenceInSeconds(now, this.state.now) > 0) {
      this.setState({now})
      this.calcAvailablity()
    }

    window.requestAnimationFrame(this.recalc)
  }

  calcAvailablity () {
    const now = Date.now()
    const weekday = getDay(now)
    const hours = getHours(now)
    let available = false

    if (weekday >= 1 && weekday <= 5) {
      if (hours >= 8 && hours < 16) {
        available = true
      }
    }

    this.setState({available})
  }

  render () {
    if (this.state.available) {
      return <FooterText>Unser Büro ist aktuell besetzt. Sie können uns nun unter <strong>08142/49091</strong> erreichen.</FooterText>
    } else {
      const now = Date.now()
      const tomorrow = addDays(setHours(now, 8), 1)
      let nextOpenDay = tomorrow
      if (getDay(nextOpenDay) === 6 || getDay(nextOpenDay) === 0) {
        nextOpenDay = setDay(addWeeks(nextOpenDay, 1), 1)
      }
      const diff = distanceInWordsToNow(nextOpenDay, {
        locale: deLocale
      })
      return <FooterText>Sie besuchen uns außerhalb unserer Bürozeiten. Sie können uns eine Nachricht unter <strong>08142/49091</strong> hinterlassen oder uns in {diff} erreichen. (Bürozeiten: 08:00-16:00)</FooterText>
    }
  }
}

const TemplateWrapper = ({ children }) => (
  <Wrapper>
    <Helmet
      title='RöWo GmbH Containerservice'
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' }
      ]}
    />
    <Header>
      <Row>
        <Headline>RöWo GmbH Containerservice</Headline>
      </Row>
    </Header>
    <Main>
      <Row>
        {children()}
      </Row>
    </Main>
    <Footer>
      <Row>
        <Telephone />
      </Row>
    </Footer>
  </Wrapper>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
