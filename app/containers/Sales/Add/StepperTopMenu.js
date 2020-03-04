import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';


const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  mainGrid: {
    marginBottom: "10px",
    '& $singleGrid': {
      borderRadius: "0",
      padding: "10px",
      textAlign: "center",
    }
  },
  singleGrid: {},
  activeGrid: {
    borderBottom: "5px solid #d8ebf9"
  },
  headerText: {
    fontSize: "0.5em"
  },
  descriptionText: {
    fontSize: "0.2em"
  },
});


class StepperTopMenu extends React.Component {

  constructor(props){
    super(props);
    this.state={
      currentActiveTab: props.currentActiveTab
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ currentActiveTab: nextProps.currentActiveTab });
  }

  state = {
    activeStep: 0,
    altLabel: true,
    skipped: new Set(),
  };


  render() {
    const { classes } = this.props;

    const activePaper = classNames(classes.singleGrid, classes.activeGrid);
    const inActivePaper = classNames(classes.singleGrid);

    return (
      <Grid container spacing={0} className={classes.mainGrid}>
        <Grid item xs={4}>
          <Paper className={this.state.currentActiveTab === "BASIC_INFORMATION" ? activePaper : inActivePaper}>
            <h1 className={classes.headerText}>Basic Information</h1>
            <p className={classes.descriptionText}>Customer, Mode and Direction</p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={this.state.currentActiveTab === "TRADE_LANES" ? activePaper : inActivePaper}>
            <h1 className={classes.headerText}>Trade-Lanes</h1>
            <p className={classes.descriptionText}>Routes, Customs and Fees</p>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={this.state.currentActiveTab === "EXTRA_INFORMATION" ? activePaper : inActivePaper}>
            <h1 className={classes.headerText}>Extra Information</h1>
            <p className={classes.descriptionText}>Equipment, Packaging, Free Time and Remarks</p>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(StepperTopMenu);
