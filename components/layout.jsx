import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Navbar from './navbar';
import Auth from './auth';
import { setTokens, setUser } from '../actions/auth_actions';
import globalStyle from '../styles/global';

class Layout extends React.Component {
  componentDidMount() {
    if (!this.props.access_token) {
      const tokens = {
        access_token: Cookies.get('access_token'),
        refresh_token: Cookies.get('refresh_token'),
      };
      this.props.setTokens(tokens);
      this.props.setUser(tokens);
    }
  }

  render() {
    if (!this.props.access_token) {
      return (
        <div>
          <Auth/>
          <style jsx global>{ globalStyle }</style>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        {this.props.children}
        <style jsx global>{ globalStyle }</style>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
});

const mapDispatchToProps = dispatch => ({
  setTokens: tokens => dispatch(setTokens(tokens)),
  setUser: tokens => dispatch(setUser(tokens)),

});


export default connect(mapStateToProps, mapDispatchToProps)(Layout);
