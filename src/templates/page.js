import React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const propTypes = {
  data: PropTypes.object.isRequired
}

class ArticleTemplate extends React.Component {
  render () {
    const article = this.props.data.contentfulPage
    const {
      headline,
      title,
      content
    } = article
    return (
      <article className='c-article'>
        <Helmet title={`${title} - RöWo GmbH Containerservice`} />
        <h1>{headline}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }} />
      </article>
    )
  }
}

ArticleTemplate.propTypes = propTypes

export default ArticleTemplate

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
  }
`
