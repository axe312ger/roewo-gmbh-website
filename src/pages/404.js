import React from 'react'
import Link from 'gatsby-link'

const NotFoundPage = () => (
  <div>
    <h1>404 - NOT FOUND</h1>
    <p>Diese Seite existiert leider nicht ... <Link to='/'>Klicken Sie hier um zur Startseite zu gelangen</Link>.</p>
  </div>
)

export default NotFoundPage
