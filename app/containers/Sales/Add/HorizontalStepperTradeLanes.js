import 'antd/dist/antd.css';
import '../styles/main.css';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Type from 'dan-styles/Typography.scss';
import jsonp from 'fetch-jsonp';
import ModeOfTransport from './ModeOfTransport';
import ImportExport from './ImportExport';
import TradeLanesButtons from './TradeLanesButtons';
import CustomAndTransportButtons from './CustomAndTransportButtons';


import api from 'dan-api/remote-api/index';


import {
  Icon, Select,
  Form, Input, Tooltip, Cascader, Row, Col, Checkbox, Button as ButtonAntd, AutoComplete,
} from 'antd';
import querystring from 'querystring';

const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp('https://api-dallotech.herokuapp.com/api/v1/get-customer-names?project=flashfreightmock&method=GET&status=200&url=/api/v1/get-customer-names')
      .then(response => {
        response.json();
      })
      .then((d) => {
        if (currentValue === value) {
          const result = d;
          const data = [];
          result.forEach((r) => {
            data.push({
              value: r[0],
              text: r[0],
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}


const styles = theme => ({
  root: {
    width: '100%',
    minHeight: '500px'
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  selectCustomer: {
    width: '80%',
    marginTop: 50,
    marginBottom: 25,
  },
  singleContent: {
    textAlign: 'center'
  }
});

function getSteps() {
  return ['Select Trade Lane', 'Custom Clearance', 'Transport Fee'];
}

class HorizontalStepperBasicInformation extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    activeStep: 0,
    altLabel: true,
    skipped: new Set(),
    data: [],
    value: undefined,
    nameOfButton: '',
    activeTradeLaneSection: 'D2D',
    isTransportFeeRequired: true,
    trade_lane: {
      trade_lane_type: 'DOOR_TO_DOOR',
      origin_ware_house_id: 1,
      loading_port: 'India',
      discharge_port: 'Nepal',
      destination_ware_house_id: 2
    },
    warehouses: [{
      id: '1',
      name: 'lalitpur'
    }],
    transportCities: [{
      id: '',
      name: 'none'
    }]
  };

  componentDidMount() {
    api.getFakeCustomerNames()
      .then(result => {
      });

    api.getSuggestion('ware_houses')
      .then(result => {
        this.setState({
          warehouses: result
        });
      });

    api.getSuggestion('transport_cities')
      .then((res) => {
        this.setState({
          transportCities: res
        });
      });
  }

  handleNext = (section, yesOrNo) => {
    if (section === 'TRANSPORT') {
      this.setState({
        isTransportFeeRequired: yesOrNo === 'YES'
      }, () => {
        this.props.finalJsonMaker(null, 'transport_city_id');
      });
      return;
    } else if (section === 'CUSTOM') {
      this.props.finalJsonMaker(yesOrNo === 'YES', 'custom_clearance');
    }


    const { activeStep } = this.state;

    if (activeStep === 2) {
      this.props.changeActiveTab('EXTRA_INFORMATION');
    }


    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleSkip = () => {
    const { activeStep, skipped } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error('You can\'t skip a step that isn\'t optional.');
    }
    const skippedConst = new Set(skipped.values());
    skipped.add(activeStep);
    this.setState({
      activeStep: activeStep + 1,
      skipped: skippedConst,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  isStepOptional = step => (step === 1);

  isNextRequired = step => (step === 0 || step === 2);

  isStepSkipped(step) {
    const { skipped } = this.state;
    return skipped.has(step);
  }

  handleSearch = (value) => {
    api.getFakeCustomerNames()
      .then(result => {
        value = value.toLowerCase();
        let data = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i].toLowerCase()
            .includes(value)) {
            data.push(result[i]);
          }
        }
        this.setState({
          data: data
        });
      });
    // fetch(value, data => this.setState({ data }));
  };

  handleChangeSearchUser = (value) => {
    this.setState({ value });
  };

  getButtonClickAction = (mode, key) => {
    this.setState({
      activeTradeLaneSection: mode
    });
  };

  handleChangeTransportFee = (val) => {
    this.props.finalJsonMaker(val, 'transport_city_id');
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <TradeLanesButtons getButtonClickAction={this.getButtonClickAction}
                                  handleNext={this.handleNext}
        />;
      case 1:
        return <div>
          <h1 style={{ marginTop: '40px' }}>Custom Clearance</h1>
          <CustomAndTransportButtons type={'customs'}
                                     handleNext={(yesOrNo) => this.handleNext('CUSTOM', yesOrNo)}
          />
        </div>;
      case 2:
        return <div>
          <h1 style={{ marginTop: '40px' }}>Transport</h1>
          <CustomAndTransportButtons type={'transport'}
                                     handleNext={(yesOrNo) => this.handleNext('TRANSPORT', yesOrNo)}
          />

          {this.state.isTransportFeeRequired ?
            <div>
              <Form.Item
                label="From"
              >
                <Select defaultValue={this.state.transportCities[0].id}
                        style={{ width: '200px' }}
                        onChange={(val) => this.handleChangeTransportFee(val)}
                >
                  {this.state.transportCities.map((obj, i) => {
                    return (
                      <Option key={i} value={obj.id}>{obj.name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="To"
              >
                <Select defaultValue={this.state.transportCities[0].id}
                        style={{ width: '200px' }}
                        onChange={(val) => this.handleChangeTransportFee(val)}
                >
                  {this.state.transportCities.map((obj, i) => {
                    return (
                      <Option key={i} value={obj.id}>{obj.name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            :
            null
          }
        </div>;
      default:
        return 'Unknown step Content';
    }
  };


  handleNextSection = (step) => {
    this.props.changeActiveTab(step);
  };

  handleAddItem = () => {
  };


  handleChangeTradeLaneSelect = (val, key) => {
    const { activeTradeLaneSection } = this.state;
    this.setState(prevState => ({
      ...prevState,
      trade_lane: {
        ...prevState.trade_lane,
        [key]: val
      }
    }), () => {
      let finalJson;
      const { trade_lane } = this.state;
      switch (activeTradeLaneSection) {
        case 'D2D':
          finalJson = {
            trade_lane_type: 'DOOR_TO_DOOR',
            origin_ware_house_id: trade_lane.origin_ware_house_id,
            loading_port: trade_lane.loading_port,
            discharge_port: trade_lane.discharge_port,
            destination_ware_house_id: trade_lane.destination_ware_house_id
          };
          break;
        case 'D2P':
          finalJson = {
            trade_lane_type: 'DOOR_TO_PORT',
            origin_ware_house_id: trade_lane.origin_ware_house_id,
            loading_port: trade_lane.loading_port,
            discharge_port: trade_lane.discharge_port,
            destination_ware_house_id: null
          };
          break;
        case 'P2D':
          finalJson = {
            trade_lane_type: 'PORT_TO_DOOR',
            origin_ware_house_id: null,
            loading_port: trade_lane.loading_port,
            discharge_port: trade_lane.discharge_port,
            destination_ware_house_id: trade_lane.destination_ware_house_id
          };
          break;
        case 'P2P':
          finalJson = {
            trade_lane_type: 'PORT_TO_PORT',
            origin_ware_house_id: null,
            loading_port: trade_lane.loading_port,
            discharge_port: trade_lane.discharge_port,
            destination_ware_house_id: null
          };
          break;
        default:
          break;
      }

      this.props.finalJsonMaker(finalJson, 'trade_lane');
    });
  };


  GetFormTradeLanes = (step) => {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    switch (step) {
      case 'D2D':
        return (
          <div>
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="single-form-trade-lanes">
              <Form.Item
                label="Select Origin Warehouse"
              >
                <Select defaultValue={this.state.warehouses[0].id}
                        onChange={(val) => this.handleChangeTradeLaneSelect(val, 'origin_ware_house_id')}
                >
                  {this.state.warehouses.map((obj, i) => {
                    return (
                      <Option key={i} value={obj.id}>{obj.name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Select Via loading port"
              >
                <Select defaultValue="Chennai Port"
                        onChange={(val) => this.handleChangeTradeLaneSelect(val, 'loading_port')}
                >
                  <Option value="Chennai Port">Chennai Port</Option>
                  <Option value="Navi Mumbai">Navi Mumbai</Option>
                  <Option value="Visakhapatnam Port">Visakhapatnam Port</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Select Discharge Port"
              >
                <Select defaultValue="Chennai Port"
                        onChange={(val) => this.handleChangeTradeLaneSelect(val, 'discharge_port')}
                >
                  <Option value="Chennai Port">Chennai Port</Option>
                  <Option value="Navi Mumbai">Navi Mumbai</Option>
                  <Option value="Visakhapatnam Port">Visakhapatnam Port</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Select Destination Warehouse"
              >
                <Select defaultValue={this.state.warehouses[0].id}
                        onChange={(val) => this.handleChangeTradeLaneSelect(val, 'origin_ware_house_id')}
                >
                  {this.state.warehouses.map((obj, i) => {
                    return (
                      <Option key={i} value={obj.id}>{obj.name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Form>
          </div>
        );
      case 'D2P':
        return (
          <div>
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="single-form-trade-lanes">
              <Form.Item
                label="Select Origin Warehouse"
              >
                <Select defaultValue={this.state.warehouses[0].id}
                        onChange={(val) => this.handleChangeTradeLaneSelect(val, 'origin_ware_house_id')}
                >
                  {this.state.warehouses.map((obj, i) => {
                    return (
                      <Option key={i} value={obj.id}>{obj.name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Select Via loading port"
              >
                <Select defaultValue="Chennai Port"
                        onChange={(val) => this.handleChangeTradeLaneSelect(val, 'loading_port')}
                >
                  <Option value="Chennai Port">Chennai Port</Option>
                  <Option value="Navi Mumbai">Navi Mumbai</Option>
                  <Option value="Visakhapatnam Port">Visakhapatnam Port</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Select Discharge Port"
              >
                <Select defaultValue="Chennai Port"
                        onChange={(val) => this.handleChangeTradeLaneSelect(val, 'discharge_port')}
                >
                  <Option value="Chennai Port">Chennai Port</Option>
                  <Option value="Navi Mumbai">Navi Mumbai</Option>
                  <Option value="Visakhapatnam Port">Visakhapatnam Port</Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        );
      case 'P2D':
        return (
          <div>
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="single-form-trade-lanes">
              <Form.Item
                label="Select Via loading port"
              >
                <Select defaultValue="Chennai Port"
                        onChange={(val) => this.handleChangeTradeLaneSelect(val, 'loading_port')}
                >
                  <Option value="Chennai Port">Chennai Port</Option>
                  <Option value="Navi Mumbai">Navi Mumbai</Option>
                  <Option value="Visakhapatnam Port">Visakhapatnam Port</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Select Discharge Port"
              >
                <Select defaultValue="Chennai Port"
                        onChange={(val) => this.handleChangeTradeLaneSelect(val, 'discharge_port')}
                >
                  <Option value="Chennai Port">Chennai Port</Option>
                  <Option value="Navi Mumbai">Navi Mumbai</Option>
                  <Option value="Visakhapatnam Port">Visakhapatnam Port</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Select Destination Warehouse"
              >
                <Select defaultValue={this.state.warehouses[0].id}
                        onChange={(val) => this.handleChangeTradeLaneSelect(val, 'origin_ware_house_id')}
                >
                  {this.state.warehouses.map((obj, i) => {
                    return (
                      <Option key={i} value={obj.id}>{obj.name}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Form>
          </div>
        );
      case 'P2P':
        return (
          <div>
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="single-form-trade-lanes">
              <Form.Item
                label="Select Via loading port"
              >
                <Select defaultValue="Chennai Port"
                        onChange={(val) => this.handleChangeTradeLaneSelect(val, 'loading_port')}
                >
                  <Option value="Chennai Port">Chennai Port</Option>
                  <Option value="Navi Mumbai">Navi Mumbai</Option>
                  <Option value="Visakhapatnam Port">Visakhapatnam Port</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Select Discharge Port"
              >
                <Select defaultValue="Chennai Port"
                        onChange={(val) => this.handleChangeTradeLaneSelect(val, 'discharge_port')}
                >
                  <Option value="Chennai Port">Chennai Port</Option>
                  <Option value="Navi Mumbai">Navi Mumbai</Option>
                  <Option value="Visakhapatnam Port">Visakhapatnam Port</Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        );
      default:
        return (
          <div>Nothing selected</div>
        );

    }
  };

  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, altLabel, activeTradeLaneSection } = this.state;

    return (
      <div className={classes.root}>
        {/*
        <FormGroup row>
          <FormControlLabel
            control={(
              <Switch
                checked={altLabel}
                onChange={this.handleChange('altLabel')}
                value="altLabel"
              />
            )}
            label="Alternative Design"
          />
        </FormGroup>
*/}
        <Divider/>
        <Stepper activeStep={activeStep} alternativeLabel={altLabel}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepOptional(index)) {
              labelProps.optional =
                <Typography className={altLabel ? Type.textCenter : ''} variant="caption">Optional</Typography>;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Divider/>
        <div>
          <div className={classes.singleContent}>
            {this.getStepContent(activeStep)}
            <div>
              {activeStep === 0 ?
                this.GetFormTradeLanes(activeTradeLaneSection)
                :
                null
              }
              <Button
                disabled={activeStep === 0}
                onClick={this.handleBack}
                className={classes.button}
              >
                Back
              </Button>


              {this.isNextRequired(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(withStyles(styles)(HorizontalStepperBasicInformation));
