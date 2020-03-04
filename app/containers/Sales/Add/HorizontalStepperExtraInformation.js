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
import classNames from 'classnames';
import ModeOfTransport from './ModeOfTransport';
import ImportExport from './ImportExport';
import TradeLanesButtons from './TradeLanesButtons';
import CustomAndTransportButtons from './CustomAndTransportButtons';


import api from 'dan-api/remote-api/index';


import {
  Icon, Select,
  Form, Input, Tooltip, Cascader, Row, Col, Checkbox, Button as ButtonAntd, AutoComplete,
} from 'antd';
import SelectMaterial from '@material-ui/core/Select';

import querystring from 'querystring';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputMaterial from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';

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
    ...theme.typography.button,
    backgroundColor: "#b2dfdb",
    padding: theme.spacing.unit,
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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  sup: {
    top: '-1em'
  }
});

function getSteps() {
  return ['Equipment', 'Packaging and Free Time', 'Remarks'];
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
    valueSize: '20\'',
    valueContainer: 'dry',
    valueSpecialContainerType: 'Open Top',
    valueGauge: 'In Gauge',
    valueHazardous: false,

    free_time: '',
    weight: '',
    volume: '',
    packaging_type: ''
  };

  componentDidMount() {
    api.getFakeCustomerNames()
      .then(result => {
      });
  }

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    if(activeStep === 2){
      api.submitAddSalesQuery(this.props.finalJson)
        .then(res => {
        });
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

  isNextRequired = step => (step === 0 || step === 1 || step === 2);

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

  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.props.finalJsonMaker(event.target.value, event.target.name);
    });
  };

  getStepContent = (step) => {
    const { classes } = this.props;
    const {weight, volume} = this.state;
    switch (step) {
      case 0:
        return <div>Select equipment</div>;
      case 1:
        const { packaging_type, free_time } = this.state;
        return <div>


          <Grid container spacing={24}>

            <Grid item xs={6}>
              <h1 style={{ marginTop: '40px' }}>Packaging</h1>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="packaging-simple">Equipment</InputLabel>
                <SelectMaterial
                  value={packaging_type}
                  onChange={this.handleChangeSelect}
                  inputProps={{
                    name: 'packaging_type',
                    id: 'packaging-simple',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
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
            <Grid item xs={6}>
              <h1 style={{ marginTop: '40px' }}>Free Time</h1>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Free Time</InputLabel>
                <SelectMaterial
                  value={free_time}
                  onChange={this.handleChangeSelect}
                  inputProps={{
                    name: 'free_time',
                    id: 'freeTime-simple',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
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
            <Grid item xs={6}>
              <h1 style={{ marginTop: '40px' }}>Weight</h1>
              <FormControl
                className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                aria-describedby="weight-helper-text"
              >
                <InputMaterial
                  id="adornment-weight"
                  value={weight}
                  onChange={(e) => {
                    let value = e.target.value;
                    this.setState({
                      weight: value
                    }, () => {
                      this.props.finalJsonMaker(value, "weight")
                    })}
                  }
                  endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                  inputProps={{
                    'aria-label': 'Weight',
                  }}
                />
                <FormHelperText id="weight-helper-text"/>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <h1 style={{ marginTop: '40px' }}>Volume</h1>
              <FormControl
                className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                aria-describedby="weight-helper-text"
              >
                <InputMaterial
                  id="adornment-weight"
                  value={volume}
                  onChange={(e) => {
                    let value = e.target.value;
                    this.setState({
                      volume: value
                    }, () => {
                      this.props.finalJsonMaker(value, "volume")
                    })}
                  }
                  endAdornment={<InputAdornment position="end">m<sup className={classes.sup}>3</sup></InputAdornment>}
                  inputProps={{
                    'aria-label': 'Weight',
                  }}
                />
                <FormHelperText id="weight-helper-text"/>
              </FormControl>
            </Grid>
          </Grid>
        </div>;
      case 2:
        return <div>
          <h1 style={{ marginTop: '40px' }}>Remarks</h1>
          <TextField
            id="outlined-full-width"
            label="Remarks"
            style={{
              margin: 8,
              width: '60%'
            }}
            multiline
            rows="4"
            placeholder="Enter any remarks"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              this.props.finalJsonMaker(e.target.value, "remarks")
            }}
          />
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

  handleChangeRadioButtons = (val, state) => {
    this.setState({ ['value' + state]: val }, () => {
      let finalJson = {
        container_size: this.state.valueSize,
        container_type: this.state.valueContainer,
        sc_type: this.state.valueSpecialContainerType,
        gauge_type: this.state.valueGauge,
        is_hazardous: this.state.valueHazardous
      };
      if (this.state.valueContainer !== 'SPECIAL_CONTAINER') {
        finalJson['sc_type'] = null;
        finalJson['gauge_type'] = null;
      }
      if (this.state.valueContainer !== 'dry') {
        finalJson['is_hazardous'] = false;
      }
      this.props.finalJsonMaker(finalJson, "equipment_detail");
    });
  };

  handleChangeSize = event => {
    this.setState({ valueSize: event.target.value });
  };


  handleChangeContainer = event => {
    this.setState({ valueContainer: event.target.value });
  };

  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, altLabel, activeTradeLaneSection, valueSize, selectedValue, valueContainer, valueGauge, valueSpecialContainerType } = this.state;

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
          {activeStep === steps.length ? (
            <div>

              <Grid
                container
                alignItems="flex-start"
                justify="space-around"
                direction="row"
                spacing={24}
                style={{
                  textAlign: 'center',
                  marginTop: '50px'
                }}
              >
                <Grid
                  item
                  md={6}
                  className={classes.demo}
                >
                  <Typography className={classes.instructions}>
                    Sales Query has been successfully added!
                  </Typography>
                  {/*<Button onClick={this.handleReset} className={classes.button}>
                    Reset
                  </Button>*/}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.history.push({ pathname: '/app/sales' })}
                    className={classes.button}
                  >
                    Go to Sales
                  </Button>
                </Grid>
              </Grid>

            </div>
          ) : (
            <div className={classes.singleContent}>
              {activeStep === 0 ? null : this.getStepContent(activeStep)}
              {activeStep === 0 ?
                <div>
                  <Grid
                    container
                    alignItems="flex-start"
                    justify="space-around"
                    direction="row"
                    spacing={24}
                    style={{
                      textAlign: 'left',
                      marginTop: '50px'
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
                                value={valueSize}
                                onChange={(event) => this.handleChangeRadioButtons(event.target.value, 'Size')}
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
                                value={valueContainer}
                                onChange={(event) => this.handleChangeRadioButtons(event.target.value, 'Container')}
                              >
                                <FormControlLabel value="DRY" control={<Radio/>} label="Dry"/>
                                <FormControlLabel value="REFER" control={<Radio/>} label="Refeer"/>
                                <FormControlLabel value="SPECIAL_CONTAINER" control={<Radio/>}
                                                  label="Special Container"/>
                              </RadioGroup>
                            </FormControl>

                            {this.state.valueContainer === 'DRY' ?
                              <FormGroup row>
                                <FormControlLabel
                                  control={(
                                    <Switch
                                      onChange={(name, event) => {
                                        this.handleChangeRadioButtons(event, 'Hazardous')
                                      }}
                                      // onChange={this.handleChange('is_hazardous')}
                                      value="is_hazardous"
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


                  {this.state.valueContainer === 'SPECIAL_CONTAINER' ?
                    <Grid
                      container
                      alignItems="flex-start"
                      justify="space-around"
                      direction="row"
                      style={{
                        textAlign: 'left',
                        marginTop: '50px'
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
                                  aria-label="gender"
                                  name="specialContainerType"
                                  className={classes.group}
                                  value={valueSpecialContainerType}
                                  onChange={(event) => this.handleChangeRadioButtons(event.target.value, 'SpecialContainerType')}
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
                                  value={valueGauge}
                                  onChange={(event) => this.handleChangeRadioButtons(event.target.value, 'Gauge')}
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
                :
                null
              }
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                {/*{this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                     onClick={this.handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}*/}


                {this.isNextRequired(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Form.create()(withStyles(styles)(HorizontalStepperBasicInformation)));
