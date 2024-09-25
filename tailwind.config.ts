import type { Config } from 'tailwindcss'
import flowbite from 'flowbite-react/tailwind'

const config: Config = {
  content: [
    './src/modules/**/*.{ts,tsx}',
    './src/@common/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      zIndex: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
        1000: '1000'
      }
    },
    colors: {
      primary: {
        50: '#E8EDEF',
        100: '#B8C6CD',
        200: '#95ABB5',
        300: '#658494',
        400: '#476D7F',
        500: '#19485F',
        600: '#174256',
        700: '#123343',
        800: '#0E2834',
        900: '#0B1E28'
      },
      secondary: {
        50: '#FBFCF6',
        100: '#F3F5E3',
        200: '#EEF1D5',
        300: '#E6EAC2',
        400: '#E1E6B6',
        500: '#D9E0A4',
        600: '#C5CC95',
        700: '#9A9F74',
        800: '#777B5A',
        900: '#5B5E45'
      },
      success: {
        50: '#F0F8E9',
        100: '#CFEABC',
        200: '#B8E09B',
        300: '#97D26E',
        400: '#83C951',
        500: '#64BC26',
        600: '#5BAB23',
        700: '#47851B',
        800: '#376715',
        900: '#2A4F10'
      },
      warning: {
        50: '#FFFBE6',
        100: '#FDF1B1',
        200: '#FDEA8B',
        300: '#FCE155',
        400: '#FBDB35',
        500: '#FAD202',
        600: '#E4BF02',
        700: '#B29501',
        800: '#8A7401',
        900: '#695801'
      },
      error: {
        50: '#FDE8E6',
        100: '#F8B7B0',
        200: '#F5948A',
        300: '#F16355',
        400: '#EE4534',
        500: '#EA1601',
        600: '#D51401',
        700: '#A61001',
        800: '#810C01',
        900: '#620900'
      },
      gray: {
        50: '#f6f6f6',
        100: '#e7e7e7',
        200: '#d1d1d1',
        300: '#b0b0b0',
        400: '#888888',
        500: '#6d6d6d',
        600: '#5d5d5d',
        700: '#4f4f4f',
        800: '#454545',
        900: '#3d3d3d',
        950: '#262626'
      },
      gold: '#FFD700',
      white: '#FFFFFF',
      transparent: 'transparent'
    },
    borderRadius: {
      none: '0',
      xs: '0.25rem',
      sm: '0.5rem',
      DEFAULT: '1rem',
      lg: '2rem',
      full: '9999px'
    }
  },
  plugins: [flowbite.plugin()],
}

export default config
