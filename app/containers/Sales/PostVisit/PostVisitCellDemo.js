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
    name: 'date',
    label: 'Date',
    type: 'date',
    initialValue: new Date(),
    width: 'auto',
    hidden: false
  }, {
    name: 'customer_name',
    label: 'Customer',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'meeting_with',
    label: 'Meeting With',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'discussion',
    label: 'Discussion',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'followup_date',
    label: 'Followup date',
    type: 'date',
    initialValue: new Date(),
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
    id: 1,
    date: Date.now(),
    customer_name: "Dallo Tech Pvt. Ltd.",
    meeting_with: "Bishal Baaniya",
    discussion: "About new mode of payment",
    followup_date: new Date(),
  },
  {
    id: 2,
    date: Date.now(),
    customer_name: "Dallo Tech Pvt. Ltd.",
    meeting_with: "Bishal Baaniya",
    discussion: "About new mode of payment",
    followup_date: new Date(),
  },
  {
    id: 3,
    date: Date.now(),
    customer_name: "Dallo Tech Pvt. Ltd.",
    meeting_with: "Bishal Baaniya",
    discussion: "About new mode of payment",
    followup_date: new Date(),
  },
  {
    id: 4,
    date: Date.now(),
    customer_name: "Dallo Tech Pvt. Ltd.",
    meeting_with: "Bishal Baaniya",
    discussion: "About new mode of payment",
    followup_date: new Date(),
  },
  {
    id: 5,
    date: Date.now(),
    customer_name: "Dallo Tech Pvt. Ltd.",
    meeting_with: "Bishal Baaniya",
    discussion: "About new mode of payment",
    followup_date: new Date(),
  },
  {
    id: 6,
    date: Date.now(),
    customer_name: "Dallo Tech Pvt. Ltd.",
    meeting_with: "Bishal Baaniya",
    discussion: "About new mode of payment",
    followup_date: new Date(),
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
        <Notification close={() => closeNotif(branch)} message={messageNotif}/>
        <div className={classes.rootTable}>
          <CrudTable
            dataInit={dataApi}
            anchor={anchorTable}
            title="Post Visit"
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
