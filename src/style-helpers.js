import { css } from 'styled-components'

export const media = {
  desktop: (...args) => css`
    @media (min-width: 600px) {
      ${css(...args)}
    }
  `
}
