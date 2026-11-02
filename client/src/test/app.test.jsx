

import { MemoryRouter } from "react-router"
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders the main heading', () => {

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})