import React, { Component } from 'react';
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
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import AlarmIcon from '@material-ui/icons/Alarm';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { Divider } from 'antd';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import api from 'dan-api/remote-api/index';

import AirplaneIcon from '@material-ui/icons/AirplanemodeActive';
import RoadIcon from '@material-ui/icons/LocalShipping';
import RailIcon from '@material-ui/icons/Train';
import SeaIcon from '@material-ui/icons/DirectionsBoat';


//for dialog
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
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
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import SelectMaterial from '@material-ui/core/Select/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import FormHelperText from '@material-ui/core/FormHelperText';
import { HighlightSuggestSales } from '../../Forms/demos';
import InputMaterial from '@material-ui/core/Input/Input';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
//end for dialog


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
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  singleItem: {
    padding: 10,
    paddingLeft: 25
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
          name: 'Week No.',
          options: {
            filter: true,
          }
        },
        {
          name: 'Customer',
          options: {
            filter: true,
          }
        },
        {
          name: <AirplaneIcon/>,
        },
        {
          name: <SeaIcon/>,
        },
        {
          name: <RailIcon/>,
        },
        {
          name: <RoadIcon/>,
        },
        {
          name: 'Shipments',
        },
        {
          name: 'Revenue Target',
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
        [1, 'Colmans Garments Industries', '3', '8', '2', '0', '8', 80000000, 1],
        [2, 'A.G Healthcare Technology', '3', '8', '2', '0', '8', 65000000, 1],
        [3, 'Colmans Garments Industries', '3', '8', '2', '0', '8', 100000000, 1],
        [4, 'Colmans Garments Industries', '3', '8', '2', '0', '8', 78000000, 1],
        [5, 'Colmans Garments Industries', '3', '8', '2', '0', '8', 95000000, 1],
        [6, 'Colmans Garments Industries', '3', '8', '2', '0', '8', 1000000, 1],
      ],
      value: 0,
      open: false,
      openView: false,

      currentEditingItem: {
        'sales_plan_id': 8,
        'customer': {
          'customer_id': 1,
          'customer_name': 'dallotech'
        },
        'week': 2,
        'vertical': 'B2B',
        'no_of_shipment': 4,
        'priority': 1,
        'revenue_target': 121,
        'sea_target_volume': 22,
        'air_target_volume': 11,
        'rail_target_volume': 33,
        'road_target_volume': 44
      },

      additionItem: {
        customer_id: '',
        week: 1,
        vertical: 'B2B',
        no_of_shipment: '',
        priority: 'MEDIUM',
        revenue_target: '',
        sea_target_volume: '',
        air_target_volume: '',
        rail_target_volume: null,
        road_target_volume: null
      },


      meeting_with: '',
      allData: [
        {
          'sales_plan_id': 8,
          'customer': {
            'customer_id': 1,
            'customer_name': 'dallotech'
          },
          'week': 2,
          'vertical': 'B2B',
          'no_of_shipment': 4,
          'priority': 1,
          'revenue_target': 121,
          'sea_target_volume': 22,
          'air_target_volume': 11,
          'rail_target_volume': 33,
          'road_target_volume': 44
        }
      ],
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
      showToast: false,
      toastMessage: ''
    };
  }

  componentDidMount() {
    api.getQuarterlyPlan()
      .then(res => {
        this.setState({
          allData: res.content,
          data: this.formatTableData(res.content)
        });
      });
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
    const { allData } = this.state;
    let key = '';
    let item = '';
    for (let i = 0; i < allData.length; i++) {
      if (allData[i].sales_plan_id === itemIndex) {
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

  handleSubmitQuarterlyPlan = () => {
    let body = this.state.additionItem;
    api.submitQuarterlyPlan(body)
      .then(res => {

        let updatedStateData = this.state.allData;
        updatedStateData.unshift(res);

        this.setState({
          allData: updatedStateData,
        }, () => {
          this.setState({
            open: false,
            showToast: true,
            toastMessage: 'Plan Added Successfully'
          });
        });

        /*
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
                }));*/

      });
  };


  handleChangeSimpleFields = (val, key, addOrEdit) => {
    switch (key) {
      case 'air':
        key = 'air_target_volume';
        break;
      case 'sea':
        key = 'sea_target_volume';
        break;
      case 'rail':
        key = 'rail_target_volume';
        break;
      case 'road':
        key = 'road_target_volume';
        break;
      default:
        break;
    }
    this.setState((prevState) => ({
      ...prevState,
      [addOrEdit]: {
        ...prevState[addOrEdit],
        [key]: val
      }
    }));

  };


  handleChangeNestedFields = (val, key1, key2, addOrEdit) => {
    this.setState((prevState) => ({
      ...prevState,
      [addOrEdit]: {
        ...prevState[addOrEdit],
        [key1]: {
          ...prevState[addOrEdit][key1],
          [key2]: val
        },
      }
    }));
  };

  formatTableData = (allData) => {
    let finalArray = [];
    for (let i = 0; i < allData.length; i++) {
      let singleArray = [];
      let singleItem = allData[i];
      singleArray.push(
        singleItem.week,
        singleItem.customer.customer_name,
        singleItem.air_target_volume,
        singleItem.sea_target_volume,
        singleItem.rail_target_volume,
        singleItem.road_target_volume,
        singleItem.no_of_shipment,
        singleItem.revenue_target,
        singleItem.sales_plan_id,
      );
      finalArray.push(singleArray);
    }
    return finalArray;
  };


  handleSubmitEditQuarterlyPlan = () => {
    console.clear();
    let finalJson = this.state.currentEditingItem;
    finalJson['customer_id'] = finalJson.customer.customer_id;
    api.editQuarterlyPlan(finalJson)
      .then(res => {

        let newArray = this.state.allData;

        newArray = [
          ...newArray.slice(0, this.state.currentEditingKey),
          res,
          ...newArray.slice(this.state.currentEditingKey + 1)
        ];


        this.setState({
          allData: newArray
        }, () => {
          this.setState({
            openView: false,
            showToast: true,
            toastMessage: 'Plan edited successfully'
          });
        });
      });

  };

  render() {
    const { classes } = this.props;

    const { allData, columns, data, columnsCompleted, dataCompleted } = this.state;

    const options = {
      filterType: 'checkbox',
    };

    const { value } = this.state;

    return (
      <div>
        <div>
          <div className={classes.rootTable}>
            <Tooltip title="Add New Quarterly Plan">

              <Button variant="contained"
                      onClick={() => this.addTableItem()}
                      color="secondary"
                      style={{
                        marginBottom: '15px',
                        left: '90%'
                      }}
              >
                <AddIcon/>
                Add New
              </Button>
            </Tooltip>

            <div className={classes.table}>
              <MUIDataTable
                title={'Quarterly Plan'}
                data={this.formatTableData(this.state.allData)}
                columns={columns}
                options={options}
              />
            </div>

          </div>
        </div>

        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Add Quarterly Plan
              </Typography>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>

          <Grid container justify="center" className={classes.root} spacing={16}>
            <Grid item xs={8}>
              <Paper className={classNames(classes.paper, classes.singleItem)}>
                <Grid container spacing={24}>
                  <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder">
                        Quarter
                      </InputLabel>
                      <Select
                        value={this.state.additionItem.week}
                        onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'week', 'additionItem')}
                        input={<Input name="week" id="age-label-placeholder"/>}
                        displayEmpty
                        name="quarter"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value={1}>Jan-Mar</MenuItem>
                        <MenuItem value={2}>Apr-Jun</MenuItem>
                        <MenuItem value={3}>Jul-Sep</MenuItem>
                        <MenuItem value={4}>Oct-Dec</MenuItem>
                      </Select>
                      <FormHelperText>Select Quarter</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder">
                        Week
                      </InputLabel>
                      <Select
                        value={this.state.additionItem.week}
                        onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'week', 'additionItem')}
                        input={<Input name="week" id="age-label-placeholder"/>}
                        displayEmpty
                        name="week"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                      </Select>
                      <FormHelperText>Select Week</FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>

                <FormLabel component="legend" className={classes.marginTop20}>Select Customer</FormLabel>
                <TextSuggestion
                  placeholder="Enter Customer Name"
                  identifier="customer_id"
                  suggestionUrl="customers"
                  value=""
                  setNewId={(name1, name2, id) => this.handleChangeSimpleFields(id, 'customer_id', 'additionItem')}
                  style={{
                    marginLeft: '10px',
                    width: '74%'
                  }}
                />

                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder" style={{ zIndex: 0 }}>
                        Vertical
                      </InputLabel>
                      <Select
                        value={this.state.additionItem.vertical}
                        onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'vertical', 'additionItem')}
                        input={<Input name="businessType" id="age-label-placeholder"/>}
                        displayEmpty
                        name="businessType"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="B2B">B2B</MenuItem>
                        <MenuItem value="B2C">B2C</MenuItem>
                        <MenuItem value="C2C">C2C</MenuItem>
                      </Select>
                      <FormHelperText>Select Vertical</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder" style={{ zIndex: 0 }}>
                        Priority
                      </InputLabel>
                      <Select
                        value={this.state.additionItem.priority}
                        onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'priority', 'additionItem')}
                        input={<Input name="businessType" id="age-label-placeholder"/>}
                        displayEmpty
                        name="priority"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="HIGH">High</MenuItem>
                        <MenuItem value="MEDIUM">Medium</MenuItem>
                        <MenuItem value="LOW">Low</MenuItem>
                      </Select>
                      <FormHelperText>Select Priority</FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <FormControl fullWidth className={classNames(classes.margin, 'normal-field')}>
                      <InputLabel htmlFor="adornment-amount"
                                  style={{ zIndex: 0 }}
                      >Total Number of Shipments</InputLabel>
                      <Input
                        id="adornment-amount"
                        className={classNames(classes.marginBottom20, 'no-up-down-arrow')}
                        value={this.state.additionItem.no_of_shipment}
                        type="number"
                        onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'no_of_shipment', 'additionItem')}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classNames(classes.margin, 'normal-field', 'revenue-main')}>
                      <InputLabel htmlFor="adornment-amount"
                                  style={{ zIndex: 0 }}
                      >Revenue Target</InputLabel>
                      <Input
                        id="adornment-amount"
                        startAdornment={<InputAdornment position="start">NRs.</InputAdornment>}
                        className={classNames(classes.marginBottom20, 'no-up-down-arrow')}
                        value={this.state.additionItem.revenue_target}
                        type="number"
                        onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'revenue_target', 'additionItem')}
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container className="main-grid-form">
                  <Grid item xs={12}>
                    <h1>Targeted Volume</h1>
                  </Grid>
                  {['air', 'sea', 'rail', 'road'].map((item, k) => {
                    return (
                      <Grid item xs={6} key={k}>
                        <FormControl
                          className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                          aria-describedby="weight-helper-text"
                        >
                          <FormLabel component="legend" className={classes.title}>
                            {item.charAt(0)
                              .toUpperCase() + item.slice(1)
                              .toLowerCase()}
                          </FormLabel>
                          <InputMaterial
                            id="adornment-weight"
                            value={this.state.weight}
                            onChange={(e) => this.handleChangeSimpleFields(e.target.value, item, 'additionItem')}
                            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                            inputProps={{
                              'aria-label': { item },
                            }}
                            type="number"
                          />
                          <FormHelperText id="weight-helper-text"/>
                        </FormControl>
                      </Grid>
                    );
                  })}

                </Grid>

                <FormLabel component="legend" className={classNames(classes.marginTop20)}/>
                <Button
                  color="secondary"
                  className={classes.button}
                  variant="contained"
                  onClick={this.handleSubmitQuarterlyPlan}
                >
                  Submit &nbsp;
                  <SendIcon/>
                </Button>
              </Paper>
            </Grid>
          </Grid>

        </Dialog>

        <Dialog
          fullScreen
          open={this.state.openView}
          onClose={this.handleCloseView}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Edit Plan
              </Typography>
              <IconButton color="inherit" onClick={this.handleCloseView} aria-label="Close">
                <CloseIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>

          <Grid container justify="center" className={classes.root} spacing={16}>
            <Grid item xs={8}>
              <Paper className={classNames(classes.paper, classes.singleItem)}>


                <Grid container spacing={24}>
                  <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder">
                        Quarter
                      </InputLabel>
                      <Select
                        value={this.state.additionItem.week}
                        onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'week', 'additionItem')}
                        input={<Input name="week" id="age-label-placeholder"/>}
                        displayEmpty
                        name="quarter"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value={1}>Jan-Mar</MenuItem>
                        <MenuItem value={2}>Apr-Jun</MenuItem>
                        <MenuItem value={3}>Jul-Sep</MenuItem>
                        <MenuItem value={4}>Oct-Dec</MenuItem>
                      </Select>
                      <FormHelperText>Select Quarter</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder">
                        Week
                      </InputLabel>
                      <Select
                        value={this.state.currentEditingItem.week}
                        onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'week', 'currentEditingItem')}
                        input={<Input name="week" id="age-label-placeholder"/>}
                        displayEmpty
                        name="week"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                      </Select>
                      <FormHelperText>Select Week</FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>


                <FormLabel component="legend" className={classes.marginTop20}>Select Customer</FormLabel>
                <TextSuggestion
                  placeholder="Enter Customer Name"
                  identifier="customer_id"
                  suggestionUrl="customers"
                  value={this.state.currentEditingItem.customer.customer_name}
                  setNewId={(name1, name2, id, value) => {
                    this.handleChangeNestedFields(id, 'customer', 'customer_id', 'currentEditingItem');
                    this.handleChangeNestedFields(value, 'customer', 'customer_name', 'currentEditingItem');
                  }}
                  // setNewId={(name1, name2, id) => this.handleChangeNestedFields(id, 'customer_id', 'currentEditingItem')}
                  style={{
                    marginLeft: '10px',
                    width: '90%'
                  }}
                />

                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder" style={{ zIndex: 0 }}>
                        Vertical
                      </InputLabel>
                      <Select
                        value={this.state.currentEditingItem.vertical}
                        onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'vertical', 'currentEditingItem')}
                        input={<Input name="businessType" id="age-label-placeholder"/>}
                        displayEmpty
                        name="businessType"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="B2B">B2B</MenuItem>
                        <MenuItem value="B2C">B2C</MenuItem>
                        <MenuItem value="C2C">C2C</MenuItem>
                      </Select>
                      <FormHelperText>Select Vertical</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="standard-priority"
                      label="Priority"
                      className={classes.textField}
                      value={this.state.currentEditingItem.priority}
                      onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'priority', 'currentEditingItem')}
                      margin="normal"
                      style={{ zIndex: 0 }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <FormControl fullWidth className={classNames(classes.margin, 'normal-field')}>
                      <InputLabel htmlFor="adornment-amount"
                                  style={{ zIndex: 0 }}
                      >Total Number of Shipments</InputLabel>
                      <Input
                        id="adornment-amount"
                        className={classNames(classes.marginBottom20, 'no-up-down-arrow')}
                        value={this.state.currentEditingItem.no_of_shipment}
                        type="number"
                        onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'no_of_shipment', 'currentEditingItem')}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl className={classNames(classes.margin, 'normal-field', 'revenue-main')}>
                      <InputLabel htmlFor="adornment-amount"
                                  style={{ zIndex: 0 }}
                      >Revenue Target</InputLabel>
                      <Input
                        id="adornment-amount"
                        startAdornment={<InputAdornment position="start">NRs.</InputAdornment>}
                        className={classNames(classes.marginBottom20, 'no-up-down-arrow')}
                        value={this.state.currentEditingItem.revenue_target}
                        type="number"
                        onChange={(e) => this.handleChangeSimpleFields(e.target.value, 'revenue_target', 'currentEditingItem')}
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container className="main-grid-form">
                  <Grid item xs={12}>
                    <h1>Targeted Volume</h1>
                  </Grid>
                  {['air', 'sea', 'rail', 'road'].map((item, k) => {
                    return (
                      <Grid item xs={6} key={k}>
                        <FormControl
                          className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                          aria-describedby="weight-helper-text"
                        >
                          <FormLabel component="legend" className={classes.title}>
                            {item.charAt(0)
                              .toUpperCase() + item.slice(1)
                              .toLowerCase()}
                          </FormLabel>
                          <InputMaterial
                            id="adornment-weight"
                            value={this.state.currentEditingItem[item + '_target_volume']}
                            onChange={(e) => this.handleChangeSimpleFields(e.target.value, item, 'currentEditingItem')}
                            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                            inputProps={{
                              'aria-label': { item },
                            }}
                          />
                          <FormHelperText id="weight-helper-text"/>
                        </FormControl>
                      </Grid>
                    );
                  })}

                </Grid>

                <FormLabel component="legend" className={classNames(classes.marginTop20)}/>
                <Button
                  color="secondary"
                  className={classes.button}
                  variant="contained"
                  onClick={this.handleSubmitEditQuarterlyPlan}
                >
                  Submit &nbsp;
                  <SendIcon/>
                </Button>
              </Paper>
            </Grid>

          </Grid>

        </Dialog>


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
