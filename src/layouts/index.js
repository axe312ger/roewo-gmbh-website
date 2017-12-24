import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { HeadsetMic, Voicemail } from 'material-ui-icons'

import { OnDutyProvider, ConnectedOnDuty } from '../components/on-duty'

import 'normalize.css'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Row = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1rem;
`

const Main = styled.div`
  flex: 1 1 auto;
`

const Header = styled.div`
  flex: 0 0 auto;
  background: #b20e2b;
  color: #fff;

  a {
    color: inherit;

    &:hover {
      color: inherit;
      text-decoration: underline;
    }
  }
`

const HeaderRow = Row.extend`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`

const Logo = styled.div`
  flex: 0 1 400px;
  margin-right: 1rem;
  padding: 1rem 0;

  & img {
    margin: 0;
  }
`

const Headline = styled.h1`
  color: inherit;
  margin: 0;
  padding: 0;
`

const HeaderOnDutyWrapper = styled.div`
  flex: 1 1 auto;
`

const HeaderOnDuty = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: 0.5rem 0;
`

const HeaderOnDutyRow = styled.div`
  display: flex;
  align-items: center;
`

const HeaderOnDutyText = styled.p`
  margin: 0 0 0 0.3rem;
`

const HeaderOnDutyTextSmall = styled.div`
  font-size: 0.85em;
`

const Footer = Header.extend`
  font-size: 0.85em;
`

const FooterText = styled.p`
  margin: 0;
  padding: 1rem 0;
`

const FooterMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0 0 1rem;
`
const FooterMenuItem = styled.li`
  margin: 0;
  margin-right: 1rem;
  &:last-child {
    margin-right: 0;
  }
`

const TemplateWrapper = ({ children }) => (
  <OnDutyProvider>
    <Wrapper>
      <Helmet
        title='RöWo GmbH Containerservice'
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' }
        ]}
      />
      <Header>
        <HeaderRow>
          <Logo>
            <Link to='/'>
              <img src='./roewo-logo-white.svg' alt='RöWo GmbH Containerservice' />
            </Link>
          </Logo>
          <Headline>
            <Link to='/'>Containerservice</Link>
          </Headline>
          <ConnectedOnDuty render={(onDuty) => (
            <HeaderOnDutyWrapper>
              {onDuty.available && (
                <HeaderOnDuty>
                  <HeaderOnDutyRow>
                    <HeadsetMic />
                    <HeaderOnDutyText>
                      Telefon: <a href='tel:0049814249091'>08142/49091</a>
                    </HeaderOnDutyText>
                  </HeaderOnDutyRow>
                </HeaderOnDuty>
              )}
              {!onDuty.available && (
                <HeaderOnDuty>
                  <HeaderOnDutyRow>
                    <Voicemail />
                    <HeaderOnDutyText>
                      Anrufbeantworter: <a href='tel:0049814249091'>08142/49091</a>
                    </HeaderOnDutyText>
                  </HeaderOnDutyRow>
                  <HeaderOnDutyRow>
                    <HeaderOnDutyTextSmall>
                      Wieder erreichbar {onDuty.timeTillOpen}. (Bürozeiten: 08:00-16:00)
                    </HeaderOnDutyTextSmall>
                  </HeaderOnDutyRow>
                </HeaderOnDuty>
              )}
            </HeaderOnDutyWrapper>
          )} />
        </HeaderRow>
      </Header>
      <Main>
        <Row>
          {children()}
        </Row>
      </Main>
      <Footer>
        <Row>
          <ConnectedOnDuty render={(onDuty) => (
            <div>
              {onDuty.available && (
                <FooterText>Unser Büro ist aktuell besetzt. Sie können uns nun unter <a href='tel:0049814249091'>08142/49091</a> erreichen.</FooterText>
              )}
              {!onDuty.available && (
                <FooterText>Der Anrufbeantworter ist aktiv. Hinterlassen Sie uns eine Nachricht unter <a href='tel:0049814249091'>08142/49091</a>. Wir sind in {onDuty.timeTillOpen} wieder für sie erreichbar. (Bürozeiten: 08:00-16:00)</FooterText>
              )}
            </div>
          )} />
          <FooterMenu>
            <FooterMenuItem><Link to='/team'>Team</Link></FooterMenuItem>
            <FooterMenuItem><Link to='/service-area'>Liefergebiet</Link></FooterMenuItem>
            <FooterMenuItem><Link to='/imprint'>Impressum</Link></FooterMenuItem>
          </FooterMenu>
        </Row>
      </Footer>
    </Wrapper>
  </OnDutyProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
