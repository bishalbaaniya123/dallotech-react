import React, { Component } from 'react';
import './styles/tableStyle-jss';
import './styles/main.css';
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
import RemoveIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import AlarmIcon from '@material-ui/icons/Alarm';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AirplaneIcon from '@material-ui/icons/AirplanemodeActive';
import RoadIcon from '@material-ui/icons/LocalShipping';
import RailIcon from '@material-ui/icons/Train';
import SeaIcon from '@material-ui/icons/DirectionsBoat';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { Divider } from 'antd';
import { AdvFilter } from '../Tables/demos';
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
import Typography from '@material-ui/core/Typography';

//for dialog
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { HighlightSuggestSales } from '../Forms/demos';
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
//end for dialog

import api from 'dan-api/remote-api/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputMaterial from '@material-ui/core/Input/Input';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Snackbar from '@material-ui/core/Snackbar';
import { Quote } from 'dan-components';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Icon from '@material-ui/core/Icon';
import { formatter, sizeFormatted } from '../../api/extras/formatter';
import { PapperBlock } from 'dan-components';
import red from '@material-ui/core/es/colors/red';
import colorfull from 'dan-api/palette/colorfull';
import Fab from '@material-ui/core/Fab';


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
  paper: {},
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
  close: {
    padding: theme.spacing.unit / 2,
  },
  noUpDownArrow: {
    '&::-webkit-inner-spin-button': {
      '-webkitAppearance': 'none',
    }
  },
  bg: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
    textAlign: 'center',
    borderRadius: theme.rounded.small,
    '& h3': {
      color: theme.palette.secondary.light
    },
  },
  toggleButtonGroupMain: {
    padding: '4px 25px'
  },
  sup: {
    marginTop: '-1.5em'
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
  bigResume: {
    marginBottom: theme.spacing.unit * 5,
    justifyContent: 'space-between',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      height: 160,
      display: 'block',
    },
    '& li': {
      paddingRight: theme.spacing.unit * 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      [theme.breakpoints.down('xs')]: {
        paddingRight: 0,
        paddingBottom: theme.spacing.unit * 2,
        width: '50%',
        float: 'left',
      },
    },
    '& $avatar': {
      [theme.breakpoints.up('sm')]: {
        width: 50,
        height: 50,
        '& svg': {
          fontSize: 32
        }
      }
    },
    '& $leftIcon': {
      [theme.breakpoints.up('sm')]: {
        width: 25,
        height: 25,
        '& svg': {
          fontSize: 16
        }
      }
    }
  },
  allIcons: {
    marginBottom: theme.spacing.unit * 5,
    justifyContent: 'space-between',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      height: 160,
      display: 'block',
    },
    '& li': {
      paddingRight: theme.spacing.unit * 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      [theme.breakpoints.down('xs')]: {
        paddingRight: 0,
        paddingBottom: theme.spacing.unit * 2,
        width: '50%',
        float: 'left',
      },
    },
    '& $avatar': {
      [theme.breakpoints.up('sm')]: {
        width: 25,
        height: 25,
        '& svg': {
          fontSize: 16
        }
      }
    }
  },
  avatar: {
    marginRight: theme.spacing.unit,
    boxShadow: theme.glow.light,
    '& svg': {
      fontSize: 24
    },
    '&$sm': {
      width: 30,
      height: 30
    },
    '&$mc': {
      width: 24,
      height: 24,
      top: 10,
      marginRight: 0
    },
  },
  blueAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: colorfull[2],
  },
  blueText: {
    color: colorfull[2],
    '& svg': {
      fill: colorfull[2],
    }
  },
  tealAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: colorfull[3],
  },
  tealText: {
    color: colorfull[3],
    '& svg': {
      fill: colorfull[3],
    }
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: colorfull[4],
  },
  orangeText: {
    color: colorfull[4],
    '& svg': {
      fill: colorfull[4],
    }
  },
  indigoAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: colorfull[6],
  },
  indigoText: {
    color: colorfull[6],
    '& svg': {
      fill: colorfull[6],
    }
  },
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: colorfull[0],
  },
  pinkText: {
    color: colorfull[0],
    '& svg': {
      fill: colorfull[0],
    }
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: colorfull[1],
  },
  purpleText: {
    color: colorfull[1],
    '& svg': {
      fill: colorfull[1],
    }
  },
  bootstrapRoot: {
    '&:hover': {
      backgroundColor: '#fff',
    },
    color: '#2296f3'
  },
  fabIcons: {
    height: 30,
    minHeight: 30,
    width: 30,
    minWidth: 30,
    marginTop: 5,
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
          name: 'Mode',
          options: {
            filter: true,
            customBodyRender: (value) => {
              if (value === 'AIR') {
                return (<Typography><AirplaneIcon/></Typography>);
              } else if (value === 'SEA') {
                return (<Typography><SeaIcon/></Typography>);
              } else if (value === 'ROAD') {
                return (<Typography><RoadIcon/></Typography>);
              } else if (value === 'RAIL') {
                return (<Typography><RailIcon/></Typography>);
              }
            }/*customBodyRender: (value) => {
              if (value === 'AIR') {
                return (<Chip label="Air" color="primary"/>);
              } else if (value === 'SEA') {
                return (<Chip label="Sea" color="secondary"/>);
              } else if (value === 'INLAND') {
                return (<Chip label="Inland" style={{
                  backgroundColor: '#7971b9',
                  color: '#fff'
                }}/>);
              }
            }*/
          }
        },
        {
          name: 'Shipment Direction',
          options: {
            filter: true,
            customBodyRender: (value) => {
              if (value === 'IMPORT') {
                return (<Typography>Import</Typography>);
              } else if (value === 'EXPORT') {
                return (<Typography>Export</Typography>);
              } else {
                return (<Chip label="Unknown"/>);
              }
            }/*{
              if (value === 'IMPORT') {
                return (<Chip label="Import" color="secondary"/>);
              } else if (value === 'EXPORT') {
                return (<Chip label="Export" color="primary"/>);
              } else {
                return (<Chip label="Unknown"/>);
              }
            }*/
          }
        },
        {
          name: 'Trade Lane',
          options: {
            filter: true,
            customBodyRender: (value) => {
              if (value === 'DOOR_TO_DOOR') {
                return (<Chip label="Door to Door" color="secondary"/>);
              } else if (value === 'DOOR_TO_PORT') {
                return (<Chip label="Door to Port" color="primary"/>);
              } else if (value === 'PORT_TO_DOOR') {
                return (<Chip label="Port to Door" style={{
                  backgroundColor: '#7971b9',
                  color: '#fff'
                }}/>);
              } else {
                return (<Chip label="Port to Port" color="default"/>);
              }
            }
          }
        },
        {
          name: 'Equipment',
          options: {
            filter: true,
          }
        },
        {
          name: 'Packaging',
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
                             onClick={() => this.handleClickOpen(value)}
              >
                <EditIcon style={{
                  fontSize: 15,
                  marginRight: 5
                }}
                />
                Edit
              </Button>;
            }
          }
        }
      ],
      data: [],
      allPendingData: [],

      columnsCompleted: [
        {
          name: 'Mode',
          options: {
            filter: true,
            customBodyRender: (value) => {
              if (value === 'AIR') {
                return (<Typography><AirplaneIcon/></Typography>);
              } else if (value === 'SEA') {
                return (<Typography><SeaIcon/></Typography>);
              } else if (value === 'ROAD') {
                return (<Typography><RoadIcon/></Typography>);
              } else if (value === 'RAIL') {
                return (<Typography><RailIcon/></Typography>);
              }
            }/*customBodyRender: (value) => {
              if (value === 'AIR') {
                return (<Chip label="Air" color="primary"/>);
              } else if (value === 'SEA') {
                return (<Chip label="Sea" color="secondary"/>);
              } else if (value === 'INLAND') {
                return (<Chip label="Inland" style={{
                  backgroundColor: '#7971b9',
                  color: '#fff'
                }}/>);
              }
            }*/
          }
        },
        {
          name: 'Shipment Direction',
          options: {
            filter: true,
            customBodyRender: (value) => {
              if (value === 'IMPORT') {
                return (<Typography>Import</Typography>);
              } else if (value === 'EXPORT') {
                return (<Typography>Export</Typography>);
              } else {
                return (<Chip label="Unknown"/>);
              }
            }/*{
              if (value === 'IMPORT') {
                return (<Chip label="Import" color="secondary"/>);
              } else if (value === 'EXPORT') {
                return (<Chip label="Export" color="primary"/>);
              } else {
                return (<Chip label="Unknown"/>);
              }
            }*/
          }
        },
        {
          name: 'Trade Lane',
          options: {
            filter: true,
            customBodyRender: (value) => {
              if (value === 'DOOR_TO_DOOR') {
                return (<Chip label="Door to Door" color="secondary"/>);
              } else if (value === 'DOOR_TO_PORT') {
                return (<Chip label="Door to Port" color="primary"/>);
              } else if (value === 'PORT_TO_DOOR') {
                return (<Chip label="Port to Door" style={{
                  backgroundColor: '#7971b9',
                  color: '#fff'
                }}/>);
              } else {
                return (<Chip label="Port to Port" color="default"/>);
              }
            }
          }
        },
        {
          name: 'Equipment',
          options: {
            filter: true,
          }
        },
        {
          name: 'Packaging',
          options: {
            filter: true,
          }
        },
        {
          name: 'Rate',
          options: {
            filter: false,
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
                View
              </Button>;
            }
          }
        },
      ],
      dataCompleted: [],
      allCompletedData: [],

      value: 0,
      valueDialog: 1,
      open: false,
      openAdd: true,
      openView: false,
      loadingPending: true,
      loadingCompleted: true,

      currentEditingItem: {
        'sales_query_id': 41,
        'created_on': '2019-05-08T11:26:12.000+0000',
        'customer': {
          'customer_id': 2,
          'customer_name': 'bisahl'
        },
        'transport_city_from': {
          'transport_city_id': 1,
          'city': 'Kathmandu'
        },
        'transport_city_to': {
          'transport_city_id': 2,
          'city': 'Butwal'
        },
        'transport_type': 'AIR',
        'trade_lane': {
          'trade_lane_type': 'PORT_TO_PORT',
          'origin_ware_house': {
            'ware_house_address_id': 1,
            'ware_house_name': 'lalitpur'
          },
          'loading_port': 'india',
          'discharge_port': 'nepal',
          'destination_ware_house': {
            'ware_house_address_id': 2,
            'ware_house_name': 'jamal'
          }
        },
        'business_type': 'EXPORT',
        'weight': 100,
        'packaging_type': 'ROLLS',
        'equipment': {
          'container_size': 'FEET_40_HQ',
          'container_type': 'SPECIAL_CONTAINER',
          'sc_type': 'FLAT_RACK',
          'gauge_type': 'OUT_GAUGE',
          'is_hazardous': false
        },
        'remarks': 'next remarks is in this section ',
        'custom_clearance': true,
        'price': null,
        'free_time': 2,
        'sales_quotation_status': 'PRICE_PENDING'
      },

      currentEditingKey: 0,

      isTransportFeeRequired: false,

      allTransportCities: [],


      openWarningSubmission: false,

      profit: '',
      remarks: '',
      currentSubmission: 'submit',

      revision: '',
      showToast: false,
      toastMessage: '',
    };
  }

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );


    api.getPendingData()
      .then(res => {

        let finalArray = [];

        for (let i = 0; i < res.content.length; i++) {
          let singleObject = res.content[i];
          let singleArray = [];
          let containerSize = singleObject.equipment.container_size;
          if (containerSize === 'FEET_20') {
            containerSize = '20\'';
          } else if (containerSize === 'FEET_40') {
            containerSize = '40\'';
          } else if (containerSize === 'FEET_40_HQ') {
            containerSize = '40\'HQ';
          }

          let packagingFormatted = '';

          if (singleObject.packaging_type) {
            let splitted = singleObject.packaging_type.split('_');
            for (let i = 0; i < splitted.length; i++) {
              packagingFormatted += splitted[i].charAt(0)
                .toUpperCase() + splitted[i].slice(1)
                .toLowerCase() + ' ';
            }
            packagingFormatted = packagingFormatted.slice(0, -1);
          } else {
            packagingFormatted = '-';
          }


          singleArray.push(
            singleObject.transport_type,
            singleObject.business_type,
            singleObject.trade_lane.trade_lane_type,
            containerSize + '/' + formatter(singleObject.equipment.container_type),
            packagingFormatted,
            singleObject.sales_query_id,
          );
          finalArray.push(singleArray);
        }


        this.setState({
          data: finalArray,
          allPendingData: res.content,
          loadingPending: false
        });
      })
      .catch(err => {
        this.setState({
          loadingPending: false
        });
      });

    api.getCompletedData()
      .then(res => {
        let finalArray = [];

        for (let i = 0; i < res.content.length; i++) {
          let singleObject = res.content[i];
          let singleArray = [];
          let containerSize = singleObject.equipment.container_size;
          if (containerSize === 'FEET_20') {
            containerSize = '20\'';
          } else if (containerSize === 'FEET_40') {
            containerSize = '40\'';
          } else if (containerSize === 'FEET_40_HQ') {
            containerSize = '40\'HQ';
          }


          let packagingFormatted = '-';

          if (singleObject.packaging_type) {

            let splitted = singleObject.packaging_type.split('_');
            packagingFormatted = '';

            for (let i = 0; i < splitted.length; i++) {
              packagingFormatted += splitted[i].charAt(0)
                .toUpperCase() + splitted[i].slice(1)
                .toLowerCase() + ' ';
            }
            packagingFormatted = packagingFormatted.slice(0, -1);

          }


          singleArray.push(
            singleObject.transport_type,
            singleObject.business_type,
            singleObject.trade_lane.trade_lane_type,
            containerSize + '/' + singleObject.equipment.container_type.charAt(0)
              .toUpperCase() + singleObject.equipment.container_type.slice(1)
              .toLowerCase(),
            packagingFormatted,
            singleObject.price || 0,
            singleObject.sales_query_id,
          );
          finalArray.push(singleArray);
        }


        this.setState({
          dataCompleted: finalArray,
          allCompletedData: res.content,
          loadingCompleted: false
        });
      })
      .catch(err => {
        this.setState({
          loadingCompleted: false
        });
      });

    api.getSuggestion('transport_cities')
      .then((res) => {
        this.setState({
          allTransportCities: res
        });
      });
  }

  handleClickOpen = (itemIndex) => {
    let { allPendingData } = this.state;
    let currentItem = {};
    let currentKey = '';
    for (let i = 0; i < allPendingData.length; i++) {
      let singleItem = allPendingData[i];
      if (singleItem.sales_query_id === itemIndex) {
        currentItem = singleItem;
        currentKey = i;
        break;
      }
    }

    this.setState({
      currentEditingItem: currentItem,
      currentEditingKey: currentKey
    }, () => {
      this.setState({
        open: true,
        isTransportFeeRequired: currentItem.transport_city_from.transport_city_id !== null
      });
    });
  };

  handleClickOpenView = (itemIndex) => {
    let { allCompletedData } = this.state;
    let currentItem = {};
    let currentKey = '';
    for (let i = 0; i < allCompletedData.length; i++) {
      let singleItem = allCompletedData[i];
      if (singleItem.sales_query_id === itemIndex) {
        currentItem = singleItem;
        currentKey = i;
        break;
      }
    }


    this.setState({
      currentEditingItem: currentItem,
      currentEditingKey: currentKey
    }, () => {
      this.setState({
        openView: true,
        isTransportFeeRequired: currentItem.transport_city_from.transport_city_id !== null
      });
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseView = () => {
    this.setState({
      openView: false,
      profit: '',
      remarks: '',
      currentSubmission: 'submit',
      revision: '',
    });
  };


  handleChangeTabs = (event, value) => {
    this.setState({ value });
  };

  handleChangeDialogTabs = (event, valueDialog) => {
    this.setState({ valueDialog });
  };

  renderFunction = () => {
    return <div>Hello man</div>;
  };

  addTableItem = () => {
    this.props.history.push({
      pathname: '/app/sales/add'
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

  handleChangeSimpleFields = (key, value) => {
    this.setState((prevState) => ({
      ...prevState,
      currentEditingItem: {
        ...prevState.currentEditingItem,
        [key]: value
      }
    }));
  };

  handleChangeNestedFields = (key1, key2, value) => {
    this.setState((prevState) => ({
      ...prevState,
      currentEditingItem: {
        ...prevState.currentEditingItem,
        [key1]: {
          ...prevState.currentEditingItem[key1],
          [key2]: value,
        },
      }
    }));
  };

  handleChangeDoubleNestedFields = (key1, key2, key3, value) => {
    this.setState((prevState) => ({
      ...prevState,
      currentEditingItem: {
        ...prevState.currentEditingItem,
        [key1]: {
          ...prevState.currentEditingItem[key1],
          [key2]: {
            ...prevState.currentEditingItem[key1][key2],
            [key3]: value
          },
        },
      }
    }));
  };

  handleChangeRadioButtons = (key, value) => {
    this.setState((prevState) => ({
      ...prevState,
      currentEditingItem: {
        ...prevState.currentEditingItem,
        equipment: {
          ...prevState.currentEditingItem.equipment,
          [key]: value
        }
      }
    }));
  };

  handleEditSubmit = () => {
    console.clear();
    let initialJson = this.state.currentEditingItem;
    let finalJson = {
      sales_query_id: initialJson.sales_query_id,
      customer_id: initialJson.customer.customer_id,
      transport_type: initialJson.transport_type,
      trade_lane: {
        trade_lane_type: initialJson.trade_lane.trade_lane_type,
        origin_ware_house_id: initialJson.trade_lane.origin_ware_house.ware_house_address_id,
        loading_port: initialJson.trade_lane.loading_port,
        discharge_port: initialJson.trade_lane.discharge_port,
        destination_ware_house_id: initialJson.trade_lane.destination_ware_house.ware_house_address_id,
      },
      transport_city_id: initialJson.transport_city_from.transport_city_id,
      packaging_type: initialJson.packaging_type,
      business_type: initialJson.business_type,
      equipment_detail: {
        container_size: initialJson.equipment.container_size,
        container_type: initialJson.equipment.container_type,
        sc_type: initialJson.equipment.sc_type,
        gauge_type: initialJson.equipment.gauge_type,
        is_hazardous: initialJson.equipment.is_hazardous,
      },
      weight: initialJson.weight,
      free_time: initialJson.free_time,
      remarks: initialJson.remarks,
      custom_clearance: initialJson.custom_clearance
    };

    switch (initialJson.trade_lane.trade_lane_type) {
      case 'DOOR_TO_PORT':
        finalJson.trade_lane.destination_ware_house_id = null;
        break;
      case 'PORT_TO_DOOR':
        finalJson.trade_lane.origin_ware_house_id = null;
        break;
      case 'PORT_TO_PORT':
        finalJson.trade_lane.origin_ware_house_id = null;
        finalJson.trade_lane.destination_ware_house_id = null;
        break;
    }

    let containerSize = initialJson.equipment.container_size;


    if (containerSize === 'FEET_20') {
      containerSize = '20\'';
    } else if (containerSize === 'FEET_40') {
      containerSize = '40\'';
    } else if (containerSize === 'FEET_40_HQ') {
      containerSize = '40\'HQ';
    }

    let packagingFormatted = '';

    if (initialJson.packaging_type) {
      let splitted = initialJson.packaging_type.split('_');
      for (let i = 0; i < splitted.length; i++) {
        packagingFormatted += splitted[i].charAt(0)
          .toUpperCase() + splitted[i].slice(1)
          .toLowerCase() + ' ';
      }
      packagingFormatted = packagingFormatted.slice(0, -1);
    } else {
      packagingFormatted = '-';
    }

    let newData = [
      initialJson.transport_type,
      initialJson.business_type,
      initialJson.trade_lane.trade_lane_type,
      containerSize + '/' + initialJson.equipment.container_type.charAt(0)
        .toUpperCase() + initialJson.equipment.container_type.slice(1)
        .toLowerCase(),
      packagingFormatted,
      initialJson.sales_query_id,
    ];


    api.editSalesQuery(finalJson)
      .then(res => {
        this.setState((prevState) => ({
          ...prevState,
          allPendingData: [
            ...prevState.allPendingData.slice(0, this.state.currentEditingKey),
            initialJson,
            ...prevState.allPendingData.slice(this.state.currentEditingKey + 1)
          ],
          data: [
            ...prevState.data.slice(0, this.state.currentEditingKey),
            newData,
            ...prevState.data.slice(this.state.currentEditingKey + 1)
          ],

        }), () => {
          this.handleClose();
        });
      })
      .catch(err => {
      });

  };

  handleCloseWarningModal = (key, isSubmission) => {
    if (isSubmission) {
      let body;
      if (isSubmission === 'submit') {
        body = {
          sales_query_id: this.state.currentEditingItem.sales_query_id,
          profit: this.state.profit
        };
      } else if (isSubmission === 'revision') {
        body = {
          sales_query_id: this.state.currentEditingItem.sales_query_id,
          revision: this.state.revision
        };
      }
      api.submitProfitOrRevision(body, isSubmission === 'submit' ? 'profit' : 'revision')
        .then(res => {
          if (res.success === true) {
            this.setState({
              showToast: true,
              toastMessage: isSubmission === 'submit' ? 'Profit has been successfully entered' : 'Query sent for revision successfully',
              openView: false,
              [key]: false
            }, () => {
              this.setState((prevState) => ({
                ...prevState,
                dataCompleted: [
                  ...prevState.dataCompleted.slice(0, this.state.currentEditingKey),
                  ...prevState.dataCompleted.slice(this.state.currentEditingKey + 1)
                ]
              }));
            });
          }
        })
        .catch(err => {
          this.setState({
            showToast: true,
            toastMessage: 'Something went wrong. Please try again'
          });
        });
    } else {
      this.setState({
        openWarningSubmission: false
      });
    }
  };

  handleCloseToast = () => {
    this.setState({
      showToast: false
    });
  };

  getRoutingString = () => {
    const { trade_lane } = this.state.currentEditingItem;
    switch (trade_lane.trade_lane_type) {
      case 'DOOR_TO_DOOR':
        return trade_lane.origin_ware_house.ware_house_name
          + ' -> ' + trade_lane.loading_port + ' -> '
          + trade_lane.discharge_port + ' -> '
          + trade_lane.destination_ware_house.ware_house_name;
      case 'DOOR_TO_PORT':
        return trade_lane.origin_ware_house.ware_house_name
          + ' -> ' + trade_lane.loading_port + ' -> '
          + trade_lane.discharge_port;
      case 'PORT_TO_DOOR':
        return trade_lane.loading_port + ' -> '
          + trade_lane.discharge_port + ' -> '
          + trade_lane.destination_ware_house.ware_house_name;
      case 'PORT_TO_PORT':
        return trade_lane.loading_port + ' -> '
          + trade_lane.discharge_port;
      default:
        return 'Unknown';
    }
  };


  render() {
    const { classes } = this.props;

    const { columns, data, columnsCompleted, dataCompleted } = this.state;

    const options = {
      filterType: 'checkbox',
    };

    const { value, valueDialog, loadingPending, loadingCompleted } = this.state;

    const tradeLaneType = this.state.currentEditingItem.trade_lane.trade_lane_type;

    return (
      <div>
        <div>
          <div className={classes.rootTable}>
            <Tooltip title="Add New Sales Entry">

              <Button variant="contained"
                      onClick={() => {
                        this.setState({ openAdd: true });
                      }}
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

            <div style={{ flexGrow: 1 }}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={this.handleChangeTabs}
                  scrollButtons="on"
                  indicatorColor="primary"
                  textColor="secondary"
                  variant="fullWidth"
                >
                  <Tab label="Pending" icon={<AlarmIcon/>}/>
                  <Tab label="Price entered" icon={<CheckCircleIcon/>}/>
                </Tabs>
              </AppBar>
            </div>
            {value === 0 &&
            <div className={classes.table}>
              {loadingPending &&
              <Grid
                container
                alignItems="flex-start"
                justify="space-around"
                direction="row"
                spacing={24}
                style={{
                  textAlign: 'center',
                  marginTop: '50px',
                  overflow: 'hidden',
                  minHeight: '250px',
                }}
              >
                <CircularProgress
                  className={classes.progress}
                  color="secondary"
                  style={{ marginTop: '75px' }}
                />
              </Grid>
              }
              {!loadingPending &&
              data.length !== 0 ?
                <MUIDataTable
                  title={'Pending Sales Queries'}
                  data={data}
                  columns={columns}
                  options={options}
                />
                :
                <Grid
                  container
                  alignItems="flex-start"
                  justify="space-around"
                  direction="row"
                  spacing={24}
                  style={{
                    textAlign: 'center',
                    marginTop: '50px',
                    overflow: 'hidden',
                    minHeight: '250px',
                  }}
                >
                  <div className={classes.bg}>
                    <Typography variant="h6" component="h3">
                      No Data Found!
                    </Typography>
                  </div>
                </Grid>
              }
            </div>
            }
            {value === 1 &&
            <div className={classes.table}>
              {loadingCompleted &&
              <Grid
                container
                alignItems="flex-start"
                justify="space-around"
                direction="row"
                spacing={24}
                style={{
                  textAlign: 'center',
                  marginTop: '50px',
                  overflow: 'hidden',
                  minHeight: '250px',
                }}
              >
                <CircularProgress
                  className={classes.progress}
                  color="secondary"
                  style={{ marginTop: '75px' }}
                />
              </Grid>
              }
              {!loadingCompleted &&
              dataCompleted.length !== 0 ?
                <MUIDataTable
                  title={'Completed Items'}
                  data={dataCompleted}
                  columns={columnsCompleted}
                  options={options}
                />
                :
                <Grid
                  container
                  alignItems="flex-start"
                  justify="space-around"
                  direction="row"
                  spacing={24}
                  style={{
                    textAlign: 'center',
                    marginTop: '50px',
                    overflow: 'hidden',
                    minHeight: '250px',
                  }}
                >
                  <div className={classes.bg}>
                    <Typography variant="h6" component="h3">
                      No Data Found!
                    </Typography>
                  </div>
                </Grid>
              }
            </div>
            }
          </div>
        </div>

        <Dialog
          fullScreen
          open={this.state.openAdd}
          onClose={() => {
            this.setState({ openAdd: false });
          }}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar style={{ minHeight: 50 }}>
              <Typography variant="caption" color="inherit" className={classes.flex}>
                Add Sales Query
              </Typography>
              <IconButton color="inherit" aria-label="Close" onClick={() => {
                this.setState({ openAdd: false });
              }}>
                <CloseIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>

          <AppBar position="static" color="default">
            <Tabs
              value={valueDialog}
              onChange={this.handleChangeDialogTabs}
              scrollButtons="on"
              indicatorColor="primary"
              textColor="secondary"
              variant="fullWidth"
            >
              <Tab icon={<SeaIcon/>}/>
              <Tab icon={<AirplaneIcon/>}/>
              <Tab icon={<RoadIcon/>}/>
            </Tabs>
          </AppBar>
          {valueDialog === 0 &&
          <Grid container spacing={24} style={{
            padding: 20,
            overflowX: 'hidden'
          }}>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                <Grid item xs={4}>
                  <TextSuggestion
                    placeholder="Enter Customer Name"
                    identifier="customer_id"
                    suggestionUrl="customers"
                    value={this.state.currentEditingItem.customer.customer_name}
                    setNewId={this.handleChangeNestedFields}
                    topLabel="Customer Name"
                    style={{ marginTop: -20 }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <FormControl className={classes.formControl} fullWidth style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>
                    <InputLabel htmlFor="free_time">Direction</InputLabel>
                    <SelectMaterial
                      name="free_time"
                      value={this.state.currentEditingItem.free_time}
                      onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                      inputProps={{
                        name: 'free_time',
                        id: 'free_time',
                      }}
                    >
                      <MenuItem value="1">Import</MenuItem>
                      <MenuItem value="2">Export</MenuItem>
                    </SelectMaterial>
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <FormControl className={classes.formControl} fullWidth style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>
                    <InputLabel htmlFor="free_time">Incoterm</InputLabel>
                    <SelectMaterial
                      name="free_time"
                      value={this.state.currentEditingItem.free_time}
                      onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                      inputProps={{
                        name: 'free_time',
                        id: 'free_time',
                      }}
                    >
                      <MenuItem value="1">EXW</MenuItem>
                      <MenuItem value="2">DIR</MenuItem>
                    </SelectMaterial>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>

                    <InputLabel htmlFor="free_time">Weight</InputLabel>


                    <InputMaterial
                      id="adornment-weight"
                      value={this.state.currentEditingItem.weight}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      endAdornment={<InputAdornment position="end">Ton</InputAdornment>}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>

                    <InputLabel htmlFor="free_time">Volume</InputLabel>


                    <InputMaterial
                      id="adornment-weight"
                      value={this.state.currentEditingItem.weight}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      endAdornment={<InputAdornment position="end">CBM</InputAdornment>}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>

                    <InputLabel htmlFor="free_time">No. of boxes</InputLabel>


                    <InputMaterial
                      id="adornment-weight"
                      value={this.state.currentEditingItem.weight}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={24} style={{
              marginTop: -45,
              marginBottom: -25
            }}>
              <Grid item xs={12} style={{
                textAlign: 'center',
                paddingTop: 0
              }}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <RadioGroup
                    aria-label="Direction"
                    name="direction"
                    className={classes.radioGroup}
                    value={this.state.currentEditingItem.trade_lane.trade_lane_type}
                    onChange={(e) => this.handleChangeNestedFields('trade_lane', 'trade_lane_type', e.target.value)}
                    row
                  >
                    <FormControlLabel value="DOOR_TO_DOOR" control={<Radio/>} label="Door to Door"/>
                    <FormControlLabel value="DOOR_TO_PORT" control={<Radio/>} label="Door to Port"/>
                    <FormControlLabel value="PORT_TO_DOOR" control={<Radio/>} label="Port to Door"/>
                    <FormControlLabel value="PORT_TO_PORT" control={<Radio/>} label="Port to Port"/>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={24}>
                <Grid item xs={2}>
                  <TextSuggestion
                    placeholder="Enter POL Country"
                    identifier="customer_id"
                    suggestionUrl="customers"
                    value={'China'}
                    setNewId={this.handleChangeNestedFields}
                    topLabel="POL Country"
                    style={{ marginTop: -20 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>

                    <InputLabel htmlFor="free_time">POL Port</InputLabel>


                    <InputMaterial
                      id="adornment-weight"
                      value={'Beijing Port'}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <TextSuggestion
                    placeholder="Enter POD Country"
                    identifier="customer_id"
                    suggestionUrl="customers"
                    value={'India'}
                    setNewId={this.handleChangeNestedFields}
                    topLabel="POD Country"
                    style={{ marginTop: -20 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>

                    <InputLabel htmlFor="free_time">POD Port</InputLabel>


                    <InputMaterial
                      id="adornment-weight"
                      value={'Kolkata Port'}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>

                    <InputLabel htmlFor="free_time">Pickup Location</InputLabel>


                    <InputMaterial
                      id="adornment-weight"
                      value={'Kolkata City'}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>

                    <InputLabel htmlFor="free_time">Delivery Location</InputLabel>


                    <InputMaterial
                      id="adornment-weight"
                      value={'Patna City'}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>


            <Grid item xs={12}>
              <Grid container spacing={24}>

                <Grid item xs={6}>
                  <Grid container spacing={24}>

                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} fullWidth style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>
                        <InputLabel htmlFor="free_time">Size</InputLabel>
                        <SelectMaterial
                          name="free_time"
                          value={this.state.currentEditingItem.free_time}
                          onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                          inputProps={{
                            name: 'free_time',
                            id: 'free_time',
                          }}
                        >
                          <MenuItem value="1">20'</MenuItem>
                          <MenuItem value="1">40'</MenuItem>
                          <MenuItem value="2">40'HQ</MenuItem>
                        </SelectMaterial>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>

                        <InputLabel htmlFor="free_time">No of equipments</InputLabel>

                        <InputMaterial
                          id="adornment-weight"
                          value={this.state.currentEditingItem.weight}
                          onChange={(e) => {
                            let value = e.target.value;
                            this.handleChangeSimpleFields('weight', value);
                          }}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                        />
                        <FormHelperText id="weight-helper-text"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} fullWidth style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>
                        <InputLabel htmlFor="free_time">Type</InputLabel>
                        <SelectMaterial
                          name="free_time"
                          value={this.state.currentEditingItem.free_time}
                          onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                          inputProps={{
                            name: 'free_time',
                            id: 'free_time',
                          }}
                        >
                          <MenuItem value="1">Type1</MenuItem>
                          <MenuItem value="1">Type1</MenuItem>
                          <MenuItem value="2">Type1</MenuItem>
                        </SelectMaterial>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>

                        <InputLabel htmlFor="free_time">Quote</InputLabel>


                        <InputMaterial
                          id="adornment-weight"
                          value={this.state.currentEditingItem.weight}
                          onChange={(e) => {
                            let value = e.target.value;
                            this.handleChangeSimpleFields('weight', value);
                          }}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                        />
                        <FormHelperText id="weight-helper-text"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} fullWidth style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>
                        <InputLabel htmlFor="free_time">Currency</InputLabel>
                        <SelectMaterial
                          name="free_time"
                          value={this.state.currentEditingItem.free_time}
                          onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                          inputProps={{
                            name: 'free_time',
                            id: 'free_time',
                          }}
                        >
                          <MenuItem value="1">$</MenuItem>
                          <MenuItem value="1">€</MenuItem>
                          <MenuItem value="2">INR</MenuItem>
                          <MenuItem value="2">NRS</MenuItem>
                        </SelectMaterial>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>

                  </Grid>
                  <Grid container spacing={24}>

                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} fullWidth style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>
                        <InputLabel htmlFor="free_time">Size</InputLabel>
                        <SelectMaterial
                          name="free_time"
                          value={this.state.currentEditingItem.free_time}
                          onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                          inputProps={{
                            name: 'free_time',
                            id: 'free_time',
                          }}
                        >
                          <MenuItem value="1">20'</MenuItem>
                          <MenuItem value="1">40'</MenuItem>
                          <MenuItem value="2">40'HQ</MenuItem>
                        </SelectMaterial>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>

                        <InputLabel htmlFor="free_time">No of equipments</InputLabel>

                        <InputMaterial
                          id="adornment-weight"
                          value={this.state.currentEditingItem.weight}
                          onChange={(e) => {
                            let value = e.target.value;
                            this.handleChangeSimpleFields('weight', value);
                          }}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                        />
                        <FormHelperText id="weight-helper-text"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} fullWidth style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>
                        <InputLabel htmlFor="free_time">Type</InputLabel>
                        <SelectMaterial
                          name="free_time"
                          value={this.state.currentEditingItem.free_time}
                          onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                          inputProps={{
                            name: 'free_time',
                            id: 'free_time',
                          }}
                        >
                          <MenuItem value="1">Type1</MenuItem>
                          <MenuItem value="1">Type1</MenuItem>
                          <MenuItem value="2">Type1</MenuItem>
                        </SelectMaterial>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>

                        <InputLabel htmlFor="free_time">Quote</InputLabel>


                        <InputMaterial
                          id="adornment-weight"
                          value={this.state.currentEditingItem.weight}
                          onChange={(e) => {
                            let value = e.target.value;
                            this.handleChangeSimpleFields('weight', value);
                          }}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                        />
                        <FormHelperText id="weight-helper-text"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} fullWidth style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>
                        <InputLabel htmlFor="free_time">Currency</InputLabel>
                        <SelectMaterial
                          name="free_time"
                          value={this.state.currentEditingItem.free_time}
                          onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                          inputProps={{
                            name: 'free_time',
                            id: 'free_time',
                          }}
                        >
                          <MenuItem value="1">$</MenuItem>
                          <MenuItem value="1">€</MenuItem>
                          <MenuItem value="2">INR</MenuItem>
                          <MenuItem value="2">NRS</MenuItem>
                        </SelectMaterial>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <Fab aria-label="Add" className={classNames(classes.fab, classes.fabIcons)} size="small">
                        <RemoveIcon style={{ color: '#222' }}/>
                      </Fab>
                    </Grid>

                    <Grid item xs={10}>
                      <Button size="small" className={classes.margin} variant="contained" color="secondary" style={{
                        float: 'right',
                        marginTop: -30
                      }}>
                        <AddIcon/>
                        Add
                      </Button>
                    </Grid>

                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Grid container spacing={24}>
                    <Grid container spacing={24}>
                      <Grid item xs={4}>
                        <FormControl className={classes.formControl} fullWidth style={{
                          minWidth: 'unset',
                          marginTop: -20,
                          marginLeft: 0
                        }}>
                          <InputLabel htmlFor="free_time">Commodity Type</InputLabel>
                          <SelectMaterial
                            name="free_time"
                            value={this.state.currentEditingItem.free_time}
                            onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                            inputProps={{
                              name: 'free_time',
                              id: 'free_time',
                            }}
                          >
                            <MenuItem value="1">General</MenuItem>
                            <MenuItem value="1">Hazardous</MenuItem>
                            <MenuItem value="2">General</MenuItem>
                          </SelectMaterial>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl className={classes.formControl} fullWidth style={{
                          minWidth: 'unset',
                          marginTop: -20,
                          marginLeft: 0
                        }}>
                          <InputLabel htmlFor="free_time">Commodity Sub-type</InputLabel>
                          <SelectMaterial
                            name="free_time"
                            value={this.state.currentEditingItem.free_time}
                            onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                            inputProps={{
                              name: 'free_time',
                              id: 'free_time',
                            }}
                          >
                            <MenuItem value="1">Electrical</MenuItem>
                            <MenuItem value="1">40'</MenuItem>
                            <MenuItem value="2">Electrical</MenuItem>
                          </SelectMaterial>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl className={classes.formControl} style={{
                          minWidth: 'unset',
                          marginTop: -20,
                          marginLeft: 0
                        }}>

                          <InputLabel htmlFor="free_time">Commodity</InputLabel>

                          <InputMaterial
                            id="adornment-weight"
                            value={'Laptop'}
                            onChange={(e) => {
                              let value = e.target.value;
                              this.handleChangeSimpleFields('weight', value);
                            }}
                            inputProps={{
                              'aria-label': 'Weight',
                            }}
                          />
                          <FormHelperText id="weight-helper-text"/>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-full-width"
                          label="Other Specifications"
                          style={{
                            width: '100%'
                          }}
                          multiline
                          rows="2"
                          placeholder="Enter other specifications"
                          margin="normal"
                          variant="outlined"
                          value={this.state.currentEditingItem.remarks}
                          onChange={(e) => {
                            this.handleChangeSimpleFields('remarks', e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-full-width"
                          label="Remarks"
                          style={{
                            width: '100%'
                          }}
                          multiline
                          rows="2"
                          placeholder="Enter any remarks"
                          margin="normal"
                          variant="outlined"
                          value={this.state.currentEditingItem.remarks}
                          onChange={(e) => {
                            this.handleChangeSimpleFields('remarks', e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>


            <Grid item xs={12}>
              <Button color="secondary"
                      variant="contained"
                      onClick={this.handleEditSubmit}
                      style={{ float: 'right' }}
              >Submit</Button>
            </Grid>


          </Grid>
          }
          {valueDialog === 1 &&
          <Grid container spacing={24} style={{
            padding: 20,
            overflowX: 'hidden'
          }}>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                <Grid item xs={2}>
                  <TextSuggestion
                    placeholder="Enter Customer Name"
                    identifier="customer_id"
                    suggestionUrl="customers"
                    value={this.state.currentEditingItem.customer.customer_name}
                    setNewId={this.handleChangeNestedFields}
                    topLabel="Customer Name"
                    style={{ marginTop: -20 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} fullWidth style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>
                    <InputLabel htmlFor="free_time">Direction</InputLabel>
                    <SelectMaterial
                      name="free_time"
                      value={this.state.currentEditingItem.free_time}
                      onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                      inputProps={{
                        name: 'free_time',
                        id: 'free_time',
                      }}
                    >
                      <MenuItem value="1">Import</MenuItem>
                      <MenuItem value="2">Export</MenuItem>
                    </SelectMaterial>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} fullWidth style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>
                    <InputLabel htmlFor="free_time">Incoterm</InputLabel>
                    <SelectMaterial
                      name="free_time"
                      value={this.state.currentEditingItem.free_time}
                      onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                      inputProps={{
                        name: 'free_time',
                        id: 'free_time',
                      }}
                    >
                      <MenuItem value="1">EXW</MenuItem>
                      <MenuItem value="2">DIR</MenuItem>
                    </SelectMaterial>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl component="fieldset" className={classes.formControl} style={{ marginTop: -5 }}>
                    <FormLabel component="legend">Trade Lanes</FormLabel>
                    <RadioGroup
                      aria-label="Direction"
                      name="direction"
                      className={classes.radioGroup}
                      value={this.state.currentEditingItem.trade_lane.trade_lane_type}
                      onChange={(e) => this.handleChangeNestedFields('trade_lane', 'trade_lane_type', e.target.value)}
                      row
                      style={{ marginTop: -10 }}
                    >
                      <FormControlLabel value="DOOR_TO_DOOR" control={<Radio/>} label="Door to Door"/>
                      <FormControlLabel value="DOOR_TO_PORT" control={<Radio/>} label="Door to Port"/>
                      <FormControlLabel value="PORT_TO_DOOR" control={<Radio/>} label="Port to Door"/>
                      <FormControlLabel value="PORT_TO_PORT" control={<Radio/>} label="Port to Port"/>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>


            <Grid item xs={12}>
              <Grid container spacing={24}>
                <Grid item xs={2}>
                  <TextSuggestion
                    placeholder="Enter POL Country"
                    identifier="customer_id"
                    suggestionUrl="customers"
                    value={'China'}
                    setNewId={this.handleChangeNestedFields}
                    topLabel="POL Country"
                    style={{ marginTop: -20 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>

                    <InputLabel htmlFor="free_time">POL Port</InputLabel>


                    <InputMaterial
                      id="adornment-weight"
                      value={'Beijing Port'}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <TextSuggestion
                    placeholder="Enter POD Country"
                    identifier="customer_id"
                    suggestionUrl="customers"
                    value={'India'}
                    setNewId={this.handleChangeNestedFields}
                    topLabel="POD Country"
                    style={{ marginTop: -20 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>

                    <InputLabel htmlFor="free_time">POD Port</InputLabel>


                    <InputMaterial
                      id="adornment-weight"
                      value={'Kolkata Port'}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>

                    <InputLabel htmlFor="free_time">Pickup Location</InputLabel>


                    <InputMaterial
                      id="adornment-weight"
                      value={'Kolkata City'}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginTop: -20,
                    marginLeft: 0
                  }}>

                    <InputLabel htmlFor="free_time">Delivery Location</InputLabel>


                    <InputMaterial
                      id="adornment-weight"
                      value={'Patna City'}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Grid container spacing={24}>

                    <Grid item xs={3}>
                      <FormControl className={classes.formControl} style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>

                        <InputLabel htmlFor="free_time">Weight</InputLabel>


                        <InputMaterial
                          id="adornment-weight"
                          value={this.state.currentEditingItem.weight}
                          onChange={(e) => {
                            let value = e.target.value;
                            this.handleChangeSimpleFields('weight', value);
                          }}
                          endAdornment={<InputAdornment position="end">Ton</InputAdornment>}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                        />
                        <FormHelperText id="weight-helper-text"/>
                      </FormControl>
                    </Grid>

                    <Grid item xs={1} style={{
                      padding: 0,
                      marginTop: 12
                    }}>
                      <FormControl className={classes.formControl} style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>

                        <InputLabel htmlFor="free_time">Length</InputLabel>

                        <InputMaterial
                          id="adornment-weight"
                          value={this.state.currentEditingItem.weight}
                          onChange={(e) => {
                            let value = e.target.value;
                            this.handleChangeSimpleFields('weight', value);
                          }}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                          className={'only-bottom-border'}
                        />
                        <FormHelperText id="weight-helper-text"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={1} className={'class-x'} style={{
                      padding: 0,
                      paddingLeft: 16
                    }}>
                      X
                    </Grid>

                    <Grid item xs={1} style={{
                      padding: 0,
                      marginTop: 12
                    }}>
                      <FormControl className={classes.formControl} style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>

                        <InputLabel htmlFor="free_time">Breadth</InputLabel>

                        <InputMaterial
                          id="adornment-weight"
                          value={this.state.currentEditingItem.weight}
                          onChange={(e) => {
                            let value = e.target.value;
                            this.handleChangeSimpleFields('weight', value);
                          }}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                          className={'only-bottom-border'}
                        />
                        <FormHelperText id="weight-helper-text"/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={1} className={'class-x'} style={{
                      padding: 0,
                      paddingLeft: 16
                    }}>
                      X
                    </Grid>
                    <Grid item xs={1} style={{
                      padding: 0,
                      marginTop: 12
                    }}>
                      <FormControl className={classes.formControl} style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>

                        <InputLabel htmlFor="free_time">Height</InputLabel>

                        <InputMaterial
                          id="adornment-weight"
                          value={this.state.currentEditingItem.weight}
                          onChange={(e) => {
                            let value = e.target.value;
                            this.handleChangeSimpleFields('weight', value);
                          }}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                          className={'only-bottom-border'}
                        />
                        <FormHelperText id="weight-helper-text"/>
                      </FormControl>
                    </Grid>


                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>

                        <InputLabel htmlFor="free_time">No. of boxes</InputLabel>

                        <InputMaterial
                          id="adornment-weight"
                          value={this.state.currentEditingItem.weight}
                          onChange={(e) => {
                            let value = e.target.value;
                            this.handleChangeSimpleFields('weight', value);
                          }}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                          disableUnderline={true}
                        />
                        <FormHelperText id="weight-helper-text"/>
                      </FormControl>
                    </Grid>

                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>

                        <InputLabel htmlFor="free_time">Total No. of boxes</InputLabel>

                        <InputMaterial
                          id="adornment-weight"
                          value={this.state.currentEditingItem.weight}
                          onChange={(e) => {
                            let value = e.target.value;
                            this.handleChangeSimpleFields('weight', value);
                          }}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                        />
                        <FormHelperText id="weight-helper-text"/>
                      </FormControl>
                    </Grid>

                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={24}>
                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} fullWidth style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>
                        <InputLabel htmlFor="free_time">Commodity Type</InputLabel>
                        <SelectMaterial
                          name="free_time"
                          value={this.state.currentEditingItem.free_time}
                          onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                          inputProps={{
                            name: 'free_time',
                            id: 'free_time',
                          }}
                        >
                          <MenuItem value="1">General</MenuItem>
                          <MenuItem value="1">Hazardous</MenuItem>
                          <MenuItem value="2">General</MenuItem>
                        </SelectMaterial>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl component="fieldset" style={{ marginTop: -12 }}>
                        <FormGroup aria-label="position" name="position" row>
                          <FormControlLabel
                            value="top"
                            control={<Switch color="primary"/>}
                            label="Stackable"
                            labelPlacement="top"
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} fullWidth style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>
                        <InputLabel htmlFor="free_time">Commodity Sub-type</InputLabel>
                        <SelectMaterial
                          name="free_time"
                          value={this.state.currentEditingItem.free_time}
                          onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                          inputProps={{
                            name: 'free_time',
                            id: 'free_time',
                          }}
                        >
                          <MenuItem value="1">Electrical</MenuItem>
                          <MenuItem value="1">40'</MenuItem>
                          <MenuItem value="2">Electrical</MenuItem>
                        </SelectMaterial>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                      <FormControl component="fieldset" style={{ marginTop: -12 }}>
                        <FormGroup aria-label="position" name="position" row>
                          <FormControlLabel
                            value="top"
                            control={<Switch color="primary"/>}
                            label="Battery"
                            labelPlacement="top"
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={2}>
                      <FormControl className={classes.formControl} style={{
                        minWidth: 'unset',
                        marginTop: -20,
                        marginLeft: 0
                      }}>

                        <InputLabel htmlFor="free_time">Commodity</InputLabel>

                        <InputMaterial
                          id="adornment-weight"
                          value={'Laptop'}
                          onChange={(e) => {
                            let value = e.target.value;
                            this.handleChangeSimpleFields('weight', value);
                          }}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                        />
                        <FormHelperText id="weight-helper-text"/>
                      </FormControl>
                    </Grid>

                    <Grid item xs={2}>
                      <FormControl component="fieldset" style={{ marginTop: -12 }}>
                        <FormGroup aria-label="position" name="position" row>
                          <FormControlLabel
                            value="top"
                            control={<Switch color="primary"/>}
                            label="Electric"
                            labelPlacement="top"
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>


            <Grid container spacing={24}>
              <Grid item xs={12} style={{marginLeft: 20, padding: 0}}>
                No. of Slab Rates
              </Grid>
            </Grid>


            <Grid item xs={12}>
              <Grid container spacing={24}>

                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginLeft: 0
                  }}>

                    <InputMaterial
                      id="adornment-weight"
                      value={this.state.currentEditingItem.weight}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                      endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                      startAdornment={<InputAdornment position="end" style={{ marginTop: 25 }}>+</InputAdornment>}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginLeft: 0
                  }}>

                    <InputMaterial
                      id="adornment-weight"
                      value={this.state.currentEditingItem.weight}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                      endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                      startAdornment={<InputAdornment position="end" style={{ marginTop: 25 }}>+</InputAdornment>}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginLeft: 0
                  }}>

                    <InputMaterial
                      id="adornment-weight"
                      value={this.state.currentEditingItem.weight}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                      endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                      startAdornment={<InputAdornment position="end" style={{ marginTop: 25 }}>+</InputAdornment>}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginLeft: 0
                  }}>

                    <InputMaterial
                      id="adornment-weight"
                      value={this.state.currentEditingItem.weight}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                      endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                      startAdornment={<InputAdornment position="end" style={{ marginTop: 25 }}>+</InputAdornment>}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginLeft: 0
                  }}>

                    <InputMaterial
                      id="adornment-weight"
                      value={this.state.currentEditingItem.weight}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                      endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                      startAdornment={<InputAdornment position="end" style={{ marginTop: 25 }}>+</InputAdornment>}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl className={classes.formControl} style={{
                    minWidth: 'unset',
                    marginLeft: 0
                  }}>

                    <InputMaterial
                      id="adornment-weight"
                      value={this.state.currentEditingItem.weight}
                      onChange={(e) => {
                        let value = e.target.value;
                        this.handleChangeSimpleFields('weight', value);
                      }}
                      inputProps={{
                        'aria-label': 'Weight',
                      }}
                      endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                      startAdornment={<InputAdornment position="end" style={{ marginTop: 25 }}>+</InputAdornment>}
                    />
                    <FormHelperText id="weight-helper-text"/>
                  </FormControl>
                </Grid>

              </Grid>
            </Grid>

            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-full-width"
                  label="Remarks"
                  style={{
                    width: '97%',
                    marginLeft: 15
                  }}
                  multiline
                  rows="2"
                  placeholder="Enter any remarks"
                  margin="normal"
                  variant="outlined"
                  value={this.state.currentEditingItem.remarks}
                  onChange={(e) => {
                    this.handleChangeSimpleFields('remarks', e.target.value);
                  }}
                />
              </Grid>
            </Grid>



            <Grid item xs={12}>
              <Button color="secondary"
                      variant="contained"
                      onClick={this.handleEditSubmit}
                      style={{ float: 'right' }}
              >Submit</Button>
            </Grid>


          </Grid>
          }
          {valueDialog === 2 &&
          <div>
            Inland
          </div>
          }

          {/*<Grid container justify="center" className={classes.root} spacing={16}>
            <Grid item xs={8}>
              <TextSuggestion
                placeholder="Enter Customer Name"
                identifier="customer_id"
                suggestionUrl="customers"
                value={this.state.currentEditingItem.customer.customer_name}
                setNewId={this.handleChangeNestedFields}
              />
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classNames(classes.paper, classes.singleItem)}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Mode of Transport</FormLabel>

                      <RadioGroup
                        aria-label="Transport type"
                        name="transport_type"
                        className={classes.group}
                        value={this.state.currentEditingItem.transport_type}
                        onChange={(e) =>
                          this.handleChangeSimpleFields(e.target.name, e.target.value)
                        }
                        row
                      >
                        <FormControlLabel value="AIR" control={<Radio/>} label={<AirplaneIcon/>}/>
                        <FormControlLabel value="SEA" control={<Radio/>} label={<SeaIcon/>}/>
                        <FormControlLabel value="RAIL" control={<Radio/>} label={<RailIcon/>}/>
                        <FormControlLabel value="ROAD" control={<Radio/>} label={<RoadIcon/>}/>
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classNames(classes.paper, classes.singleItem)}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Import/Export</FormLabel>
                      <RadioGroup
                        aria-label="Import/Export"
                        name="business_type"
                        className={classes.group}
                        value={this.state.currentEditingItem.business_type}
                        onChange={(e) =>
                          this.handleChangeSimpleFields(e.target.name, e.target.value)
                        }
                        row
                      >
                        <FormControlLabel value="IMPORT" control={<Radio/>} label="Import"/>
                        <FormControlLabel value="EXPORT" control={<Radio/>} label="Export"/>
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classNames(classes.paper, classes.singleItem)}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Routing Details</FormLabel>

                      <RadioGroup
                        aria-label="Direction"
                        name="direction"
                        className={classes.radioGroup}
                        value={this.state.currentEditingItem.trade_lane.trade_lane_type}
                        onChange={(e) => this.handleChangeNestedFields('trade_lane', 'trade_lane_type', e.target.value)}
                        row
                      >
                        <FormControlLabel value="DOOR_TO_DOOR" control={<Radio/>} label="Door to Door"/>
                        <FormControlLabel value="DOOR_TO_PORT" control={<Radio/>} label="Door to Port"/>
                        <FormControlLabel value="PORT_TO_DOOR" control={<Radio/>} label="Port to Door"/>
                        <FormControlLabel value="PORT_TO_PORT" control={<Radio/>} label="Port to Port"/>
                      </RadioGroup>

                      {
                        tradeLaneType === 'DOOR_TO_DOOR' || tradeLaneType === 'DOOR_TO_PORT' ?
                          <div>
                            <FormLabel component="legend" className={classes.marginTop20}>Origin Warehouse</FormLabel>
                            <TextSuggestion
                              placeholder="Enter Origin Warehouse"
                              identifier="ware_house_address_id"
                              section="origin_warehouse"
                              suggestionUrl="ware_houses"
                              value={this.state.currentEditingItem.trade_lane.origin_ware_house.ware_house_name}
                              setNewId={this.handleChangeDoubleNestedFields}
                            />
                          </div>
                          :
                          null
                      }
                      <FormLabel component="legend" className={classes.marginTop20}>Loading Port</FormLabel>
                      <TextSuggestion
                        placeholder="Enter Loading Port"
                        identifier="loading_port"
                        value={this.state.currentEditingItem.trade_lane.loading_port}
                        setNewId={this.handleChangeNestedFields}
                      />

                      <FormLabel component="legend" className={classes.marginTop20}>Destination Port</FormLabel>
                      <TextSuggestion
                        placeholder="Enter Discharge Port"
                        identifier="discharge_port"
                        value={this.state.currentEditingItem.trade_lane.discharge_port}
                        setNewId={this.handleChangeNestedFields}
                      />
                      {
                        tradeLaneType === 'DOOR_TO_DOOR' || tradeLaneType === 'PORT_TO_DOOR' ?
                          <div>
                            <FormLabel component="legend" className={classes.marginTop20}>Destination
                              Warehouse</FormLabel>
                            <TextSuggestion
                              placeholder="Enter Destination Warehouse"
                              identifier="ware_house_address_id"
                              value={this.state.currentEditingItem.trade_lane.destination_ware_house.ware_house_name}
                              section="destination_warehouse"
                              suggestionUrl="ware_houses"
                              setNewId={this.handleChangeDoubleNestedFields}
                            />
                          </div>
                          :
                          null
                      }
                      <FormLabel component="legend" className={classes.marginBottom20}/>

                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classNames(classes.paper, classes.singleItem)}>
                    <Grid item xs={12}>
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Custom Clearance</FormLabel>
                        <RadioGroup
                          aria-label="Custom Clearance"
                          name="custom_clearance"
                          className={classes.group}
                          value={this.state.currentEditingItem.custom_clearance ? 'YES' : 'NO'}
                          onChange={(e) =>
                            this.handleChangeSimpleFields(e.target.name, e.target.value === 'YES')
                          }
                          row
                        >
                          <FormControlLabel value="YES" control={<Radio/>} label="Yes"/>
                          <FormControlLabel value="NO" control={<Radio/>} label="No"/>
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Transport Fees</FormLabel>
                        <RadioGroup
                          aria-label="Transport Fees"
                          name="city"
                          className={classes.group}
                          value={this.state.isTransportFeeRequired ? 'YES' : 'NO'}
                          onChange={(e) => {
                            let value = e.target.value;
                            this.setState({
                              isTransportFeeRequired: value === 'YES'
                            }, () => {
                              if (value === 'NO') {
                                this.handleChangeNestedFields('transport_city_from', 'transport_city_id', null);
                              } else {
                                this.handleChangeNestedFields('transport_city_from', 'transport_city_id', this.state.allTransportCities[0].id || 0);
                              }
                            });
                          }}
                          row
                        >
                          <FormControlLabel value="YES" control={<Radio/>} label="Yes"/>
                          <FormControlLabel value="NO" control={<Radio/>} label="No"/>
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    {this.state.isTransportFeeRequired ?
                      <Grid item>
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="transport_city_id">From</InputLabel>
                          <SelectMaterial
                            name="transport_city_id"
                            value={this.state.currentEditingItem.transport_city_from.transport_city_id || null}
                            onChange={(e) => this.handleChangeNestedFields('transport_city_from', 'transport_city_id', e.target.value)}
                            inputProps={{
                              name: 'transport_city_id',
                              id: 'transport_city_id',
                            }}
                          >
                            {this.state.allTransportCities.map((obj, k) => {
                              return (
                                <MenuItem key={k} value={obj.id}>{obj.name}</MenuItem>
                              );
                            })}
                          </SelectMaterial>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="transport_city_id_to">To</InputLabel>
                          <SelectMaterial
                            name="transport_city_id_to"
                            value={this.state.currentEditingItem.transport_city_to.transport_city_id || null}
                            onChange={(e) => this.handleChangeNestedFields('transport_city_to', 'transport_city_id', e.target.value)}
                            inputProps={{
                              name: 'transport_city_id',
                              id: 'transport_city_id',
                            }}
                          >
                            {this.state.allTransportCities.map((obj, k) => {
                              return (
                                <MenuItem key={k} value={obj.id}>{obj.name}</MenuItem>
                              );
                            })}
                          </SelectMaterial>
                        </FormControl>
                      </Grid>
                      :
                      null
                    }
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classNames(classes.paper, classes.singleItem)}>
                    <div>
                      <Grid
                        container
                        alignItems="flex-start"
                        justify="space-around"
                        direction="row"
                        spacing={24}
                        style={{
                          textAlign: 'left',
                        }}
                      >
                        <Grid
                          item
                          md={6}
                          className={classes.demo}
                        >
                          <div>
                            <Grid
                              container
                              alignItems="flex-start"
                              justify="space-around"
                              direction="row"
                              spacing={24}
                            >
                              <Grid
                                item
                                md={6}
                                className={classes.demo}
                              >
                                <FormControl component="fieldset" required className={classes.formControl}>
                                  <FormLabel component="legend">Select Size</FormLabel>
                                  <RadioGroup
                                    aria-label="gender"
                                    name="size"
                                    className={classes.group}
                                    value={this.state.currentEditingItem.equipment.container_size}
                                    onChange={(event) => this.handleChangeRadioButtons('container_size', event.target.value)}
                                  >
                                    <FormControlLabel value="FEET_20" control={<Radio/>} label="20'"/>
                                    <FormControlLabel value="FEET_40" control={<Radio/>} label="40'"/>
                                    <FormControlLabel value="FEET_40_HQ" control={<Radio/>} label="40'HQ"/>
                                  </RadioGroup>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid
                          item
                          md={6}
                          className={classes.demo}
                        >
                          <div>
                            <Grid
                              container
                              alignItems="flex-start"
                              justify="space-around"
                              direction="row"
                              spacing={24}
                            >
                              <Grid
                                item
                                md={6}
                                className={classes.demo}
                              >
                                <FormControl component="fieldset" required className={classes.formControl}>
                                  <FormLabel component="legend">Select Container</FormLabel>
                                  <RadioGroup
                                    aria-label="container"
                                    name="containerType"
                                    className={classes.group}
                                    value={this.state.currentEditingItem.equipment.container_type}
                                    onChange={(event) => this.handleChangeRadioButtons('container_type', event.target.value)}
                                  >
                                    <FormControlLabel value="DRY" control={<Radio/>} label="Dry"/>
                                    <FormControlLabel value="REFER" control={<Radio/>} label="Reefer"/>
                                    <FormControlLabel value="SPECIAL_CONTAINER" control={<Radio/>}
                                                      label="Special Container"/>
                                  </RadioGroup>
                                </FormControl>

                                {this.state.currentEditingItem.equipment.container_type === 'DRY' ?
                                  <FormGroup row>
                                    <FormControlLabel
                                      control={(
                                        <Switch
                                          onChange={(e, checked) => this.handleChangeRadioButtons('is_hazardous', checked)}
                                          value="checkedA"
                                          checked={this.state.currentEditingItem.equipment.is_hazardous}
                                        />
                                      )}
                                      label="Hazardous Items"
                                    />
                                  </FormGroup>
                                  :
                                  null
                                }
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                      {this.state.currentEditingItem.equipment.container_type === 'SPECIAL_CONTAINER' ?
                        <Grid
                          container
                          alignItems="flex-start"
                          justify="space-around"
                          direction="row"
                          style={{
                            textAlign: 'left',
                            // marginTop: '50px'
                          }}
                        >
                          <Grid
                            item
                            md={6}
                            className={classes.demo}
                          >
                            <div>
                              <Grid
                                container
                                alignItems="flex-start"
                                justify="space-around"
                                direction="row"
                                spacing={24}
                              >
                                <Grid
                                  item
                                  md={6}
                                  className={classes.demo}
                                >
                                  <FormControl component="fieldset" required className={classes.formControl}>
                                    <FormLabel component="legend">Select Special Container Type</FormLabel>
                                    <RadioGroup
                                      aria-label="Select Special Container Type"
                                      name="specialContainerType"
                                      className={classes.group}
                                      value={this.state.currentEditingItem.equipment.sc_type}
                                      onChange={(event) => this.handleChangeRadioButtons('sc_type', event.target.value)}
                                    >
                                      <FormControlLabel value="OPEN_TOP" control={<Radio/>} label="Open Top"/>
                                      <FormControlLabel value="FLAT_RACK" control={<Radio/>} label="Flat Rack"/>
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                          <Grid
                            item
                            md={6}
                            className={classes.demo}
                          >
                            <div>
                              <Grid
                                container
                                alignItems="flex-start"
                                justify="space-around"
                                direction="row"
                                spacing={24}
                              >
                                <Grid
                                  item
                                  md={6}
                                  className={classes.demo}
                                >
                                  <FormControl component="fieldset" required className={classes.formControl}>
                                    <FormLabel component="legend">Select Gauge Type</FormLabel>
                                    <RadioGroup
                                      aria-label="gender"
                                      name="containerType"
                                      className={classes.group}
                                      value={this.state.currentEditingItem.equipment.gauge_type}
                                      onChange={(event) => this.handleChangeRadioButtons('gauge_type', event.target.value)}
                                    >
                                      <FormControlLabel value="IN_GAUGE" control={<Radio/>} label="In Gauge"/>
                                      <FormControlLabel value="OUT_GAUGE" control={<Radio/>} label="Out Gauge"/>
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                        </Grid>
                        :
                        null
                      }
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>


            <Grid item xs={8}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classNames(classes.paper, classes.singleItem)}>
                    <div>
                      <Grid
                        container
                        alignItems="flex-start"
                        justify="space-around"
                        direction="row"
                        spacing={24}
                        style={{
                          textAlign: 'left',
                        }}
                      >
                        <Grid
                          item
                          md={4}
                          className={classes.demo}
                        >
                          <div>
                            <Grid
                              container
                              alignItems="flex-start"
                              justify="space-around"
                              direction="row"
                              spacing={24}
                            >
                              <Grid
                                item
                                md={6}
                                className={classes.demo}
                              >
                                <Typography>Packaging Type</Typography>

                                <FormControl className={classes.formControl}>
                                  <InputLabel htmlFor="age-simple">Packaging Type</InputLabel>
                                  <SelectMaterial
                                    name="packaging_type"
                                    value={this.state.currentEditingItem.packaging_type}
                                    onChange={(e) => this.handleChangeSimpleFields(e.target.name, e.target.value)}
                                    inputProps={{
                                      name: 'packaging_type',
                                      id: 'packaging-simple',
                                    }}
                                  >
                                    <MenuItem value="CARTONS">Cartons</MenuItem>
                                    <MenuItem value="WOODEN_PALLETS">Wooden Pallets</MenuItem>
                                    <MenuItem value="ROLLS">Rolls</MenuItem>
                                    <MenuItem value="BALES">Bales</MenuItem>
                                    <MenuItem value="FIBER_BOARD_BOX">Fiber Board Box</MenuItem>
                                    <MenuItem value="FLEXI_BAG">Flexi Bag</MenuItem>
                                    <MenuItem value="BARRELS">Barrels</MenuItem>
                                  </SelectMaterial>
                                </FormControl>

                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid
                          item
                          md={4}
                          className={classes.demo}
                        >
                          <div>
                            <Grid
                              container
                              alignItems="flex-start"
                              justify="space-around"
                              direction="row"
                              spacing={24}
                            >
                              <Grid
                                item
                                md={6}
                                className={classes.demo}
                              >
                                <Typography>Free Time</Typography>
                                <FormControl className={classes.formControl}>
                                  <InputLabel htmlFor="free_time">Free Time</InputLabel>
                                  <SelectMaterial
                                    name="free_time"
                                    value={this.state.currentEditingItem.free_time}
                                    onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                                    inputProps={{
                                      name: 'free_time',
                                      id: 'free_time',
                                    }}
                                  >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                    <MenuItem value="5">5</MenuItem>
                                    <MenuItem value="7">7</MenuItem>
                                    <MenuItem value="14">14</MenuItem>
                                    <MenuItem value="21">21</MenuItem>
                                    <MenuItem value="28">28</MenuItem>
                                    <MenuItem value="Others">Others</MenuItem>
                                  </SelectMaterial>
                                </FormControl>

                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid
                          item
                          md={4}
                          className={classes.demo}
                        >
                          <div>
                            <Grid
                              container
                              alignItems="flex-start"
                              justify="space-around"
                              direction="row"
                              spacing={24}
                            >
                              <Grid
                                item
                                md={6}
                                className={classes.demo}
                              >
                                <Typography>Weight</Typography>

                                <FormControl className={classes.formControl}>

                                  <InputLabel htmlFor="free_time">Weight</InputLabel>


                                  <InputMaterial
                                    id="adornment-weight"
                                    value={this.state.currentEditingItem.weight}
                                    onChange={(e) => {
                                      let value = e.target.value;
                                      this.handleChangeSimpleFields('weight', value);
                                    }}
                                    endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                                    inputProps={{
                                      'aria-label': 'Weight',
                                    }}
                                  />
                                  <FormHelperText id="weight-helper-text"/>
                                </FormControl>


                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Paper className={classNames(classes.paper, classes.singleItem)}>
                <TextField
                  id="outlined-full-width"
                  label="Remarks"
                  style={{
                    margin: 8,
                    width: '90%'
                  }}
                  multiline
                  rows="4"
                  placeholder="Enter any remarks"
                  margin="normal"
                  variant="outlined"
                  value={this.state.currentEditingItem.remarks}
                  onChange={(e) => {
                    this.handleChangeSimpleFields('remarks', e.target.value);
                  }}
                />
              </Paper>
            </Grid>

            <Grid item xs={8} alignContent="right">
              <Button color="secondary"
                      variant="contained"
                      onClick={this.handleEditSubmit}
              >Submit</Button>
            </Grid>
          </Grid>*/}
        </Dialog>

        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Edit
              </Typography>
              <IconButton color="inherit" aria-label="Close" onClick={this.handleClose}>
                <CloseIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>

          <Grid container justify="center" className={classes.root} spacing={16}>
            <Grid item xs={8}>
              <TextSuggestion
                placeholder="Enter Customer Name"
                identifier="customer_id"
                suggestionUrl="customers"
                value={this.state.currentEditingItem.customer.customer_name}
                setNewId={this.handleChangeNestedFields}
              />
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classNames(classes.paper, classes.singleItem)}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Mode of Transport</FormLabel>

                      <RadioGroup
                        aria-label="Transport type"
                        name="transport_type"
                        className={classes.group}
                        value={this.state.currentEditingItem.transport_type}
                        onChange={(e) =>
                          this.handleChangeSimpleFields(e.target.name, e.target.value)
                        }
                        row
                      >
                        <FormControlLabel value="AIR" control={<Radio/>} label={<AirplaneIcon/>}/>
                        <FormControlLabel value="SEA" control={<Radio/>} label={<SeaIcon/>}/>
                        <FormControlLabel value="RAIL" control={<Radio/>} label={<RailIcon/>}/>
                        <FormControlLabel value="ROAD" control={<Radio/>} label={<RoadIcon/>}/>
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classNames(classes.paper, classes.singleItem)}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Import/Export</FormLabel>
                      <RadioGroup
                        aria-label="Import/Export"
                        name="business_type"
                        className={classes.group}
                        value={this.state.currentEditingItem.business_type}
                        onChange={(e) =>
                          this.handleChangeSimpleFields(e.target.name, e.target.value)
                        }
                        row
                      >
                        <FormControlLabel value="IMPORT" control={<Radio/>} label="Import"/>
                        <FormControlLabel value="EXPORT" control={<Radio/>} label="Export"/>
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classNames(classes.paper, classes.singleItem)}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Routing Details</FormLabel>

                      <RadioGroup
                        aria-label="Direction"
                        name="direction"
                        className={classes.radioGroup}
                        value={this.state.currentEditingItem.trade_lane.trade_lane_type}
                        onChange={(e) => this.handleChangeNestedFields('trade_lane', 'trade_lane_type', e.target.value)}
                        row
                      >
                        <FormControlLabel value="DOOR_TO_DOOR" control={<Radio/>} label="Door to Door"/>
                        <FormControlLabel value="DOOR_TO_PORT" control={<Radio/>} label="Door to Port"/>
                        <FormControlLabel value="PORT_TO_DOOR" control={<Radio/>} label="Port to Door"/>
                        <FormControlLabel value="PORT_TO_PORT" control={<Radio/>} label="Port to Port"/>
                      </RadioGroup>

                      {
                        tradeLaneType === 'DOOR_TO_DOOR' || tradeLaneType === 'DOOR_TO_PORT' ?
                          <div>
                            <FormLabel component="legend" className={classes.marginTop20}>Origin Warehouse</FormLabel>
                            <TextSuggestion
                              placeholder="Enter Origin Warehouse"
                              identifier="ware_house_address_id"
                              section="origin_warehouse"
                              suggestionUrl="ware_houses"
                              value={this.state.currentEditingItem.trade_lane.origin_ware_house.ware_house_name}
                              setNewId={this.handleChangeDoubleNestedFields}
                            />
                          </div>
                          :
                          null
                      }
                      <FormLabel component="legend" className={classes.marginTop20}>Loading Port</FormLabel>
                      <TextSuggestion
                        placeholder="Enter Loading Port"
                        identifier="loading_port"
                        value={this.state.currentEditingItem.trade_lane.loading_port}
                        setNewId={this.handleChangeNestedFields}
                      />

                      <FormLabel component="legend" className={classes.marginTop20}>Destination Port</FormLabel>
                      <TextSuggestion
                        placeholder="Enter Discharge Port"
                        identifier="discharge_port"
                        value={this.state.currentEditingItem.trade_lane.discharge_port}
                        setNewId={this.handleChangeNestedFields}
                      />
                      {
                        tradeLaneType === 'DOOR_TO_DOOR' || tradeLaneType === 'PORT_TO_DOOR' ?
                          <div>
                            <FormLabel component="legend" className={classes.marginTop20}>Destination
                              Warehouse</FormLabel>
                            <TextSuggestion
                              placeholder="Enter Destination Warehouse"
                              identifier="ware_house_address_id"
                              value={this.state.currentEditingItem.trade_lane.destination_ware_house.ware_house_name}
                              section="destination_warehouse"
                              suggestionUrl="ware_houses"
                              setNewId={this.handleChangeDoubleNestedFields}
                            />
                          </div>
                          :
                          null
                      }
                      <FormLabel component="legend" className={classes.marginBottom20}/>

                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classNames(classes.paper, classes.singleItem)}>
                    <Grid item xs={12}>
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Custom Clearance</FormLabel>
                        <RadioGroup
                          aria-label="Custom Clearance"
                          name="custom_clearance"
                          className={classes.group}
                          value={this.state.currentEditingItem.custom_clearance ? 'YES' : 'NO'}
                          onChange={(e) =>
                            this.handleChangeSimpleFields(e.target.name, e.target.value === 'YES')
                          }
                          row
                        >
                          <FormControlLabel value="YES" control={<Radio/>} label="Yes"/>
                          <FormControlLabel value="NO" control={<Radio/>} label="No"/>
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Transport Fees</FormLabel>
                        <RadioGroup
                          aria-label="Transport Fees"
                          name="city"
                          className={classes.group}
                          value={this.state.isTransportFeeRequired ? 'YES' : 'NO'}
                          onChange={(e) => {
                            let value = e.target.value;
                            this.setState({
                              isTransportFeeRequired: value === 'YES'
                            }, () => {
                              if (value === 'NO') {
                                this.handleChangeNestedFields('transport_city_from', 'transport_city_id', null);
                              } else {
                                this.handleChangeNestedFields('transport_city_from', 'transport_city_id', this.state.allTransportCities[0].id || 0);
                              }
                            });
                          }}
                          row
                        >
                          <FormControlLabel value="YES" control={<Radio/>} label="Yes"/>
                          <FormControlLabel value="NO" control={<Radio/>} label="No"/>
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    {this.state.isTransportFeeRequired ?
                      <Grid item>
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="transport_city_id">From</InputLabel>
                          <SelectMaterial
                            name="transport_city_id"
                            value={this.state.currentEditingItem.transport_city_from.transport_city_id || null}
                            onChange={(e) => this.handleChangeNestedFields('transport_city_from', 'transport_city_id', e.target.value)}
                            inputProps={{
                              name: 'transport_city_id',
                              id: 'transport_city_id',
                            }}
                          >
                            {this.state.allTransportCities.map((obj, k) => {
                              return (
                                <MenuItem key={k} value={obj.id}>{obj.name}</MenuItem>
                              );
                            })}
                          </SelectMaterial>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="transport_city_id_to">To</InputLabel>
                          <SelectMaterial
                            name="transport_city_id_to"
                            value={this.state.currentEditingItem.transport_city_to.transport_city_id || null}
                            onChange={(e) => this.handleChangeNestedFields('transport_city_to', 'transport_city_id', e.target.value)}
                            inputProps={{
                              name: 'transport_city_id',
                              id: 'transport_city_id',
                            }}
                          >
                            {this.state.allTransportCities.map((obj, k) => {
                              return (
                                <MenuItem key={k} value={obj.id}>{obj.name}</MenuItem>
                              );
                            })}
                          </SelectMaterial>
                        </FormControl>
                      </Grid>
                      :
                      null
                    }
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classNames(classes.paper, classes.singleItem)}>
                    <div>
                      <Grid
                        container
                        alignItems="flex-start"
                        justify="space-around"
                        direction="row"
                        spacing={24}
                        style={{
                          textAlign: 'left',
                        }}
                      >
                        <Grid
                          item
                          md={6}
                          className={classes.demo}
                        >
                          <div>
                            <Grid
                              container
                              alignItems="flex-start"
                              justify="space-around"
                              direction="row"
                              spacing={24}
                            >
                              <Grid
                                item
                                md={6}
                                className={classes.demo}
                              >
                                <FormControl component="fieldset" required className={classes.formControl}>
                                  <FormLabel component="legend">Select Size</FormLabel>
                                  <RadioGroup
                                    aria-label="gender"
                                    name="size"
                                    className={classes.group}
                                    value={this.state.currentEditingItem.equipment.container_size}
                                    onChange={(event) => this.handleChangeRadioButtons('container_size', event.target.value)}
                                  >
                                    <FormControlLabel value="FEET_20" control={<Radio/>} label="20'"/>
                                    <FormControlLabel value="FEET_40" control={<Radio/>} label="40'"/>
                                    <FormControlLabel value="FEET_40_HQ" control={<Radio/>} label="40'HQ"/>
                                  </RadioGroup>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid
                          item
                          md={6}
                          className={classes.demo}
                        >
                          <div>
                            <Grid
                              container
                              alignItems="flex-start"
                              justify="space-around"
                              direction="row"
                              spacing={24}
                            >
                              <Grid
                                item
                                md={6}
                                className={classes.demo}
                              >
                                <FormControl component="fieldset" required className={classes.formControl}>
                                  <FormLabel component="legend">Select Container</FormLabel>
                                  <RadioGroup
                                    aria-label="container"
                                    name="containerType"
                                    className={classes.group}
                                    value={this.state.currentEditingItem.equipment.container_type}
                                    onChange={(event) => this.handleChangeRadioButtons('container_type', event.target.value)}
                                  >
                                    <FormControlLabel value="DRY" control={<Radio/>} label="Dry"/>
                                    <FormControlLabel value="REFER" control={<Radio/>} label="Reefer"/>
                                    <FormControlLabel value="SPECIAL_CONTAINER" control={<Radio/>}
                                                      label="Special Container"/>
                                  </RadioGroup>
                                </FormControl>

                                {this.state.currentEditingItem.equipment.container_type === 'DRY' ?
                                  <FormGroup row>
                                    <FormControlLabel
                                      control={(
                                        <Switch
                                          onChange={(e, checked) => this.handleChangeRadioButtons('is_hazardous', checked)}
                                          value="checkedA"
                                          checked={this.state.currentEditingItem.equipment.is_hazardous}
                                        />
                                      )}
                                      label="Hazardous Items"
                                    />
                                  </FormGroup>
                                  :
                                  null
                                }
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                      {this.state.currentEditingItem.equipment.container_type === 'SPECIAL_CONTAINER' ?
                        <Grid
                          container
                          alignItems="flex-start"
                          justify="space-around"
                          direction="row"
                          style={{
                            textAlign: 'left',
                            // marginTop: '50px'
                          }}
                        >
                          <Grid
                            item
                            md={6}
                            className={classes.demo}
                          >
                            <div>
                              <Grid
                                container
                                alignItems="flex-start"
                                justify="space-around"
                                direction="row"
                                spacing={24}
                              >
                                <Grid
                                  item
                                  md={6}
                                  className={classes.demo}
                                >
                                  <FormControl component="fieldset" required className={classes.formControl}>
                                    <FormLabel component="legend">Select Special Container Type</FormLabel>
                                    <RadioGroup
                                      aria-label="Select Special Container Type"
                                      name="specialContainerType"
                                      className={classes.group}
                                      value={this.state.currentEditingItem.equipment.sc_type}
                                      onChange={(event) => this.handleChangeRadioButtons('sc_type', event.target.value)}
                                    >
                                      <FormControlLabel value="OPEN_TOP" control={<Radio/>} label="Open Top"/>
                                      <FormControlLabel value="FLAT_RACK" control={<Radio/>} label="Flat Rack"/>
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                          <Grid
                            item
                            md={6}
                            className={classes.demo}
                          >
                            <div>
                              <Grid
                                container
                                alignItems="flex-start"
                                justify="space-around"
                                direction="row"
                                spacing={24}
                              >
                                <Grid
                                  item
                                  md={6}
                                  className={classes.demo}
                                >
                                  <FormControl component="fieldset" required className={classes.formControl}>
                                    <FormLabel component="legend">Select Gauge Type</FormLabel>
                                    <RadioGroup
                                      aria-label="gender"
                                      name="containerType"
                                      className={classes.group}
                                      value={this.state.currentEditingItem.equipment.gauge_type}
                                      onChange={(event) => this.handleChangeRadioButtons('gauge_type', event.target.value)}
                                    >
                                      <FormControlLabel value="IN_GAUGE" control={<Radio/>} label="In Gauge"/>
                                      <FormControlLabel value="OUT_GAUGE" control={<Radio/>} label="Out Gauge"/>
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                        </Grid>
                        :
                        null
                      }
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>


            <Grid item xs={8}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classNames(classes.paper, classes.singleItem)}>
                    <div>
                      <Grid
                        container
                        alignItems="flex-start"
                        justify="space-around"
                        direction="row"
                        spacing={24}
                        style={{
                          textAlign: 'left',
                        }}
                      >
                        <Grid
                          item
                          md={4}
                          className={classes.demo}
                        >
                          <div>
                            <Grid
                              container
                              alignItems="flex-start"
                              justify="space-around"
                              direction="row"
                              spacing={24}
                            >
                              <Grid
                                item
                                md={6}
                                className={classes.demo}
                              >
                                <Typography>Packaging Type</Typography>

                                <FormControl className={classes.formControl}>
                                  <InputLabel htmlFor="age-simple">Packaging Type</InputLabel>
                                  <SelectMaterial
                                    name="packaging_type"
                                    value={this.state.currentEditingItem.packaging_type}
                                    onChange={(e) => this.handleChangeSimpleFields(e.target.name, e.target.value)}
                                    inputProps={{
                                      name: 'packaging_type',
                                      id: 'packaging-simple',
                                    }}
                                  >
                                    <MenuItem value="CARTONS">Cartons</MenuItem>
                                    <MenuItem value="WOODEN_PALLETS">Wooden Pallets</MenuItem>
                                    <MenuItem value="ROLLS">Rolls</MenuItem>
                                    <MenuItem value="BALES">Bales</MenuItem>
                                    <MenuItem value="FIBER_BOARD_BOX">Fiber Board Box</MenuItem>
                                    <MenuItem value="FLEXI_BAG">Flexi Bag</MenuItem>
                                    <MenuItem value="BARRELS">Barrels</MenuItem>
                                  </SelectMaterial>
                                </FormControl>

                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid
                          item
                          md={4}
                          className={classes.demo}
                        >
                          <div>
                            <Grid
                              container
                              alignItems="flex-start"
                              justify="space-around"
                              direction="row"
                              spacing={24}
                            >
                              <Grid
                                item
                                md={6}
                                className={classes.demo}
                              >
                                <Typography>Free Time</Typography>
                                <FormControl className={classes.formControl}>
                                  <InputLabel htmlFor="free_time">Free Time</InputLabel>
                                  <SelectMaterial
                                    name="free_time"
                                    value={this.state.currentEditingItem.free_time}
                                    onChange={(e) => this.handleChangeSimpleFields('free_time', e.target.value)}
                                    inputProps={{
                                      name: 'free_time',
                                      id: 'free_time',
                                    }}
                                  >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                    <MenuItem value="5">5</MenuItem>
                                    <MenuItem value="7">7</MenuItem>
                                    <MenuItem value="14">14</MenuItem>
                                    <MenuItem value="21">21</MenuItem>
                                    <MenuItem value="28">28</MenuItem>
                                    <MenuItem value="Others">Others</MenuItem>
                                  </SelectMaterial>
                                </FormControl>

                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid
                          item
                          md={4}
                          className={classes.demo}
                        >
                          <div>
                            <Grid
                              container
                              alignItems="flex-start"
                              justify="space-around"
                              direction="row"
                              spacing={24}
                            >
                              <Grid
                                item
                                md={6}
                                className={classes.demo}
                              >
                                <Typography>Weight</Typography>

                                <FormControl className={classes.formControl}>

                                  <InputLabel htmlFor="free_time">Weight</InputLabel>


                                  <InputMaterial
                                    id="adornment-weight"
                                    value={this.state.currentEditingItem.weight}
                                    onChange={(e) => {
                                      let value = e.target.value;
                                      this.handleChangeSimpleFields('weight', value);
                                    }}
                                    endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                                    inputProps={{
                                      'aria-label': 'Weight',
                                    }}
                                  />
                                  <FormHelperText id="weight-helper-text"/>
                                </FormControl>


                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Paper className={classNames(classes.paper, classes.singleItem)}>
                <TextField
                  id="outlined-full-width"
                  label="Remarks"
                  style={{
                    margin: 8,
                    width: '90%'
                  }}
                  multiline
                  rows="4"
                  placeholder="Enter any remarks"
                  margin="normal"
                  variant="outlined"
                  value={this.state.currentEditingItem.remarks}
                  onChange={(e) => {
                    this.handleChangeSimpleFields('remarks', e.target.value);
                  }}
                />
              </Paper>
            </Grid>

            <Grid item xs={8} alignContent="right">
              <Button color="secondary"
                      variant="contained"
                      onClick={this.handleEditSubmit}
              >Submit</Button>
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
                View Completed Sales Query
              </Typography>
              <IconButton color="inherit" onClick={this.handleCloseView} aria-label="Close">
                <CloseIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>

          <PapperBlock whiteBg noMargin title={this.state.currentEditingItem.customer.customer_name}
                       icon="ios-analytics-outline" desc="" style={{
            marginLeft: 25,
            marginBottom: 25
          }}>
            <Grid container spacing={16}>

              <Grid item md={12} xs={12}>
                <ul className={classes.allIcons}>
                  <li style={{ width: '12.5%' }}>
                    <Avatar className={classNames(classes.leftIcon, classes.blueAvatar)}>
                      <Icon
                        className={classNames('fa fa-globe')}
                        style={{ fontSize: 30 }}
                      />
                    </Avatar>
                    <Typography variant="caption">
                      <span className={classes.blueText}>Mode</span>
                      <Typography>{formatter(this.state.currentEditingItem.transport_type)}</Typography>
                    </Typography>
                  </li>
                  <li style={{ width: '12.5%' }}>
                    <Avatar className={classNames(classes.leftIcon, classes.tealAvatar)}>
                      <Icon
                        className={classNames('fa fa-exchange-alt')}
                        style={{ fontSize: 30 }}
                      /> </Avatar>
                    <Typography variant="caption">
                      <span className={classes.tealText}>Direction</span>
                      <Typography>{formatter(this.state.currentEditingItem.business_type)}</Typography>
                    </Typography>
                  </li>
                  <li style={{ width: '12.5%' }}>
                    <Avatar className={classNames(classes.leftIcon, classes.pinkAvatar)}>
                      <Icon
                        className={classNames('fa fa-gavel')}
                        style={{ fontSize: 30 }}
                      /> </Avatar>
                    <Typography variant="caption">
                      <span className={classes.pinkText}>Custom Clearance</span>
                      <Typography>{this.state.currentEditingItem.custom_clearance ? 'Yes' : 'No'}</Typography>
                    </Typography>
                  </li>
                  <li style={{ width: '12.5%' }}>
                    <Avatar className={classNames(classes.leftIcon, classes.purpleAvatar)}>
                      <Icon
                        className={classNames('fa fa-box-open')}
                        style={{ fontSize: 30 }}
                      /> </Avatar>
                    <Typography variant="caption">
                      <span className={classes.purpleText}>Free Time</span>
                      <Typography>{this.state.currentEditingItem.free_time} days</Typography>
                    </Typography>
                  </li>


                  <li style={{ width: '12.5%' }}>
                    <Avatar className={classNames(classes.leftIcon, classes.blueAvatar)}>
                      <Icon
                        className={classNames('fa fa-expand-arrows-alt')}
                        style={{ fontSize: 30 }}
                      />
                    </Avatar>
                    <Typography variant="caption">
                      <span className={classes.blueText}>Size</span>
                      <Typography>{sizeFormatted(this.state.currentEditingItem.equipment.container_size)}</Typography>
                    </Typography>
                  </li>
                  <li style={{ width: '12.5%' }}>
                    <Avatar className={classNames(classes.leftIcon, classes.tealAvatar)}>
                      <Icon
                        className={classNames('fa fa-people-carry')}
                        style={{ fontSize: 30 }}
                      /> </Avatar>
                    <Typography variant="caption">
                      <span className={classes.tealText}>Container</span>
                      <Typography>{formatter(this.state.currentEditingItem.equipment.container_type)}</Typography>

                      {this.state.currentEditingItem.equipment.container_type === 'DRY' ?
                        <Typography style={{
                          color: '#909090',
                          fontSize: '10px'
                        }}>
                          Hazardous Items
                          {this.state.currentEditingItem.equipment.is_hazardous ?
                            <Icon
                              className={classNames('fa fa-check-circle')}
                              style={{
                                marginLeft: 5,
                                color: '#309688',
                                fontSize: 10
                              }}
                            />
                            :
                            <Icon
                              className={classNames('fa fa-times-circle')}
                              style={{
                                marginLeft: 5,
                                color: '#ed4e7a',
                                fontSize: 10
                              }}
                            />

                          }


                        </Typography>
                        :
                        null
                      }


                      {this.state.currentEditingItem.equipment.container_type === 'SPECIAL_CONTAINER' ?
                        <Typography style={{
                          color: '#909090',
                          fontSize: '10px'
                        }}>
                          {formatter(this.state.currentEditingItem.equipment.sc_type)}/
                          {formatter(this.state.currentEditingItem.equipment.gauge_type)}
                        </Typography>

                        :
                        null
                      }

                    </Typography>
                  </li>
                  <li style={{ width: '12.5%' }}>
                    <Avatar className={classNames(classes.leftIcon, classes.pinkAvatar)}>
                      <Icon
                        className={classNames('fa fa-tape')}
                        style={{ fontSize: 30 }}
                      /> </Avatar>
                    <Typography variant="caption">
                      <span className={classes.pinkText}>Packaging Type</span>
                      <Typography>{formatter(this.state.currentEditingItem.packaging_type)}</Typography>
                    </Typography>
                  </li>
                  <li style={{ width: '12.5%' }}>
                    <Avatar className={classNames(classes.leftIcon, classes.purpleAvatar)}>
                      <Icon
                        className={classNames('fa fa-weight')}
                        style={{ fontSize: 30 }}
                      /> </Avatar>
                    <Typography variant="caption">
                      <span className={classes.purpleText}>Weight</span>
                      <Typography>20 kg</Typography>
                    </Typography>
                  </li>
                </ul>
              </Grid>

              <Typography>
                <Typography>
                  <strong>{formatter(this.state.currentEditingItem.trade_lane.trade_lane_type)}: </strong>
                  {this.getRoutingString()}
                </Typography>

                <Typography>
                  <Typography>
                    <strong>Transport: </strong>
                    {this.state.currentEditingItem.transport_city_from.transport_city_id ?
                      this.state.currentEditingItem.transport_city_from.city + ' -> ' +
                      this.state.currentEditingItem.transport_city_to.city
                      :
                      'None'
                    }
                  </Typography>
                </Typography>

                <Typography>
                  <Typography>
                    <strong>Remarks: </strong>
                    {this.state.currentEditingItem.remarks}
                  </Typography>
                </Typography>

              </Typography>

            </Grid>

            <Grid container justify="center" className={classes.root} spacing={16}>

              <Grid item xs={8}>
                <Paper className={classNames(classes.paper, classes.singleItem)}>
                  <h1 style={{
                    textAlign: 'center',
                    padding: '20px'
                  }}>
                    Enter Profit/Remarks<br/>
                    <Tooltip title="Price entered by pricing department">
                      <Chip
                        style={{ marginTop: 20 }}
                        avatar={<Avatar style={{ fontSize: '0.5rem' }}>NRs</Avatar>}
                        label={this.state.currentEditingItem.price || 0}
                        className={classes.chip}
                        color="secondary"
                      />
                    </Tooltip>
                  </h1>

                  {this.state.currentSubmission === 'submit' ?
                    <FormControl fullWidth className={classes.margin}>
                      <InputLabel htmlFor="adornment-amount">Enter Profit</InputLabel>
                      <Input
                        id="adornment-amount"
                        startAdornment={<InputAdornment position="start">NRs.</InputAdornment>}
                        className={classNames(classes.marginBottom20, 'no-up-down-arrow')}
                        value={this.state.profit}
                        type="number"
                        onChange={(e) => {
                          this.setState({
                            profit: e.target.value
                          });
                        }}
                      />
                    </FormControl>
                    :
                    <TextField
                      id="outlined-full-width"
                      label="Enter Revision"
                      style={{
                        margin: 8,
                        width: '90%'
                      }}
                      multiline
                      rows="4"
                      placeholder="Enter revision"
                      margin="normal"
                      variant="outlined"
                      onChange={(e) => {
                        this.setState({
                          revision: e.target.value
                        });
                      }}
                    />
                  }


                  <Grid item xs={8} alignContent="right">
                    <Button color="secondary"
                            variant="contained"
                            onClick={() => {
                              this.setState({
                                openWarningSubmission: true,
                              });
                            }}
                    >Submit</Button>
                  </Grid>

                  <Divider/>
                  <Grid item xs={12}>
                    <Button
                      disableRipple
                      className={classNames(classes.margin, classes.bootstrapRoot)}
                      onClick={() => {
                        this.setState({
                          currentSubmission: this.state.currentSubmission === 'submit' ? 'revision' : 'submit'
                        });
                      }}>
                      {this.state.currentSubmission === 'submit' ?
                        'Or Enter Revision' :
                        'Or Enter Profit'
                      }
                    </Button>
                  </Grid>
                  <Divider/>


                  {/*<Grid item xs={8} alignContent="right">
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        this.setState({
                          openWarningSubmission: true,
                          currentSubmission: 'revision'
                        });
                      }}
                    >Submit</Button>
                  </Grid>*/}

                </Paper>
              </Grid>


            </Grid>

          </PapperBlock>
        </Dialog>


        <Dialog
          open={this.state.openWarningSubmission}
          onClose={() => this.handleCloseWarningModal('openWarningSubmission')}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Are you sure?'}
          </DialogTitle>
          <DialogContent>
            {this.state.currentSubmission === 'submit' ?
              <DialogContentText id="alert-dialog-description">
                You have entered a profit of <b> NRs. {this.state.profit}</b> for this sales query.
                <br/>

              </DialogContentText>
              :
              <DialogContentText id="alert-dialog-description">
                You have asked for <span style={{ color: 'indianred' }}>revision</span> with remarks of
                <br/>
                <Quote align="left"
                       content={this.state.revision}
                />
              </DialogContentText>
            }
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleCloseWarningModal('openWarningSubmission')}
              color="primary">
              Cancel
            </Button>
            <Button variant="contained"
                    onClick={() => this.handleCloseWarningModal('openWarningSubmission', this.state.currentSubmission)}
                    color="secondary"
                    autoFocus
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>


        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.showToast}
          autoHideDuration={6000}
          onClose={this.handleCloseToast}
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

const mapStateToProps = (state) => {
  return {};
};

/*
const mapStateToProps = state => ({
  force: state, // force state from reducer
  dataTable: state.getIn([branch, 'dataTable']),
  messageNotif: state.getIn([branch, 'notifMsg']),
});
*/

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
