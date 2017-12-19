/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const slash = require(`slash`)

async function loadPages (graphql, createPage) {
  const result = await graphql(
    `
    {
      allContentfulPage(limit: 1000) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `
  )

  if (result.errors) {
    throw result.errors
  }

  const pageTemplatePath = slash(path.resolve(`./src/templates/page.js`))

  result.data.allContentfulPage.edges.forEach((edge) => {
    const path = edge.node.slug === 'home' ? '/' : `/${edge.node.slug}`
    createPage({
      path,
      component: pageTemplatePath,
      context: {
        id: edge.node.id,
        slug: edge.node.slug
      }
    })
  })
}

async function loadServices (graphql, createPage) {
  const result = await graphql(
    `
    {
      allContentfulService(limit: 1000) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `
  )

  if (result.errors) {
    throw result.errors
  }

  const pageTemplatePath = slash(path.resolve(`./src/templates/service.js`))

  result.data.allContentfulService.edges.forEach((edge) => {
    const path = `/service/${edge.node.slug}`
    createPage({
      path,
      component: pageTemplatePath,
      context: {
        id: edge.node.id,
        slug: edge.node.slug
      }
    })
  })
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return Promise.all([
    loadPages(graphql, createPage),
    loadServices(graphql, createPage)
  ])
}
