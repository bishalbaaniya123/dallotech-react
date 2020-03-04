import React, { Component } from 'react';
import './styles/tableStyle-jss';
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
import { CommercialInvoicePricing, Notification } from 'dan-components';

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import AirplaneIcon from '@material-ui/icons/AirplanemodeActive';

import NewIcon from '@material-ui/icons/FiberNew';
import PendingIcon from '@material-ui/icons/Alarm';
import RevisionIcon from '@material-ui/icons/Update';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
import green from '@material-ui/core/colors/green';

import { PapperBlock, CommercialInvoice } from 'dan-components';


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
import ReactToPrint from 'react-to-print';
import PrintIcon from '@material-ui/icons/Print';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Badge from '@material-ui/core/Badge';
//end for dialog

import api from 'dan-api/remote-api/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import InputMaterial from '@material-ui/core/Input/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Avatar from '@material-ui/core/Avatar';
import { TextSuggestion } from 'dan-components';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/es/colors/red';

import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Dvr from '@material-ui/core/SvgIcon/SvgIcon';
import colorfull from 'dan-api/palette/colorfull';
import { formatter, sizeFormatted } from '../../api/extras/formatter';


// Reducer Branch
const branch = 'crudTableDemo';
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical"/>
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

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
  button: {
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  btnArea: {
    textAlign: 'center'
  },
  wrapper: {
    width: '100%',
    overflow: 'auto'
  },
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
  },
  badge: {
    top: '50%',
    right: -3,
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
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
      color: theme.palette.secondary
    },
  },
  toggleButtonGroupMain: {
    padding: '4px 25px'
  },
  marginTop25: {
    marginTop: 25
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
});

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function formatTableData(arrayObj) {
  let finalArray = [];
  for (let i = 0; i < arrayObj.length; i++) {
    let singleObject = arrayObj[i];
    let singleArray = [];
    let containerSize = singleObject.equipment.container_size;
    if (containerSize === 'FEET_20') {
      containerSize = '20\'';
    } else if (containerSize === 'FEET_40') {
      containerSize = '40\'';
    } else if (containerSize === 'FEET_40_HQ') {
      containerSize = '40\'HQ';
    }

    let splittedPackaging = '';
    let packagingFormatted = '';
    if (singleObject.packaging_type) {
      splittedPackaging = singleObject.packaging_type.split('_');
      for (let k = 0; k < splittedPackaging.length; k++) {
        packagingFormatted += splittedPackaging[k].charAt(0)
          .toUpperCase() + splittedPackaging[k].slice(1)
          .toLowerCase() + ' ';
      }
      packagingFormatted = packagingFormatted.slice(0, -1);

    }
    let splittedTradeLane = singleObject.trade_lane.trade_lane_type.split('_');

    let tradeLaneFormatted = '';
    for (let j = 0; j < splittedTradeLane.length; j++) {
      tradeLaneFormatted += splittedTradeLane[j].charAt(0)
        .toUpperCase() + splittedTradeLane[j].slice(1)
        .toLowerCase() + ' ';
    }


    singleArray.push(
      singleObject.business_type,
      tradeLaneFormatted,
      containerSize + '/' + singleObject.equipment.container_type.charAt(0)
        .toUpperCase() + singleObject.equipment.container_type.slice(1)
        .toLowerCase(),
      packagingFormatted,
      singleObject.sales_query_id,
    );
    finalArray.push(singleArray);
  }
  return finalArray;
}

class SalesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
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
                <EyeIcon style={{
                  fontSize: 15,
                  marginRight: 5
                }}
                />
                View
              </Button>;
            }
          }
        }
      ],

      allData: [
        {
          'sales_query_id': 32,
          'created_on': '2019-05-08T04:38:48.000+0000',
          'customer': {
            'customer_id': 2,
            'customer_name': 'bisahl'
          },
          'transport_city_from': {
            'transport_city_id': null,
            'city': null
          },
          'transport_type': 'SEA',
          'trade_lane': {
            'trade_lane_type': 'PORT_TO_DOOR',
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
          'weight': 1,
          'packaging_type': 'ROLLS',
          'equipment': {
            'container_size': 'FEET_40_HQ',
            'container_type': 'DRY',
            'sc_type': 'FLAT_RACK',
            'gauge_type': 'OUT_GAUGE',
            'is_hazardous': true
          },
          'remarks': 'next remarks',
          'custom_clearance': true,
          'price': null,
          'free_time': 2,
          'sales_quotation_status': 'PRICE_PENDING'
        }
      ],

      data: [
        ['IMPORT', 'DOOR_TO_DOOR', '20\'/Special Container/Open Top/In gauge', 'Cartons', 1],
        ['EXPORT', 'DOOR_TO_PORT', '40\'HQ/Dry', 'Cartons', 2],
        ['EXPORT', 'PORT_TO_DOOR', '40\'HQ/Dry', 'Cartons', 3],
        ['EXPORT', 'PORT_TO_DOOR', '40\'HQ/Dry', 'Cartons', 4],
        ['EXPORT', 'PORT_TO_PORT', '40\'HQ/Dry', 'Cartons', 5],
      ],


      value: 0,
      valueDialog: 0,
      open: false,
      openView: false,
      status: 'new',
      formats: ['bold'],
      totalPrice: 0,
      loading: false,
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
        'weight': 1,
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
      badge: {
        pending: 0,
        entered: 0,
        revised: 0,
        approved: 0
      },
      currentEditingKey: '',
      isTransportFeeRequired: false,

      openPricingModal: false,
      price: '',


      pricingBody: {
        origin: {
          incoterms: 'EXW',
          charge: '',
          remarks: '',
        },
        shipping: {
          mode: 'SEA',
          incoterms: 'EXW',
          charge: '',
          remarks: '',
        },
        destination: {
          from: '',
          to: '',
          mode: 'RAIL',
          item: 'DIRECT',
          charge: '',
          remarks: '',
        },
        total: ''
      }
    };
  }

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );

    api.getPricingData('AIR', 'PRICE_PENDING')
      .then(res => {
        this.setState({
          data: formatTableData(res.content),
          allData: res.content
        });
      });

    api.getBadgeItems('AIR')
      .then(res => {
        this.setState({
          badge: res
        });
      });
  }

  handleChangeStatus = (event, status) => {
    if (status) {
      this.setState({ status }, () => {
        let enumTransportType = this.state.value === 0 ? 'AIR' :
          this.state.value === 1 ? 'SEA' : 'INLAND';

        let enumStatus = this.state.status === 'new' ? 'PRICE_PENDING' :
          this.state.status === 'pending' ? 'PRICE_ENTERED' :
            this.state.status === 'revision' ? 'REVISE_PRICE_ENTERED' :
              'PRICE_APPROVED';

        api.getPricingData(enumTransportType, enumStatus)
          .then(res => {
            this.setState({
              data: formatTableData(res.content),
              allData: res.content
            });
          });
      });
    }

  };

  handleClickOpen = (itemIndex) => {
    this.setState({ open: true });
    let { allData } = this.state;
    let currentItem = {};
    let currentKey = '';
    for (let i = 0; i < allData.length; i++) {
      let singleItem = allData[i];
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
    this.setState({ openView: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      pricingBody: {
        origin: {
          incoterms: 'EXW',
          charge: '',
          remarks: '',
        },
        shipping: {
          mode: 'SEA',
          incoterms: 'EXW',
          charge: '',
          remarks: '',
        },
        destination: {
          from: '',
          to: '',
          mode: 'RAIL',
          item: 'DIRECT',
          charge: '',
          remarks: '',
        },
        total: ''
      }
    });
  };

  handleCloseView = () => {
    this.setState({ openView: false });
  };


  handleChangeTabs = (event, value) => {
    this.setState({
      value,
      status: 'new'
    }, () => {
      let enumTransportType = this.state.value === 0 ? 'AIR' :
        this.state.value === 1 ? 'SEA' : 'INLAND';
      let enumStatus = 'PRICE_PENDING';
      api.getPricingData(enumTransportType, enumStatus)
        .then(res => {
          this.setState({
            data: formatTableData(res.content),
            allData: res.content
          }, () => {
            api.getBadgeItems(enumTransportType)
              .then(res => {
                this.setState({
                  badge: res
                });
              });
          });
        });
    });
  };

  handleChangeTabsDialog = (event, valueDialog) => {
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

  handleSubmitPriceEntered = () => {
    const { price, status, badge } = this.state;
    const { sales_query_id } = this.state.currentEditingItem;
    let totalPrice = Number(this.state.pricingBody.origin.charge) + Number(this.state.pricingBody.shipping.charge) + Number(this.state.pricingBody.destination.charge);
    let body = {
      price: totalPrice,
      sales_query_id
    };

    api.submitEnterPrice(body)
      .then(res => {

          this.setState((prevState) => ({
            ...prevState,
            allData: [
              ...prevState.allData.slice(0, this.state.currentEditingKey),
              ...prevState.allData.slice(this.state.currentEditingKey + 1)
            ],
            data: [
              ...prevState.data.slice(0, this.state.currentEditingKey),
              ...prevState.data.slice(this.state.currentEditingKey + 1)
            ],
            badge: {
              ...prevState.badge,
              pending: status === 'new' ? badge.pending - 1 : badge.pending,
              entered: badge.entered + 1,
              revised: status === 'revision' ? badge.revised - 1 : badge.revised,
            }
          }), () => {
            this.setState({
              open: false,
              openPricingModal: false,
              price: '',
              pricingBody: {
                origin: {
                  incoterms: 'EXW',
                  charge: '',
                  remarks: '',
                },
                shipping: {
                  mode: 'SEA',
                  incoterms: 'EXW',
                  charge: '',
                  remarks: '',
                },
                destination: {
                  from: '',
                  to: '',
                  mode: 'RAIL',
                  item: 'DIRECT',
                  charge: '',
                  remarks: '',
                },
                total: ''
              }
            });
          });

        }
      )
      .catch(err => {
      });

  };

  handleChangeNestedFields = () => {
  };

  handleChangeDoubleNestedFields = () => {
  };

  handleChangeFields = (val, key1, key2) => {
    if (key2) {
      this.setState((prevState) => ({
        ...prevState,
        pricingBody: {
          ...prevState.pricingBody,
          [key1]: {
            ...prevState.pricingBody[key1],
            [key2]: val
          }
        }
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        pricingBody: {
          ...prevState.pricingBody,
          [key1]: val
        }
      }));
    }
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

    const { columns, data } = this.state;

    const options = {
      filterType: 'checkbox',
    };

    const { value, valueDialog } = this.state;
    const tradeLaneType = this.state.currentEditingItem.trade_lane.trade_lane_type;

    let totalPrice = Number(this.state.pricingBody.origin.charge) + Number(this.state.pricingBody.shipping.charge) + Number(this.state.pricingBody.destination.charge);

    return (
      <div>
        <div>
          <div className={classes.rootTable}>
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
                  <Tab label="Air" icon={<AirplaneIcon/>}/>
                  <Tab label="Sea" icon={<SeaIcon/>}/>
                  <Tab label="Inland" icon={<RoadIcon/>}/>
                </Tabs>
              </AppBar>
            </div>

            {/*table start*/}
            <div className={classes.table}>
              <div className={classes.toggleContainer}>
                <ToggleButtonGroup value={this.state.status}
                                   exclusive
                                   onChange={this.handleChangeStatus}>
                  <ToggleButton value="new"
                                className={classes.toggleButtonGroupMain}
                                style={{ padding: '4px 25px' }}
                  >
                    <Tooltip title="New">
                      <Badge color="secondary"
                             classes={{ badge: classes.badge }}
                             badgeContent={this.state.badge.pending}
                             className={classNames(classes.margin)}
                             max={9}
                      >
                        <NewIcon/>
                      </Badge>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="pending"
                                style={{ padding: '4px 25px' }}
                  >
                    <Tooltip title="Sent">
                      <Badge color="secondary"
                             classes={{ badge: classes.badge }}
                             badgeContent={this.state.badge.entered}
                             className={classes.margin}
                             max={9}
                      >
                        <PendingIcon/>
                      </Badge>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="revision"
                                style={{ padding: '4px 25px' }}
                  >
                    <Tooltip title="Revision">
                      <Badge color="secondary"
                             classes={{ badge: classes.badge }}
                             badgeContent={this.state.badge.revised}
                             className={classes.margin}
                             max={9}
                      >
                        <RevisionIcon/>
                      </Badge>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="completed"
                                style={{ padding: '4px 25px' }}
                  >
                    <Tooltip title="Approved">
                      <Badge color="secondary"
                             classes={{ badge: classes.badge }}
                             badgeContent={this.state.badge.approved}
                             className={classes.margin}
                             max={9}
                      >
                        <CheckCircleIcon/>
                      </Badge>
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              {this.state.loading ?
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
                :
                data.length !== 0 ?
                  <MUIDataTable
                    title={this.state.value === 0 ? 'AIR' :
                      this.state.value === 1 ? 'SEA' : 'INLAND'}
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
            {/*table end*/}


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
                Details/Invoice
              </Typography>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
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


            {/*Price details*/}
            <Grid container spacing={16} style={{ marginTop: 25 }}>

              <Grid item md={12} xs={12}>
                <Paper className={classNames(classes.paper, classes.singleItem)}>
                  <ul className={classes.allIcons} style={{ marginBottom: 0 }}>
                    <li style={{ width: '25%' }}>
                      <Typography variant="caption"><strong>Origin Charges:</strong></Typography>

                      <FormControl fullWidth style={{
                        marginTop: -20,
                        marginLeft: 15
                      }}>
                        <InputLabel htmlFor="adornment-amount">Incoterms</InputLabel>
                        <Select
                          value={this.state.pricingBody.origin.incoterms}
                          onChange={(e) => this.handleChangeFields(e.target.value, 'origin', 'incoterms')}
                          input={<Input name="age" id="age-helper"/>}
                        >
                          <MenuItem value='EXW'>EXW</MenuItem>
                          <MenuItem value='CPT'>CPT</MenuItem>
                          <MenuItem value='CIF'>CIF</MenuItem>
                        </Select>
                      </FormControl>
                    </li>
                    <li style={{ width: '25%' }}>

                      <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="adornment-amount">Origin Charges</InputLabel>
                        <Input
                          id="adornment-amount"
                          startAdornment={<InputAdornment position="start">NRs.</InputAdornment>}
                          className={classNames(classes.marginBottom20, 'no-up-down-arrow')}
                          value={this.state.pricingBody.origin.charge}
                          type="number"
                          onChange={(e) => this.handleChangeFields(e.target.value, 'origin', 'charge')}
                        />
                      </FormControl>
                    </li>
                    <li style={{ width: '50%' }}>
                      <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="adornment-amount">Remarks</InputLabel>
                        <Input
                          id="adornment-amount"
                          className={classNames(classes.marginBottom20, 'no-up-down-arrow')}
                          value={this.state.pricingBody.origin.remarks}
                          onChange={(e) => this.handleChangeFields(e.target.value, 'origin', 'remarks')}
                        />
                      </FormControl>
                    </li>
                  </ul>

                  <ul className={classes.allIcons} style={{ marginBottom: 0 }}>
                    <li style={{ width: '25%' }}>
                      <Typography variant="caption"><strong>Shipping Charges:</strong></Typography>

                      <FormControl fullWidth style={{
                        marginTop: -20,
                        marginLeft: 35,
                        marginRight: 15
                      }}>
                        <InputLabel htmlFor="adornment-amount">Mode</InputLabel>
                        <Select
                          value={this.state.pricingBody.shipping.mode}
                          onChange={(e) => this.handleChangeFields(e.target.value, 'shipping', 'mode')}
                          input={<Input name="age" id="age-helper"/>}
                        >
                          <MenuItem value="AIR">Air</MenuItem>
                          <MenuItem value="SEA">Sea</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth style={{ marginTop: -20 }}>
                        <InputLabel htmlFor="adornment-amount">Incoterms</InputLabel>
                        <Select
                          value={this.state.pricingBody.shipping.incoterms}
                          onChange={(e) => this.handleChangeFields(e.target.value, 'shipping', 'incoterms')}
                          input={<Input name="shipping_incoterm" id="shipping-incoterm-helper"/>}
                        >
                          <MenuItem value='EXW'>EXW</MenuItem>
                          <MenuItem value='CPT'>CPT</MenuItem>
                          <MenuItem value='CIF'>CIF</MenuItem>
                        </Select>
                      </FormControl>
                    </li>
                    <li style={{ width: '25%' }}>

                      <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="adornment-amount">Shipping Charges</InputLabel>
                        <Input
                          id="adornment-amount"
                          startAdornment={<InputAdornment position="start">NRs.</InputAdornment>}
                          className={classNames(classes.marginBottom20, 'no-up-down-arrow')}
                          value={this.state.pricingBody.shipping.charge}
                          onChange={(e) => this.handleChangeFields(e.target.value, 'shipping', 'charge')}
                          type="number"
                        />
                      </FormControl>
                    </li>
                    <li style={{ width: '50%' }}>
                      <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="adornment-amount">Remarks</InputLabel>
                        <Input
                          id="adornment-amount"
                          className={classNames(classes.marginBottom20, 'no-up-down-arrow')}
                          value={this.state.pricingBody.shipping.remarks}
                          onChange={(e) => this.handleChangeFields(e.target.value, 'shipping', 'remarks')}
                        />
                      </FormControl>
                    </li>
                  </ul>

                  <ul className={classes.allIcons} style={{ marginBottom: 0 }}>
                    <li style={{ width: '50%' }}>
                      <Typography variant="caption"><strong>Destination Charges:</strong></Typography>

                      <Typography variant="caption" style={{ marginLeft: 15 }}>
                        {this.state.currentEditingItem.transport_city_from.city ?
                        'From ' + this.state.currentEditingItem.transport_city_from.city
                        :
                        null
                      }
                      </Typography>

                      {/*<FormControl style={{
                          marginTop: -20,
                          marginLeft: 15,
                          marginRight: 15,
                          width: 150
                        }}>
                          <InputLabel htmlFor="adornment-amount">From</InputLabel>
                          <Select
                            value={this.state.pricingBody.destination.from}
                            onChange={(e) => this.handleChangeFields(e.target.value, 'destination', 'from')}
                            input={<Input name="age" id="age-helper"/>}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value='Kathmandu'>Kathmandu</MenuItem>
                            <MenuItem value='Butwal'>Butwal</MenuItem>
                          </Select>
                        </FormControl>*/}

                      <FormControl style={{
                        marginTop: -20,
                        marginLeft: 15,
                        marginRight: 15,
                        width: 150
                      }}>
                        <InputLabel htmlFor="adornment-amount">Mode</InputLabel>
                        <Select
                          value={this.state.pricingBody.destination.mode}
                          onChange={(e) => this.handleChangeFields(e.target.value, 'destination', 'mode')}
                          input={<Input name="age" id="age-helper"/>}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="RAIL">Rail</MenuItem>
                          <MenuItem value="ROAD">Road</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl style={{
                        marginTop: -20,
                        marginLeft: 15,
                        marginRight: 15,
                        width: 150
                      }}>
                        <InputLabel htmlFor="adornment-amount">Type</InputLabel>
                        <Select
                          value={this.state.pricingBody.destination.item}
                          onChange={(e) => this.handleChangeFields(e.target.value, 'destination', 'item')}
                          input={<Input name="age" id="age-helper"/>}
                        >
                          <MenuItem value="DIRECT">Direct</MenuItem>
                          <MenuItem value="DYE_STUFF">Dye-stuff</MenuItem>
                        </Select>
                      </FormControl>


                      <Typography variant="caption" style={{ marginLeft: 15 }}>
                        {this.state.currentEditingItem.transport_city_to.city ?
                          'Till ' + this.state.currentEditingItem.transport_city_to.city
                          :
                          null
                        }
                      </Typography>


                      {/*<FormControl style={{
                          marginTop: -20,
                          marginLeft: 15,
                          marginRight: 15,
                          width: 150
                        }}>
                          <InputLabel htmlFor="adornment-amount">To</InputLabel>
                          <Select
                            value={this.state.pricingBody.destination.to}
                            onChange={(e) => this.handleChangeFields(e.target.value, 'destination', 'to')}
                            input={<Input name="age" id="age-helper"/>}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value='Kathmandu'>Kathmandu</MenuItem>
                            <MenuItem value='Butwal'>Butwal</MenuItem>
                          </Select>
                        </FormControl>*/}

                      <FormControl className={classes.margin} style={{marginLeft: 10}}>
                        <InputLabel htmlFor="adornment-amount">Destination Charges</InputLabel>
                        <Input
                          id="adornment-amount"
                          startAdornment={<InputAdornment position="start">NRs.</InputAdornment>}
                          className={classNames(classes.marginBottom20, 'no-up-down-arrow')}
                          value={this.state.pricingBody.destination.charge}
                          onChange={(e) => this.handleChangeFields(e.target.value, 'destination', 'charge')}
                          type="number"
                        />
                      </FormControl>

                    </li>
                    <li style={{ width: '50%' }}>
                      <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="adornment-amount">Remarks</InputLabel>
                        <Input
                          id="adornment-amount"
                          className={classNames(classes.marginBottom20, 'no-up-down-arrow')}
                          value={this.state.pricingBody.destination.remarks}
                          onChange={(e) => this.handleChangeFields(e.target.value, 'destination', 'remarks')}
                        />
                      </FormControl>
                    </li>
                  </ul>

                  <ul className={classes.allIcons} style={{ marginBottom: 0 }}>
                    <li style={{ width: '33%' }}>

                      <Typography variant="caption"><strong>Total:</strong></Typography>


                      <FormControl fullWidth className={classes.margin}
                                   style={{
                                     marginLeft: 50
                                   }}
                      >
                        <InputLabel htmlFor="adornment-amount">Total</InputLabel>
                        <Input
                          id="adornment-amount"
                          startAdornment={<InputAdornment position="start">NRs.</InputAdornment>}
                          className={classNames(classes.marginBottom20, 'no-up-down-arrow')}
                          value={totalPrice}
                          type="number"
                          onChange={(e) => {
                          }}
                          // onChange={(e) => this.handleChangeFields(e.target.value, 'total')}
                          disabled
                        />
                      </FormControl>
                    </li>
                  </ul>

                  {this.state.status === "revision" || this.state.status === "new" ?
                    <Grid item xs={8} alignContent="right">
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          this.setState({
                            openPricingModal: true,
                            // currentSubmission: 'revision'
                          });
                        }}
                      >Submit</Button>
                    </Grid>
                    :
                    null
                  }

                </Paper>
              </Grid>

            </Grid>
            {/*End Price details*/}


          </PapperBlock>

        </Dialog>

        <Dialog
          open={this.state.openPricingModal}
          onClose={() => {
            this.setState({
              openPricingModal: false
            });
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This price will be sent to sales department. You wont be able to edit this price until it is sent for
              revision
              <Typography variant="h6">
                <strong>Total: </strong> {Number(this.state.pricingBody.origin.charge) + Number(this.state.pricingBody.shipping.charge) + Number(this.state.pricingBody.destination.charge)}
              </Typography>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({
              openPricingModal: false
            })} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmitPriceEntered} color="secondary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

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
