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


import api from 'dan-api/remote-api/index';


import { Select } from 'antd';
import querystring from 'querystring';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Option = Select.Option;

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
  return ['Select Customer', 'Select Mode of Transport', 'Shipment Direction'];
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
    nameOfButton: ""
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

  isNextRequired = step => (step === 0);

  isStepSkipped(step) {
    const { skipped } = this.state;
    return skipped.has(step);
  }

  handleSearch = (value) => {
    api.getSuggestion('customers')
      .then(result => {
        value = value.toLowerCase();
        let data = [];
        for (let i = 0; i < result.length; i++) {
          if (result[i].name.toLowerCase()
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
    this.props.finalJsonMaker(value, "customer_id");
  };

  getButtonClickAction = (section, key, jsonKey) => {
    this.props.finalJsonMaker(key, jsonKey);
    if(section === "IMPORT_EXPORT"){
      this.handleNextSection("TRADE_LANES")
    } else {
      this.handleNext();
    }
  };

  getStepContent = (step) => {
    const { classes } = this.props;
    const options = this.state.data.map((d, i) => <Option key={d.id}>{d.name}</Option>);

    switch (step) {
      case 0:
        return <Select
          showSearch
          value={this.state.value}
          placeholder="Select Customer"
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={this.handleSearch}
          onChange={this.handleChangeSearchUser}
          notFoundContent={null}
          className="select-customer"
          style={{
            marginTop: 25,
            marginBottom: 25
          }}
        >
          {options}
        </Select>;
      case 1:
        return <ModeOfTransport
          state={{name: "MODE_OF_TRANSPORT"}}
          getButtonClickAction={this.getButtonClickAction}
        />;
      case 2:
        return <ImportExport
          state={{name: "IMPORT_EXPORT"}}
          getButtonClickAction={this.getButtonClickAction}
        />;
      default:
        return 'Unknown step Content';
    }
  };


  handleNextSection = (step) => {
    this.props.changeActiveTab(step);
  };

  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, altLabel } = this.state;

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
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleNextSection("TRADE_LANES")}
                className={classes.button}
              >
                Go to Trade Lanes
              </Button>

            </div>
          ) : (
            <div className={classes.singleContent}>
              {this.getStepContent(activeStep)}
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch,
  );

const mapStateToProps = state => {
  let x = localStorage.getItem("persist:root");

  return {
  };
};

const smartHorizontalStepperBasicInformation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HorizontalStepperBasicInformation);

export default withStyles(styles)(smartHorizontalStepperBasicInformation);
