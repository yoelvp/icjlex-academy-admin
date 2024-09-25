import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '@/@common/components/footer'
import { Header } from '@/@common/components/header'

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
