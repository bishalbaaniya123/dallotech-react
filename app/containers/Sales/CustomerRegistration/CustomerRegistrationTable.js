import React, { Component, Fragment } from 'react';
import './main.css';
import '../styles/tableStyle-jss';
import PropTypes from 'prop-types';
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
import { CrudTableSales, Notification, TextSuggestion } from 'dan-components';

import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EyeIcon from '@material-ui/icons/RemoveRedEye';

import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import api from 'dan-api/remote-api/index';

import 'dan-styles/vendors/react-dropzone/react-dropzone.css';
import ActionDelete from '@material-ui/icons/Delete';
import FileIcon from '@material-ui/icons/Description';


//for dialog
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import FormHelperText from '@material-ui/core/FormHelperText';
//end for dialog

import { MaterialDropZone } from 'dan-components';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputMaterial from '@material-ui/core/Input/Input';
import Snackbar from '@material-ui/core/Snackbar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import { formatter, sizeFormatted } from '../../../api/extras/formatter';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import AirplaneIcon from '@material-ui/icons/AirplanemodeActive';
import RoadIcon from '@material-ui/icons/LocalShipping';
import RailIcon from '@material-ui/icons/Train';
import SeaIcon from '@material-ui/icons/DirectionsBoat';
import { SelectSuggestionTags } from '../../Forms/demos';


