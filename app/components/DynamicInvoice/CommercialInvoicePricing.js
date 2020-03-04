// ***********************************************
/*
  This is an example app without redux implementation, may little bit messy.
  If your prefer use redux architecture you can change it.
  And We recommend to following this app pattern of redux.
*/
// ***********************************************
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'dan-styles/vendors/invoice/style.css';
import { getDate } from '../../redux/helpers/dateTimeHelper';

const styles = {
  whitePaper: {
    background: '#FFF',
    color: '#000',
    minWidth: 800,
    border: '1px solid #dedede'
  }
};

const newDataTemplate = (id) => ({
  id,
  item: 'Item_' + id,
  desc: 'Description',
  price: 0,
  qty: 0,
});

class CommercialInvoice extends React.Component {
  state = {
    header: 'INVOICE',
    address: `Colmans Garments Industries (Pvt)Ltd
123 Appleseed Street
Colombo,Srilanka

Phone: 76910300076
    `,
    title: `Widget Corp.
c/o Steve Widget
    `,
    number: 'QFK-1A-FRT',
    date: getDate(),
    paid: 0,
    note: 'NET 30 Days. Finance Charge of 1.5% will be made on unpaid balances after 30 days.',
    dataTable: [
      {
        id: '1',
        item: 'Origin Charges',
        description: '-',
        price: 10000,
        remarks: 'Random remarks',
      },
      {
        id: '1',
        item: 'Origin Charges',
        description: 'This is the description section',
        price: 10000,
        remarks: 'Random remarks',
      },
    ],
    dataTableRouting: [
      {
        id: '1',
        item: 'Origin Charges',
        description: '-',
        price: 10000,
        remarks: 'Random remarks',
      },
      {
        id: '1',
        item: 'Origin Charges',
        description: 'This is the description section',
        price: 10000,
        remarks: 'Random remarks',
      },
    ],
    total: '',
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      total: nextProps.totalPrice
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeTable = (name, id) => event => {
    this.updateItem(id, { [name]: event.target.value });
  };


  updateItem(id, itemAttributes) {
    const { dataTable } = this.state;
    const index = dataTable.findIndex(x => x.id === id);
    if (index === -1) {
      console.error('Something wen\'t wrong');
    } else {
      this.setState({
        dataTable: [
          ...dataTable.slice(0, index),
          Object.assign({}, dataTable[index], itemAttributes),
          ...dataTable.slice(index + 1)
        ]
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      dataTable,
      total,
      header,
      address,
      number,
      date,
      paid,
      title,
      note,
      dataTableRouting
    } = this.state;
    let a = {
      id: '1',
      item: 'Origin Charges',
      description: '-',
      price: 10000,
      remarks: 'Random remarks',
    };


    const getRowTopThree = dataArray => {
      return (
        <tr className="item-row item-row-bordered" key={1}>
          <td className="font-bold" style={{ width: '5%' }}>
            1.
          </td>
          <td className="font-bold" style={{ width: '15%' }}>
            Origin
          </td>
          <td style={{ width: '25%' }}>
            Import
          </td>
          <td style={{ width: '25%' }}>
            Incoterm
          </td>
          <td style={{ width: '5%' }}>
            NPR
          </td>
          <td style={{ width: '25%' }}>
            10000000
          </td>
        </tr>
      );
    };

    const getRow = dataArray => {
      return dataArray.map((data, index) => (
        <tr className="item-row" key={index.toString()}>
          <td className="description">
            <textarea value={data.item} disabled/>
          </td>
          <td className="description">
            <textarea value={data.description} disabled/>
          </td>
          <td>
            <textarea value={data.price} disabled/>
          </td>
          <td>
            <textarea value={data.remarks} disabled/>
          </td>
        </tr>
      ));
    };

    const getRowRoutingDetails = dataArray => {
      return <tr className="item-row" key="1">
        <td className="description bordered-table">
          <table className="no-margin-table">
            <tr>
              <td>Country</td>
              <td>India</td>
            </tr>
            <tr>
              <td>Door</td>
              <td>India</td>
            </tr>
            <tr>
              <td>Port</td>
              <td>India</td>
            </tr>
            <tr>
              <td>Terminal</td>
              <td>India</td>
            </tr>
          </table>
        </td>
        <td className="description bordered-table">
          <table className="no-margin-table">
            <tr>
              <td>Country</td>
              <td>India</td>
            </tr>
            <tr>
              <td>Door</td>
              <td>India</td>
            </tr>
            <tr>
              <td>Port</td>
              <td>India</td>
            </tr>
            <tr>
              <td>Terminal</td>
              <td>India</td>
            </tr>
          </table>
        </td>
      </tr>;

      return dataArray.map((data, index) => (
        <tr className="item-row" key={index.toString()}>
          <td className="description">
            <textarea value={data.item} disabled/>
          </td>
          <td className="description">
            <textarea value={data.description} disabled/>
          </td>
          <td>
            <textarea value={data.price} disabled/>
          </td>
          <td>
            <textarea value={data.remarks} disabled/>
          </td>
        </tr>
      ));
    };

    return (
      <div className={classes.whitePaper}>
        <div id="page-wrap">
          <textarea id="header" value={header} disabled/>
          <div id="identity">
            <textarea id="address" value={address} disabled/>
            <div id="logo">
              <img id="image" src="/images/flashFreight/flashfreight-logo.png" alt="logo"/>
            </div>

          </div>

          <div style={{ clear: 'both' }}/>

          <div id="customer">
            <textarea id="customer-title" onChange={this.handleChange('title')} value={title}/>
            <table id="meta">
              <tbody>
              <tr>
                <td className="meta-head">Quotation number</td>
                <td><textarea disabled onChange={this.handleChange('number')} value={number}/></td>
              </tr>
              <tr>
                <td className="meta-head">Effective Date</td>
                <td><textarea disabled onChange={this.handleChange('date')} value={date}/></td>
              </tr>
              <tr>
                <td className="meta-head">Expiration Date</td>
                <td><textarea disabled onChange={this.handleChange('date')} value={date}/></td>
              </tr>
              <tr>
                <td className="meta-head">Total Amount</td>
                <td>
                  <div className="due">
                    $
                    {total}
                  </div>
                </td>
              </tr>
              </tbody>
            </table>

          </div>

          <p style={{
            marginBottom: '-15px',
            marginTop: '20px'
          }}>
            <b>Routing Details</b>
          </p>
          <table id="items">
            <thead>
            <tr>
              <th>Origin Routing</th>
              <th>Destination Routing</th>
            </tr>
            </thead>
            <tbody>
            {getRowRoutingDetails(dataTableRouting)}
            </tbody>
          </table>


          <p style={{
            marginBottom: '-15px',
            marginTop: '20px'
          }}>
            <b>Freight Items</b>
          </p>
          <table>
            <thead style={{ backgroundColor: '#eee' }}>
            <th>Pieces</th>
            <th>Commodity</th>
            <th>Package Type</th>
            <th>Weight</th>
            <th>Volume</th>
            </thead>
            <tbody>
            <td>20</td>
            <td>Medicines</td>
            <td>Flexi Bag</td>
            <td>200kg</td>
            <td>400m<sup>3</sup></td>
            </tbody>
          </table>


          <p style={{
            marginBottom: '-15px',
            marginTop: '20px'
          }}>
            <b>Charges</b>
          </p>

          <table id="items">
            <tbody>
            <tr className="item-row " key={1}>
              <td className="font-bold" style={{ width: '5%' }}>
                1.
              </td>
              <td className="font-bold" style={{ width: '15%' }}>
                Origin
              </td>
              <td style={{ width: '25%' }}>
                Import
              </td>
              <td style={{ width: '25%' }}>
                Incoterm
              </td>
              <td style={{ width: '5%' }}>
                NPR
              </td>
              <td style={{ width: '25%' }}>
                10000000
              </td>
            </tr>
            <tr className="item-row " key={2}>
              <td className="font-bold" style={{ width: '5%' }}>
                2.
              </td>
              <td className="font-bold" style={{ width: '15%' }}>
                Shipping
              </td>
              <td style={{ width: '25%' }}>
                Ocean
              </td>
              <td style={{ width: '25%' }}>
                Incoterm
              </td>
              <td style={{ width: '5%' }}>
                NPR
              </td>
              <td style={{ width: '25%' }}>
                10000000
              </td>
            </tr>
            <tr className="item-row " key={3}>
              <td className="font-bold" style={{ width: '5%' }}>
                3.
              </td>
              <td className="font-bold" style={{ width: '15%' }}>
                Destination
              </td>
              <td style={{ width: '25%' }}>
                Direct/Destuff Clearnace & Delivery
              </td>
              <td style={{ width: '25%' }}>
                Inland Haulage from ___ to ___ via ___ inocterm(air)
              </td>
              <td style={{ width: '5%' }}>
                NPR
              </td>
              <td style={{ width: '25%' }}>
                10000000
              </td>
            </tr>
            <tr className="item-row " key={4}>
              <td className="font-bold" style={{ width: '5%' }}>
                4.
              </td>
              <td className="font-bold" colSpan={2} style={{ width: '65%' }}>
                D O
              </td>
              <td style={{ width: '5%' }} colSpan={1}>
                NPR
              </td>
              <td style={{ width: '25%' }} colSpan={2}>
                10000000
              </td>
            </tr>

            <tr className="item-row " key={5}>
              <td className="font-bold" style={{ width: '5%' }}>
                5.
              </td>
              <td className="font-bold" colSpan={3} style={{ width: '65%' }}>
                Container Weighing
              </td>
              <td style={{ width: '25%' }} colSpan={2}>
                As per receipt
              </td>
            </tr>

            <tr className="item-row " key={6}>
              <td className="font-bold" style={{ width: '5%' }}>
                6.
              </td>
              <td className="font-bold" colSpan={3} style={{ width: '65%' }}>
                Container Loading/Stuffing
              </td>
              <td style={{ width: '25%' }} colSpan={2}>
                As per receipt
              </td>
            </tr>
            <tr className="item-row " key={7}>
              <td className="font-bold" style={{ width: '5%' }}>
                7.
              </td>
              <td className="font-bold" colSpan={3} style={{ width: '65%' }}>
                Detention/Demurrage/warehouse/Port Rent/CFS
              </td>
              <td style={{ width: '25%' }} colSpan={2}>
                As per receipt
              </td>
            </tr>
            <tr className="item-row " key={8}>
              <td className="font-bold" style={{ width: '5%' }}>
                8.
              </td>
              <td className="font-bold" colSpan={3} style={{ width: '65%' }}>
                Customs Duty & VAT
              </td>
              <td style={{ width: '25%' }} colSpan={2}>
                As per receipt
              </td>
            </tr>
            <tr className="item-row " key={9}>
              <td className="font-bold" style={{ width: '5%' }}>
                9.
              </td>
              <td className="font-bold" colSpan={3} style={{ width: '65%' }}>
                Custom/Transit Insurance at Kolkata (If Any)
              </td>
              <td style={{ width: '25%' }} colSpan={2}>
                As per receipt
              </td>
            </tr>
            <tr className="item-row " key={10}>
              <td className="font-bold" style={{ width: '5%' }}>
                10.
              </td>
              <td className="font-bold" colSpan={3} style={{ width: '65%' }}>
                Shipping line surcharges ( If Any)
              </td>
              <td style={{ width: '25%' }} colSpan={2}>
                As per receipt
              </td>
            </tr>
            <tr className="item-row " key={11}>
              <td className="font-bold" style={{ width: '5%' }}>
                11.
              </td>
              <td className="font-bold" colSpan={3} style={{ width: '65%' }}>
                ICP-Gate pass
              </td>
              <td style={{ width: '25%' }} colSpan={2}>
                As per receipt
              </td>
            </tr>
            <tr className="item-row " key={12}>
              <td className="font-bold" style={{ width: '5%' }}>
                12.
              </td>
              <td className="font-bold" colSpan={3} style={{ width: '65%' }}>
                Multi-form
              </td>
              <td style={{ width: '25%' }} colSpan={2}>
                As per receipt
              </td>
            </tr>
            <tr className="item-row " key={13} style={{borderBottom: 0}}>
              <td className="font-bold" style={{ width: '5%' }}>
                13.
              </td>
              <td className="font-bold" colSpan={1} style={{ width: '40%' }}>
                Trailer Detention
              </td>
              <td style={{ width: '25%' }} colSpan={2}>
                <table style={{margin: 0}}>
                  <tr style={{ width: '50%' }}>
                    <td>20'/day</td>
                  </tr>
                  <tr style={{ width: '50%' }}>
                    <td>40'/day</td>
                  </tr>
                </table>
              </td>
              <td style={{ width: '25%' }} colSpan={2}>
                <table style={{margin: 0}}>
                  <tr style={{ width: '50%' }}>
                    <td>NPR</td>
                    <td>100000</td>
                  </tr>
                  <tr style={{ width: '50%' }}>
                    <td>NPR</td>
                    <td>100000</td>
                  </tr>
                </table>
              </td>
            </tr>



            {/*<tr>
              <td colSpan="1" className="blank-last">&nbsp;</td>
              <td colSpan="2" className="total-line balance">Total Amount</td>
              <td className="total-value balance">
                <div className="due">
                  $
                  {total - paid}
                </div>
              </td>
            </tr>*/}
            </tbody>
          </table>

          <div id="terms">
            <h5>Terms</h5>
            <textarea onChange={this.handleChange('note')} value={note}/>
          </div>
        </div>
      </div>
    );
  }
}

CommercialInvoice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommercialInvoice);
