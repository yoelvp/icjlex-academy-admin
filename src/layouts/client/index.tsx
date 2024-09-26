import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '@/@features/client/components/footer'
import { Header } from '@/@features/client/components/header'

export const ClientLayout = () => {
  return (
    <Fragment>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  )
}
