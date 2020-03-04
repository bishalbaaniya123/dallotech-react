import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import HorizontalStepperBasicInformation from './HorizontalStepperBasicInformation';
import HorizontalStepperTradeLanes from './HorizontalStepperTradeLanes';
import HorizontalStepperExtraInformation from './HorizontalStepperExtraInformation';
import StepperTopMenu from './StepperTopMenu';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';


class AddSales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveTab: 'BASIC_INFORMATION',
      finalJson: {
        customer_id: 1,
        transport_type: 'SEA',
        trade_lane: {
          trade_lane_type: 'PORT_TO_PORT',
          origin_ware_house_id: 1,
          loading_port: 'india',
          discharge_port: 'nepal',
          destination_ware_house_id: 2
        },
        transport_city_id: 2,
        packaging_type: 'CARTONS',
        business_type: 'IMPORT',
        equipment_detail: {
          container_size: 'INCH_20',
          container_type: 'REFER',
          sc_type: 'OPEN_TOP',
          gauge_type: 'IN_GAUGE',
          is_hazardous: true,
          packaging_type: 'WOODEN_PALLETS'
        },
        weight: 1,
        free_time: 2,
        remarks: 'user 3 adding',
        custom_clearance: true
      }
    };
  }

  finalJsonMaker = (value, key1, key2) => {
    this.setState(prevState => ({
      ...prevState,
      finalJson: {
        ...prevState.finalJson,
        [key1]: value
      }
    }))
  };

  changeActiveTab = (val) => {
    this.setState({
      currentActiveTab: val
    });
  };

  render() {
    const title = brand.name + ' - Add Sales';
    const description = brand.desc;
    const { classes } = this.props;

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description}/>
          <meta property="og:title" content={title}/>
          <meta property="og:description" content={description}/>
          <meta property="twitter:title" content={title}/>
          <meta property="twitter:description" content={description}/>
        </Helmet>
        {/*
        <PapperBlock title="Blank Page" desc="Some text description">
          Content
        </PapperBlock>
*/}
        <div>
          <StepperTopMenu currentActiveTab={this.state.currentActiveTab}/>
        </div>
        {this.state.currentActiveTab === 'BASIC_INFORMATION' &&
        <div>
          <HorizontalStepperBasicInformation changeActiveTab={this.changeActiveTab}
                                             finalJsonMaker={this.finalJsonMaker}/>
        </div>
        }

        {this.state.currentActiveTab === 'TRADE_LANES' &&
        <div>
          <HorizontalStepperTradeLanes changeActiveTab={this.changeActiveTab}
                                       finalJsonMaker={this.finalJsonMaker}/>
        </div>
        }

        {this.state.currentActiveTab === 'EXTRA_INFORMATION' &&
        <div>
          <HorizontalStepperExtraInformation changeActiveTab={this.changeActiveTab}
                                             finalJsonMaker={this.finalJsonMaker}
                                             finalJson={this.state.finalJson}
          />
        </div>
        }

      </div>
    );
  }
}


export default AddSales;
