import React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Services from '../components/services'

const propTypes = {
  data: PropTypes.object.isRequired
}

class ServiceTemplate extends React.Component {
  render () {
    const service = this.props.data.contentfulService
    const {
      id,
      headline,
      title,
      description
    } = service
    return (
      <article>
        <Helmet title={`${title} - RöWo GmbH Containerservice`} />
        <h1>{headline}</h1>
        <div dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
        <Services services={this.props.data.allContentfulService.edges} active={id}/>
      </article>
    )
  }
}

ServiceTemplate.propTypes = propTypes

export default ServiceTemplate

export const pageQuery = graphql`
  query serviceQuery($slug: String!) {
    contentfulService(slug: { eq: $slug }) {
      id
      title
      slug
      headline
      description {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulService {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
  }
`
