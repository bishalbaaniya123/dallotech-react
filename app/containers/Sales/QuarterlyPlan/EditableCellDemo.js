import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  fetchAction,
  addAction,
  removeAction,
  updateAction,
  editAction,
  saveAction,
  closeNotifAction,
} from 'dan-actions/CrudTbActions';
import { CrudTable, Notification } from 'dan-components';
import styles from 'dan-components/Tables/tableStyle-jss';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AirplaneIcon from '@material-ui/icons/AirplanemodeActive';
import RoadIcon from '@material-ui/icons/LocalShipping';
import RailIcon from '@material-ui/icons/Train';
import SeaIcon from '@material-ui/icons/DirectionsBoat';


// Reducer Branch
const branch = 'crudTableDemo';

const anchorTable = [
  {
    name: 'id',
    label: 'Id',
    type: 'static',
    initialValue: '',
    hidden: true
  }, {
    name: 'week',
    label: 'Week',
    type: 'number',
    initialValue: 1,
    width: '100',
    hidden: false
  }, {
    name: 'customer_name',
    label: 'Customer Name',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'air_target_volume',
    label: 'AIR',
    type: 'number',
    initialValue: 1,
    width: '100',
    hidden: false
  }, {
    name: 'sea_target_volume',
    label: 'SEA',
    type: 'number',
    initialValue: 1,
    width: '100',
    hidden: false
  }, {
    name: 'rail_target_volume',
    label: 'RAIL',
    type: 'number',
    initialValue: 1,
    width: '100',
    hidden: false
  }, {
    name: 'road_target_volume',
    label: 'ROAD',
    type: 'number',
    initialValue: 1,
    width: '100',
    hidden: false
  }, {
    name: 'no_of_shipment',
    label: 'Number of Shipment',
    type: 'number',
    initialValue: 1,
    width: '100',
    hidden: false
  }, {
    name: 'revenue_target',
    label: 'Revenue Target',
    type: 'number',
    initialValue: 1,
    width: '100',
    hidden: false
  }, {
    name: 'priority',
    label: 'Priority',
    type: 'selection',
    initialValue: 'MEDIUM',
    options: ['HIGH', 'MEDIUM', 'LOW'],
    width: 'auto',
    hidden: false
  }, {
    name: 'edited',
    label: '',
    type: 'static',
    initialValue: '',
    hidden: true
  }, {
    name: 'action',
    label: 'Action',
    type: 'static',
    initialValue: '',
    hidden: false
  },
];
const dataApi = [
  {
    'id': 19,
    'week': 1,
    'customer_name': 'dalloTech',
    'air_target_volume': 10,
    'sea_target_volume': 6,
    'rail_target_volume': 2,
    'road_target_volume': 5,
    'no_of_shipment': 89,
    'revenue_target': 8989,
    'priority': 'HIGH',
    'edited': false,
  },
  {
    'id': 1,
    'week': 1,
    'customer_name': 'dalloTech',
    'air_target_volume': 10,
    'sea_target_volume': 6,
    'rail_target_volume': 2,
    'road_target_volume': 5,
    'no_of_shipment': 89,
    'revenue_target': 8989,
    'priority': 'HIGH',
    'edited': false,
  },
  {
    'id': 2,
    'week': 1,
    'customer_name': 'dalloTech',
    'air_target_volume': 10,
    'sea_target_volume': 6,
    'rail_target_volume': 2,
    'road_target_volume': 5,
    'no_of_shipment': 89,
    'revenue_target': 8989,
    'priority': 'HIGH',
    'edited': false,
  },
  {
    'id': 3,
    'week': 1,
    'customer_name': 'dalloTech',
    'air_target_volume': 10,
    'sea_target_volume': 6,
    'rail_target_volume': 2,
    'road_target_volume': 5,
    'no_of_shipment': 89,
    'revenue_target': 8989,
    'priority': 'HIGH',
    'edited': false,
  },
  {
    'id': 4,
    'week': 1,
    'customer_name': 'dalloTech',
    'air_target_volume': 10,
    'sea_target_volume': 6,
    'rail_target_volume': 2,
    'road_target_volume': 5,
    'no_of_shipment': 89,
    'revenue_target': 8989,
    'priority': 'HIGH',
    'edited': false,
  },
  {
    'id': 5,
    'week': 1,
    'customer_name': 'dalloTech',
    'air_target_volume': 10,
    'sea_target_volume': 6,
    'rail_target_volume': 2,
    'road_target_volume': 5,
    'no_of_shipment': 89,
    'revenue_target': 8989,
    'priority': 'HIGH',
    'edited': false,
  },
  {
    'id': 6,
    'week': 1,
    'customer_name': 'dalloTech',
    'air_target_volume': 10,
    'sea_target_volume': 6,
    'rail_target_volume': 2,
    'road_target_volume': 5,
    'no_of_shipment': 89,
    'revenue_target': 8989,
    'priority': 'HIGH',
    'edited': false,
  },
];

class CrudTableDemo extends Component {
  render() {
    const {
      classes,
      fetchData,
      addEmptyRow,
      dataTable,
      removeRow,
      updateRow,
      editRow,
      finishEditRow,
      closeNotif,
      messageNotif,
    } = this.props;
    return (
      <div>
        <Paper style={{ padding: 10 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                <Grid item xs={2}>
                  <Typography variant="caption" style={{marginTop: '5%'}}>
                    <strong>
                      Quarterly Summary
                    </strong>
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="caption">
                    Target Revenue
                  </Typography>
                  <Typography variant="caption">
                    $ 1000
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption">
                    Target Volume
                  </Typography>
                  <Typography variant="caption">
                    <span style={{ marginRight: 20 }}><AirplaneIcon style={{fontSize: '18px'}}/>1000</span>
                    <span style={{ marginRight: 20 }}><SeaIcon style={{fontSize: '18px'}}/>1000</span>
                    <span style={{ marginRight: 20 }}><RailIcon style={{fontSize: '18px'}}/>1000</span>
                    <span style={{ marginRight: 20 }}><RoadIcon style={{fontSize: '18px'}}/>100000</span>
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="caption">
                    Total Customers
                  </Typography>
                  <Typography variant="caption">
                    100
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="caption">
                    Total Shipments
                  </Typography>
                  <Typography variant="caption">
                    5000
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Notification close={() => closeNotif(branch)} message={messageNotif}/>
        <div className={classes.rootTable}>
          <CrudTable
            dataInit={dataApi}
            anchor={anchorTable}
            title="Quarterly Plan"
            dataTable={dataTable}
            fetchData={fetchData}
            addEmptyRow={addEmptyRow}
            removeRow={removeRow}
            updateRow={updateRow}
            editRow={editRow}
            finishEditRow={finishEditRow}
            branch={branch}
          />
        </div>
      </div>
    );
  }
}

CrudTableDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  dataTable: PropTypes.object.isRequired,
  addEmptyRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  finishEditRow: PropTypes.func.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  dataTable: state.getIn([branch, 'dataTable']),
  messageNotif: state.getIn([branch, 'notifMsg']),
});

const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
  addEmptyRow: bindActionCreators(addAction, dispatch),
  removeRow: bindActionCreators(removeAction, dispatch),
  updateRow: bindActionCreators(updateAction, dispatch),
  editRow: bindActionCreators(editAction, dispatch),
  finishEditRow: bindActionCreators(saveAction, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
});

const CrudTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrudTableDemo);

export default withStyles(styles)(CrudTableMapped);
