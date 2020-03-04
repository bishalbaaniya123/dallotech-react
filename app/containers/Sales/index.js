import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles/index';
import { PapperBlock } from 'dan-components';
import { AdvFilter, EditableCellSales } from '../Tables/demos';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class SalesTableMain extends Component {
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
          title="Sales Queries"
        >
          <div>
            {/*<AdvFilter />*/}

            <EditableCellSales />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

SalesTableMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SalesTableMain);
