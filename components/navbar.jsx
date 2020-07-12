import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import navbarStyle from '../styles/navbar';

class Navbar extends React.Component {
  render() {
    return (
      <div className='navbar'>
        <div className='navbar-left'>
          <Link href='/'>
            <a>CHEFY</a>
          </Link>
        </div>
        <div className='navbar-right'>
          <span>{this.props.user.fullname}</span>
        </div>
        <style jsx>{ navbarStyle }</style>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Navbar);
