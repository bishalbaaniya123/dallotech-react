import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import { withRouter } from 'react-router-dom';
import api from 'dan-api/remote-api/index';
import {reactLocalStorage} from 'reactjs-localstorage';
import { getItem, setItem } from '../../../api/localStorage/localStorage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { tokenAction } from '../../../actions/SelfActions';

class Login extends React.Component {
  state = {
    valueForm: [],
    email: '',
    password: '',
  };

  componentDidMount() {
    console.log("this is componentDidMount from login");
    this.props.tokenAction("token is this");
  }

  submitForm() {
    /*
    const { valueForm } = this.state;
    this.setState({ valueForm: values }, () => {
    });
    // window.location.href = '/app';*/
    let body = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.history.push({
      pathname: "/app"
    });


/*
    api.loginUser(body)
      .then(res => {
        setItem('token', 'Bearer ' + res.access_token);

        this.props.history.push({
          pathname: "/app"
        })
      });
*/
  }

  handleChangeKey = (val, key) => {
    this.setState({
      [key]: val
    })
  };

  render() {
    const title = brand.name + ' - Login';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description}/>
          <meta property="og:title" content={title}/>
          <meta property="og:description" content={description}/>
          <meta property="twitter:title" content={title}/>
          <meta property="twitter:description" content={description}/>
        </Helmet>
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <LoginForm
              onSubmit={(values) => this.submitForm(values)}
              handleChangeKey={this.handleChangeKey}
            />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
};

const mapStateToProps = (state) => {
  for (let i = 0; i < localStorage.length; i++){
    // do something with localStorage.getItem(localStorage.key(i));
  }
  return {
    tokenAction: tokenAction
  };
};

const smartLoginComponent = connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Login)));
export default smartLoginComponent;


// export default withRouter(withStyles(styles)(Login));
