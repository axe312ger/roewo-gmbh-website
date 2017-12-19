import React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Services from '../components/services'

const propTypes = {
  data: PropTypes.object.isRequired
}

class PageTemplate extends React.Component {
  render () {
    const page = this.props.data.contentfulPage
    const {
      headline,
      title,
      content,
      slug
    } = page

    const services = this.props.data.allContentfulService.edges
    let serviceArea = null
    if (slug === 'home') {
      serviceArea = <Services services={services} />
    }

    return (
      <article>
        <Helmet title={`${title} - RöWo GmbH Containerservice`} />
        <h1>{headline}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }} />
        {serviceArea}
      </article>
    )
  }
}

PageTemplate.propTypes = propTypes

export default PageTemplate

export const pageQuery = graphql`
  query pageQuery($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      slug
      headline
      content {
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
