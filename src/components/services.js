import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

class Services extends React.Component {
  render () {
    const { services, active } = this.props
    const properServices = services
      .map((service) => service.node)
      .filter((service) => service.id !== active)

    let title = 'Wir bieten folgende Dienstleistungen an:'

    if (active) {
      title = 'Wir bieten auch folgende weitere Dienstleistungen an:'
    }

    return (
      <aside>
        <h2>{title}</h2>
        <ul>
          { properServices.map((service) => (
            <li key={service.id}>
              <Link to={`/service/${service.slug}`}>{service.title}</Link>
            </li>
          )) }
        </ul>
      </aside>
    )
  }
}

Services.propTypes = {
  services: PropTypes.array,
  active: PropTypes.string
}

export default Services
