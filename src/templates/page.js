import React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Services from '../components/services'

const propTypes = {
  data: PropTypes.object.isRequired
}

const ChunkImageText = styled.div`
  display: flex;
  flex-direction: ${({appearance}) => {
    if (appearance === 'leftImageRightText') {
      return 'row'
    }
    if (appearance === 'leftTextRightImage') {
      return 'row-reverse'
    }
    return 'column'
  }};
  margin-bottom: 1rem;
`

const ChunkImageTextFigure = styled.figure`
  flex: 1 0 ${(({appearance}) => appearance === 'topImageBottomText' ? '100%' : '33%')};
  margin: 0;
`

const ChunkImageTextText = styled.div`
  flex: 1 1 auto;
  ${(({appearance}) => appearance === 'leftImageRightText' && 'padding-left: 1rem')};
  ${(({appearance}) => appearance === 'leftTextRightImage' && 'padding-right: 1rem')};
`

class PageTemplate extends React.Component {
  render () {
    const page = this.props.data.contentfulPage
    const {
      headline,
      title,
      contentChunks,
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
        {contentChunks.map(({appearance, image, text}) => (
          <ChunkImageText appearance={appearance}>
            { image && (
              <ChunkImageTextFigure appearance={appearance}>
                <Img sizes={image.sizes} />
              </ChunkImageTextFigure>
            )}
            { text && (
              <ChunkImageTextText appearance={appearance} dangerouslySetInnerHTML={{ __html: text.childMarkdownRemark.html }} />
            )}
          </ChunkImageText>
        ))}
        {serviceArea}
      </article>
    )
  }
}

PageTemplate.propTypes = propTypes

export default PageTemplate

export const pageQuery = graphql`
  query pageQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      title
      slug
      headline
      contentChunks {
        id
        appearance
        image {
          sizes {
            ...GatsbyContentfulSizes
          }
        }
        text {
          childMarkdownRemark {
            html
          }
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