// Reducer Branch
const branch = 'crudTableDemo';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& table': {
      minWidth: 500,
      [theme.breakpoints.down('md')]: {
        '& td': {
          height: 40
        }
      }
    }
  },
  marginLeft10: {
    marginLeft: 10
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: -10,
  },
  denseInput: {
    height: 12,
    fontSize: 10
  },
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing.unit * 0.5,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  singleItem: {
    padding: 10
  },
  marginTop20: {
    marginTop: 20
  },
  marginBottom20: {
    marginBottom: 20
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  dropItem: {
    borderColor: theme.palette.divider,
    background: theme.palette.background.default,
    borderRadius: theme.rounded.medium,
    color: theme.palette.text.disabled,
    textAlign: 'center'
  },
  uploadIconSize: {
    width: 72,
    height: 72,
    display: 'inline-block',
    '& svg': {
      fill: theme.palette.secondary.main,
    }
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    '& svg': {
      fill: theme.palette.common.white
    }
  },
  button: {
    marginTop: 20
  },
  select: {
    // padding: '18px 8px 4px'
    padding: 0
  },
  styledClass: {
    padding: '18px 8px 4px'
  },
  selectMenu: {
    padding: '18px 8px 4px'
  }
});

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SalesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          name: 'Company',
          options: {
            filter: true,
          }
        },
        {
          name: 'Contact Person',
          options: {
            filter: true,
          }
        },
        {
          name: 'Actions',
          options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              return <Button variant="contained" color="secondary" size="small" style={{ fontSize: '10px' }}
                             onClick={() => this.handleClickOpenView(value)}
              >
                <EyeIcon style={{
                  fontSize: 15,
                  marginRight: 5
                }}
                />
                View/Edit
              </Button>;
            }
          }
        }
      ],
      data: [
        ['Colmans Garments Industries', 'Bishal Baaniya', 1],
        ['Colmans Garments Industries', 'Bishal Baaniya', 1],
        ['Colmans Garments Industries', 'Bishal Baaniya', 1],
        ['Colmans Garments Industries', 'Bishal Baaniya', 1],
        ['Colmans Garments Industries', 'Bishal Baaniya', 1],
        ['Colmans Garments Industries', 'Bishal Baaniya', 1],
      ],
      value: 0,
      open: false,
      openView: false,

      currentEditingItem: {
        follow_up_id: 6,
        customer: {
          customer_id: 1,
          customer_name: 'sagar'
        },
        meeting_with: 'dsds',
        discussion: 'dsdsdsdsd',
        comment: null
      },

      additionItem: {
        company_name: '',
        pan_or_vat_no: '',

        country: '',
        state: '',
        street_address_1: '',
        street_address_2: '',


        contact_person_name: '',
        designation: '',
        mobileNumber: '',

        vertical: '',
        prefer_mode: '',


        volume_air: '',
        volume_sea: '',
        business_type: 'IMPORT',


        kyc_file_path: ''
      },


      meeting_with: '',
      allData: [],
      currentEditingKey: '',
      isDisabled: true,
      week: 1,
      business_type: 'B2B',
      priority: '',
      no_of_shipments: '',
      revenue_target: '',
      targeted_volume: {
        air: '',
        sea: '',
        rail: '',
        road: '',
      },
      files: [],
      acceptedFiles: this.props.acceptedFiles,
      showToast: false,
      toastMessage: '',
      preferences: ['AIR_FREIGHT', 'SEA_FREIGHT', 'CUSTOM_CLEARANCE', 'PROJECT_MANAGEMENT', 'ROAD_RAIL_FREIGHT', 'CONSOLIDATION', 'WAREHOUSING',
        'SECURED_LOGISTICS', 'BULK_AND_BREAKBULK', 'SHIPPING_LINE_AGENCY', 'LOGISTIC_MANAGEMENT', 'TRANSPORTATION']
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    /*
            api.getFollowUpList()
              .then(res => {
                let initialData = res.content;
                let finalArray = [];

                for (let i = 0; i < initialData.length; i++) {
                  let singleItem = initialData[i];
                  let singleArray = [];
                  singleArray.push(
                    singleItem.customer.customer_name,
                    singleItem.meeting_with,
                    singleItem.discussion,
                    singleItem.comment || '-',
                    singleItem.follow_up_id,
                  );
                  finalArray.push(singleArray);
                }
                this.setState({
                  data: finalArray,
                  allData: res.content
                });
              });
    */
  }

  handleClickOpen = (itemIndex) => {
    this.setState({ open: true });
  };

  handleClickOpenView = (itemIndex) => {
    const { allData, currentEditingKey } = this.state;
    let key = '';
    let item = '';
    for (let i = 0; i < allData.length; i++) {
      if (allData[i].follow_up_id === itemIndex) {
        key = i;
        item = allData[i];
        break;
      }
    }

    this.setState({
      currentEditingItem: item,
      currentEditingKey: key,
      openView: true
    });

  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseView = () => {
    this.setState({ openView: false });
  };


  handleChangeTabs = (event, value) => {
    this.setState({ value });
  };

  renderFunction = () => {
    return <div>Hello man</div>;
  };

  addTableItem = () => {
    this.setState({
      open: true
    });
  };

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: '#FF0000'
        }
      }
    }
  });

  handleChangeCustomerId = (name1, name2, id) => {
    this.setState((prevState) => ({
      ...prevState,
      additionItem: {
        ...prevState.additionItem,
        customer_id: id
      }
    }));
  };


  handleChangeCustomerIdEdit = (name1, name2, id) => {
    this.setState((prevState) => ({
      ...prevState,
      currentEditingItem: {
        ...prevState.currentEditingItem,
        customer: {
          ...prevState.currentEditingItem.customer,
          customer_id: id
        }
      }
    }));
  };

  handleSubmitCustomerRegistration = () => {
    let body = this.state.additionItem;
    console.clear();

    api.submitCustomerRegistration(body)
      .then(res => {
        if (res.ok) {
          this.setState({
            open: false,
            showToast: true,
            toastMessage: 'Customer has been added successfully'
          });
        }
      });

    /*api.submitFollowUp(body)
      .then(res => {

        let newData = [];
        newData.push(
          res.customer.customer_name,
          res.meeting_with,
          res.discussion,
          res.comment || '',
          res.follow_up_id,
        );

        let updatedStateData = this.state.data;
        updatedStateData.push(newData);

        this.setState((prevState) => ({
          ...prevState,
          data: updatedStateData,
          open: false,
        }));

      });*/
  };

  handleSubmitEdit = () => {
    const { currentEditingItem } = this.state;

    let body = {
      follow_up_id: currentEditingItem.follow_up_id,
      customer_id: currentEditingItem.customer.customer_id,
      meeting_with: currentEditingItem.meeting_with || '',
      discussion: currentEditingItem.discussion || '',
      comment: currentEditingItem.comment || '',
    };

    api.editFollowUp(body)
      .then(res => {

        let newData = [];
        newData.push(
          res.customer.customer_name,
          res.meeting_with,
          res.discussion,
          res.comment,
          res.follow_up_id,
        );

        this.setState((prevState) => ({
          ...prevState,
          data: [
            ...prevState.data.slice(0, this.state.currentEditingKey),
            newData,
            ...prevState.data.slice(this.state.currentEditingKey + 1)
          ],
          openView: false,
        }));
      });

  };

  handleChangeSimpleFields = (val, key, addOrEdit) => {
    this.setState((prevState) => ({
      ...prevState,
      [addOrEdit]: {
        ...prevState[addOrEdit],
        [key]: val
      }
    }));

  };


  handleChangeNestedFields = (val, key1, key2) => {
    this.setState((prevState) => ({
      ...prevState,
      [key1]: {
        ...prevState[key1],
        [key2]: val
      }
    }));
  };

  /*for file upload*/
  onDrop(filesVal) {
    const { files } = this.state;
    const { filesLimit } = this.props;
    let oldFiles = files;
    const filesLimitVal = filesLimit || '3';
    oldFiles = oldFiles.concat(filesVal);
    if (oldFiles.length > filesLimit) {
      this.setState({
        openSnackBar: true,
        errorMessage: 'Cannot upload more than ' + filesLimitVal + ' items.',
      });
    } else {
      this.setState({ files: oldFiles });
    }
  }

  onDropRejected() {
    this.setState({
      openSnackBar: true,
      errorMessage: 'File too big, max size is 3MB',
    });
  }

  handleRequestCloseSnackBar = () => {
    this.setState({
      openSnackBar: false,
    });
  };

  handleRemove(file, fileIndex) {
    const thisFiles = this.state.files; // eslint-disable-line
    // This is to prevent memory leaks.
    window.URL.revokeObjectURL(file.preview);

    thisFiles.splice(fileIndex, 1);
    this.setState({ files: thisFiles });
  }

  /*end for file upload*/

  render() {
    const { classes } = this.props;

    const { columns, data, columnsCompleted, dataCompleted } = this.state;

    const options = {
      filterType: 'checkbox',
    };

    const { value } = this.state;


    /*for file upload*/
    const {
      showPreviews,
      maxSize,
      text,
      showButton,
      filesLimit,
      ...rest
    } = this.props;

    const acceptedFiles = ['image/jpeg', 'image/png', 'image/bmp'];


    const {
      files,
      openSnackBar,
      errorMessage
    } = this.state;
    const fileSizeLimit = maxSize || 3000000;
    const deleteBtn = (file, index) => (
      <Tooltip title="Delete this file">
        <div className="middle">
          <IconButton onClick={() => this.handleRemove(file, index)}>
            <ActionDelete className="removeBtn"/>
          </IconButton>
        </div>
      </Tooltip>
    );
    const previews = filesArray => filesArray.map((file, index) => {
      const path = file.preview || '/pic' + file.path;

      return (
        <div key={index.toString()}>
          <div className="imageContainer col fileIconImg">
            <FileIcon className="smallPreviewImg" alt="preview"/>
            {deleteBtn(file, index)}
          </div>
        </div>
      );
    });
    let dropzoneRef;
    /*end for file upload*/

    const { preferences } = this.state;

    return (
      <div>

        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <FormControl style={{ width: '100%', marginLeft: 10 }}>
                  <TextField
                    style={this.props.style}
                    placeholder="Enter company name"
                    value={this.state.additionItem.company_name}
                    onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'company_name', 'additionItem')}
                  />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl className={classes.formControl} style={{ width: '100%', margin: 0, marginLeft: 10 }}>

                    <Select
                      value={this.state.additionItem.volume_air}
                      onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'volume_air', 'additionItem')}
                      input={<Input style={{padding: 0}} name="businessType" id="age-label-placeholder"/>}
                      displayEmpty
                      name="businessType"
                      className={classNames(classes.selectEmpty, classes.select, classes.selectMenu, 'select-add-customer')}
                    >
                      <MenuItem value="">Air Volume</MenuItem>
                      <MenuItem value="RAIL">0-15</MenuItem>
                      <MenuItem value="RAIL">15-30</MenuItem>
                      <MenuItem value="ROAD">30-50</MenuItem>
                      <MenuItem value="ROAD">50-100</MenuItem>
                      <MenuItem value="ROAD">100+</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl className={classes.formControl} style={{ width: '100%', margin: 0 }}>

                    <Select
                      value={this.state.additionItem.volume_air}
                      onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'volume_air', 'additionItem')}
                      input={<Input style={{padding: 0}} name="businessType" id="age-label-placeholder"/>}
                      displayEmpty
                      name="businessType"
                      className={classNames(classes.selectEmpty, classes.select, classes.selectMenu, 'select-add-customer')}
                    >
                      <MenuItem value="">Sea Volume</MenuItem>
                      <MenuItem value="RAIL">0-15</MenuItem>
                      <MenuItem value="RAIL">15-30</MenuItem>
                      <MenuItem value="ROAD">30-50</MenuItem>
                      <MenuItem value="ROAD">50-100</MenuItem>
                      <MenuItem value="ROAD">100+</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                <Grid item xs={4}>
                  <FormControl
                    className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                    aria-describedby="weight-helper-text"
                    style={{ width: '100%' }}
                  >
                    <TextSuggestion
                      placeholder="Enter Country"
                      identifier="country"
                      value=""
                      setNewId={this.handleChangeCustomerId}
                      style={{
                        width: '100%',
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl style={{ width: '100%', marginLeft: 10 }}>
                    <TextField
                      style={this.props.style}
                      placeholder="Enter state"
                      value={this.state.additionItem.company_name}
                      onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'company_name', 'additionItem')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl style={{ width: '100%', marginLeft: 10 }}>
                    <TextField
                      style={this.props.style}
                      placeholder="Enter city"
                      value={this.state.additionItem.company_name}
                      onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'company_name', 'additionItem')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl style={{ width: '100%', marginLeft: 10 }}>
                    <TextField
                      style={this.props.style}
                      placeholder="Enter street address 1"
                      value={this.state.additionItem.company_name}
                      onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'company_name', 'additionItem')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl style={{ width: '100%' }}>
                    <TextField
                      style={this.props.style}
                      placeholder="Enter street address 2"
                      value={this.state.additionItem.company_name}
                      onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'company_name', 'additionItem')}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                <Grid item xs={4}>
                  <FormControl style={{ width: '100%', marginLeft: 10 }}>
                    <TextField
                      style={this.props.style}
                      placeholder="Enter contact person name"
                      value={this.state.additionItem.company_name}
                      onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'company_name', 'additionItem')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl style={{ width: '100%', marginLeft: 10 }}>
                    <TextField
                      style={this.props.style}
                      placeholder="Enter designation"
                      value={this.state.additionItem.company_name}
                      onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'company_name', 'additionItem')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl style={{ width: '100%', marginLeft: 10 }}>
                    <TextField
                      style={this.props.style}
                      placeholder="Enter contact number"
                      value={this.state.additionItem.company_name}
                      onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'company_name', 'additionItem')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{ width: '95%', marginTop: 0 }}>

                    <Select
                      value={this.state.additionItem.volume_air}
                      onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'volume_air', 'additionItem')}
                      input={<Input style={{padding: 0}} name="businessType" id="age-label-placeholder"/>}
                      displayEmpty
                      name="businessType"
                      className={classNames(classes.selectEmpty, classes.select, classes.selectMenu, 'select-add-customer')}
                    >
                      <MenuItem value="">Preferred Mode</MenuItem>
                      <MenuItem value="RAIL">0-15</MenuItem>
                      <MenuItem value="RAIL">15-30</MenuItem>
                      <MenuItem value="ROAD">30-50</MenuItem>
                      <MenuItem value="ROAD">50-100</MenuItem>
                      <MenuItem value="ROAD">100+</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <SelectSuggestionTags
                    placeholder={"Select Required Services"}
                    style={{margin: 0}}
                    rootStyle={{height: 'auto', marginLeft: 10}}
                  />
                  {/*<Paper className={classes.paper}>Preferences</Paper>*/}

                </Grid>
                <Grid item xs={4}>
                  <SelectSuggestionTags
                    placeholder={"Select Vertical(s)"}
                    style={{margin: 0}}
                    rootStyle={{height: 'auto', marginLeft: 10}}
                  />
                  {/*<Paper className={classes.paper}>Preferences</Paper>*/}

                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{ width: '95%', marginTop: 0 }}>

                    <Select
                      value={this.state.additionItem.volume_air}
                      onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'volume_air', 'additionItem')}
                      input={<Input style={{padding: 0}} name="businessType" id="age-label-placeholder"/>}
                      displayEmpty
                      name="businessType"
                      className={classNames(classes.selectEmpty, classes.select, classes.selectMenu, 'select-add-customer')}
                    >
                      <MenuItem value="">Business Type</MenuItem>
                      <MenuItem value="RAIL">Import</MenuItem>
                      <MenuItem value="RAIL">Export</MenuItem>
                      <MenuItem value="ROAD">Both</MenuItem>
                    </Select>
                  </FormControl>
                  {/*<Paper className={classes.paper}>Preferences</Paper>*/}

                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Grid container spacing={24}>

                    <Grid item xs={6}>
                      <FormControl
                        className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                        aria-describedby="weight-helper-text"
                        style={{ width: '100%' }}
                      >
                        <TextSuggestion
                          placeholder="Enter Origin Country"
                          identifier="country"
                          value=""
                          setNewId={this.handleChangeCustomerId}
                          style={{
                            width: '100%',
                          }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControl style={{ width: '100%', marginLeft: 10 }}>
                        <TextField
                          style={this.props.style}
                          placeholder="Enter origin city"
                          value={this.state.additionItem.company_name}
                          onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'company_name', 'additionItem')}
                        />
                      </FormControl>
                    </Grid>

                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={24}>

                    <Grid item xs={6}>
                      <FormControl
                        className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                        aria-describedby="weight-helper-text"
                        style={{ width: '100%' }}
                      >
                        <TextSuggestion
                          placeholder="Enter destination country"
                          identifier="country"
                          value=""
                          setNewId={this.handleChangeCustomerId}
                          style={{
                            width: '100%',
                          }}
                        />
                      </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                      <FormControl style={{ width: '100%' }}>
                        <TextField
                          style={this.props.style}
                          placeholder="Enter destination city"
                          value={this.state.additionItem.company_name}
                          onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'company_name', 'additionItem')}
                        />
                      </FormControl>
                    </Grid>

                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                className={classes.button}
                style={{float: 'right'}}
                variant="contained"
                onClick={this.handleSubmitCustomerRegistration}
              >
                Submit &nbsp;
                <SendIcon/>
              </Button>
            </Grid>

          </Grid>
        </div>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.showToast}
          autoHideDuration={3000}
          onClose={() => {
            this.setState({
              showToast: false
            });
          }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.toastMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseToast}
            >
              <CloseIcon/>
            </IconButton>,
          ]}
        />

      </div>
    );
  }
}

SalesTable.propTypes = {
  classes: PropTypes.object.isRequired
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

const SalesTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesTable);

export default withRouter(withStyles(styles)(SalesTableMapped));
