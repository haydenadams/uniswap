import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, css } from 'styled-components'

export * from './components'

const MEDIA_WIDTHS = {
  upToSmall: 600,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  accumulator[size] = (...args) => css`
    @media (max-width: ${MEDIA_WIDTHS[size]}px) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

const flexColumnNoWrap = css`
  display: flex;
  flex-flow: column nowrap;
`

const flexRowNoWrap = css`
  display: flex;
  flex-flow: row nowrap;
`

const themeLight = {
  white: '#FFFFFF',
  black: '#000000',
  // grays
  concreteGray: '#FAFAFA',
  mercuryGray: '#E1E1E1',
  silverGray: '#C4C4C4',
  chaliceGray: '#AEAEAE',
  doveGray: '#737373',
  mineshaftGray: '#2B2B2B',
  buttonOutlineGrey: '#f2f2f2',
  //blacks
  charcoalBlack: '#404040',
  // blues
  zumthorBlue: '#EBF4FF',
  malibuBlue: '#5CA2FF',
  royalBlue: '#2F80ED',
  // purples
  wisteriaPurple: '#DC6BE5',
  // reds
  salmonRed: '#FF6871',
  // orange
  pizazzOrange: '#FF8F05',
  // yellows
  warningYellow: '#FFE270',
  // pink
  uniswapPink: '#DC6BE5',
  connectedGreen: '#27AE60',

  // media queries
  mediaWidth: mediaWidthTemplates,
  // css snippets
  flexColumnNoWrap,
  flexRowNoWrap
}

const themeDark = {
  white: '#1b1b1b',
  black: '#FFF',
  // grays

  // darkBG: '#1a1a1a',
  darkBG: '#0c0c0c',

  concreteGray: '#121212',
  mercuryGray: '#2B2B2B',
  silverGray: '#737373',
  chaliceGray: '#AEAEAE',
  doveGray: '#C4C4C4',
  mineshaftGray: '#E1E1E1',
  buttonOutlineGrey: '#FAFAFA',
  //blacks
  charcoalBlack: '#f2f2f2',
  // blues
  zumthorBlue: '#121319',
  malibuBlue: '#e67aef',
  royalBlue: '#DC6BE5',
  // purples
  wisteriaPurple: '#DC6BE5',
  // reds
  salmonRed: '#FF6871',
  // orange
  pizazzOrange: '#FF8F05',
  // yellows
  warningYellow: '#FFE270',
  // pink
  uniswapPink: '#DC6BE5',
  connectedGreen: '#27AE60',

  // media queries
  mediaWidth: mediaWidthTemplates,
  // css snippets
  flexColumnNoWrap,
  flexRowNoWrap
}

const theme = mode => (mode === 'dark' ? themeDark : themeLight)

export default theme
