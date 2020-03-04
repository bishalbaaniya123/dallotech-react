import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Sales from '@material-ui/icons/InsertChart';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Vertical from '@material-ui/icons/VerticalAlignTop';
import Commodities from '@material-ui/icons/Assignment';
import colorfull from 'dan-api/palette/colorfull';
import CounterWidget from '../Counter/CounterWidget';
import styles from './widget-jss';


class CounterIconWidget extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootCounterFull}>
        <Grid container spacing={16}>
          <Grid item xs={6} md={6}>
            <CounterWidget
              color={colorfull[0]}
              start={0}
              end={200}
              duration={3}
              title="Sales"
            >
              <Sales className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={6}>
            <CounterWidget
              color={colorfull[1]}
              start={0}
              end={25}
              duration={3}
              title="Customers"
            >
              <SupervisorAccount className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={6}>
            <CounterWidget
              color={colorfull[2]}
              start={0}
              end={80}
              duration={3}
              title="Vertical Types"
            >
              <Vertical className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={6}>
            <CounterWidget
              color={colorfull[3]}
              start={0}
              end={230}
              duration={3}
              title="Commodities"
            >
              <Commodities className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CounterIconWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CounterIconWidget);
