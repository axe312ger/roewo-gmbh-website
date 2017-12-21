import React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Services from '../components/services'
import { media } from '../style-helpers'

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
  margin: 0 -0.5rem;
  flex-wrap: wrap;

  ${media.desktop`
    flex-wrap: nowrap;
  `}
`

const ChunkImageTextFigure = styled.figure`
  flex: 1 0 ${(({appearance}) => appearance === 'topImageBottomText' ? '100%' : '33%')};
  max-width: 300px;
  padding: 0 0.5rem;
  margin: 0.5rem auto;
`

const ChunkImageTextText = styled.div`
  flex: 1 1 auto;
  ${(({appearance}) => appearance === 'leftImageRightText' && 'padding-left: 1rem')};
  ${(({appearance}) => appearance === 'leftTextRightImage' && 'padding-right: 1rem')};
  padding: 0 0.5rem;
  margin: 0.5rem 0;
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
        {contentChunks.map(({id, appearance, image, text}) => (
          <ChunkImageText key={id} appearance={appearance}>
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
