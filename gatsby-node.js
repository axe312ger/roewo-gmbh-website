/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const slash = require(`slash`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(
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
      .then(result => {
        if (result.errors) {
          reject(result.errors)
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
      })
      .then(resolve)
  })
}
