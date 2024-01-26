import { Navbar } from "./Navbar"
import PropTypes from 'prop-types';
import { Fragment } from "react";

export const Layout = ({children}) => {
  return (
    <Fragment>
      <div className="container mx-auto">
        <Navbar/>
        {children}
      </div>
    </Fragment>
  )
}


Layout.propTypes = {
  children: PropTypes.any
}