import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles/index';
import { PapperBlock } from 'dan-components';
import CustomerRegistration from './CustomerRegistrationTable';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class CustomerRegistrationMain extends Component {
  render() {
    const title = brand.name + ' - Table';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock
          whiteBg
          icon="ios-create-outline"
          title="Customer Registration"
          style={{padding: "0"}}
          iconStyle={{display:"none"}}
        >
          <CustomerRegistration/>
        </PapperBlock>
      </div>
    );
  }
}

CustomerRegistrationMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerRegistrationMain);
