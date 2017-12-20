module.exports = {
  siteMetadata: {
    title: `RöWo GmbH Containerservice`,
    siteUrl: 'http://roewo-gmbh.de'
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: 'eu8dg2kvznyj',
        accessToken: '8573bd829343cbcdc68651e201cf64f93403b9da0e0203fa6e53e6dfe1858241'
      }
    },
    `gatsby-plugin-react-helmet`,
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-3103140-14'
      }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        'name': 'RöWo GmbH',
        'short_name': 'RöWo',
        'start_url': '/',
        'background_color': '#b20e2b',
        'icons': [
          {
            'src': '/android-chrome-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': '/android-chrome-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ],
        'theme_color': '#b20e2b',
        'display': 'standalone'
      }
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-offline',
    'gatsby-transformer-remark'
  ]
}
