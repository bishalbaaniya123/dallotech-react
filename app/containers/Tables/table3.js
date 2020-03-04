import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { PapperBlock } from 'dan-components';
import EnhancedTableHead from 'dan-components/Tables/tableParts/TableHeader';
import EnhancedTableToolbar from 'dan-components/Tables/tableParts/TableToolbar';
import styles from 'dan-components/Tables/tableStyle-jss';

let counter = 0;
function createData(date, jobNo, consignee, shipper, originDestination, mblMawb, hblHawb, handledBy, aCHolder, containerNumber, noOfPieces,
  chargeableWeight, cbm, mode, freightTerm) {
  counter += 1;
  return {
    id: counter,
    date,
    jobNo,
    consignee,
    shipper,
    originDestination,
    mblMawb,
    hblHawb,
    handledBy,
    aCHolder,
    containerNumber,
    noOfPieces,
    chargeableWeight,
    cbm,
    mode,
    freightTerm
  };
}

class InteractiveGrid extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'date',
      selected: [],
      columnData: [
        {
          id: 'date',
          numeric: false,
          disablePadding: false,
          label: 'Date'
        }, {
          id: 'jobNo',
          numeric: false,
          disablePadding: false,
          label: 'Job No'
        }, {
          id: 'consignee',
          numeric: false,
          disablePadding: false,
          label: 'Consignee'
        }, {
          id: 'shipper',
          numeric: false,
          disablePadding: false,
          label: 'Shipper'
        }, {
          id: 'originDestination',
          numeric: false,
          disablePadding: false,
          label: 'Origin/Destination'
        },
        {
          id: 'mblMawb',
          numeric: false,
          disablePadding: false,
          label: 'MBL/MAWB'
        },
        {
          id: 'hblHawb',
          numeric: false,
          disablePadding: false,
          label: 'HBL/HAWB'
        },
        {
          id: 'handledBy',
          numeric: false,
          disablePadding: false,
          label: 'Handled By'
        },
        {
          id: 'aCHolder',
          numeric: false,
          disablePadding: false,
          label: 'A/C Holder'
        },
        {
          id: 'containerNumber',
          numeric: false,
          disablePadding: false,
          label: 'Container Number'
        },
        {
          id: 'noOfPieces',
          numeric: true,
          disablePadding: false,
          label: 'No of Pieces'
        },
        {
          id: 'chargeableWeight',
          numeric: true,
          disablePadding: false,
          label: 'Chargeable Weight'
        },
        {
          id: 'cbm',
          numeric: true,
          disablePadding: false,
          label: 'CBM'
        },
        {
          id: 'mode',
          numeric: true,
          disablePadding: false,
          label: 'Mode'
        },
        {
          id: 'freightTerm',
          numeric: true,
          disablePadding: false,
          label: 'Freight Term'
        },
        {
          id: 'actions',
          numeric: true,
          disablePadding: false,
          label: 'Actions'
        },

      ],
      data: [
        createData(
          '05/04/2019',
          '585-19-IMP',
          'Khatu International P.Ltd',
          'Omni Euro Food Industries',
          'Sohar',
          '968490649',
          'OMMCT920902201',
          'Rajiv',
          'Bikey Rauniyar',
          'MRSU0200005',
          '640',
          '2856',
          '25',
          'Sea',
        ), createData(
          '05/04/2019',
          '585-19-IMP',
          'Khatu International P.Ltd',
          'Omni Euro Food Industries',
          'Sohar',
          '968490649',
          'OMMCT920902201',
          'Rajiv',
          'Bikey Rauniyar',
          'MRSU0200005',
          '640',
          '2856',
          '25',
          'Sea',
        ), createData(
          '05/04/2019',
          '585-19-IMP',
          'Khatu International P.Ltd',
          'Omni Euro Food Industries',
          'Sohar',
          '968490649',
          'OMMCT920902201',
          'Rajiv',
          'Bikey Rauniyar',
          'MRSU0200005',
          '640',
          '2856',
          '25',
          'Sea',
        ),
        createData(
          '05/04/2019',
          '585-19-IMP',
          'Khatu International P.Ltd',
          'Omni Euro Food Industries',
          'Sohar',
          '968490649',
          'OMMCT920902201',
          'Rajiv',
          'Bikey Rauniyar',
          'MRSU0200005',
          '640',
          '2856',
          '25',
          'Sea',
        ),
        createData(
          '05/04/2019',
          '585-19-IMP',
          'Khatu International P.Ltd',
          'Omni Euro Food Industries',
          'Sohar',
          '968490649',
          'OMMCT920902201',
          'Rajiv',
          'Bikey Rauniyar',
          'MRSU0200005',
          '640',
          '2856',
          '25',
          'Sea',
        ),
        createData(
          '05/04/2019',
          '585-19-IMP',
          'Khatu International P.Ltd',
          'Omni Euro Food Industries',
          'Sohar',
          '968490649',
          'OMMCT920902201',
          'Rajiv',
          'Bikey Rauniyar',
          'MRSU0200005',
          '640',
          '2856',
          '25',
          'Sea',
        )


      ],
      page: 0,
      rowsPerPage: 10,
      defaultPerPage: 5,
      filterText: '',
      size: 'small',
      bordered: false,
      stripped: true,
      hovered: false,
      toolbar: true,
      checkcell: false,
      pagination: true
    };
  }

  handleChangeRadio = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleRequestSort = (event, property) => {
    const { orderBy, order, data } = this.state;
    const orderByConst = property;
    let orderLet = 'desc';

    if (orderBy === property && order === 'desc') {
      orderLet = 'asc';
    }

    const dataConst = orderLet === 'desc'
      ? data.sort((a, b) => (b[orderByConst] < a[orderByConst] ? -1 : 1))
      : data.sort((a, b) => (a[orderByConst] < b[orderByConst] ? -1 : 1));

    this.setState({ data: dataConst, order: orderLet, orderBy: orderByConst });
  };

  handleSelectAllClick = (event, checked) => {
    const { data } = this.state;
    if (checked) {
      this.setState({ selected: data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { checkcell } = this.state;
    if (!checkcell) {
      return;
    }
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1; // eslint-disable-line

  handleUserInput(value) {
    // Show all item first
    const { data, defaultPerPage } = this.state;
    if (value !== '') {
      this.setState({ rowsPerPage: data });
    } else {
      this.setState({ rowsPerPage: defaultPerPage });
    }

    // Show result base on keyword
    this.setState({ filterText: value.toLowerCase() });
  }

  render() {
    const { classes } = this.props;
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      filterText,
      size,
      columnData,
      toolbar, pagination, checkcell,
      bordered, stripped, hovered,
    } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));
    const renderCell = (dataArray, keyArray) => keyArray.map((itemCell, index) => (
      <TableCell align={itemCell.numeric ? 'right' : 'left'} key={index.toString()}>{dataArray[itemCell.id]}</TableCell>
    ));
    return (
      <PapperBlock title="Table Playground" desc="" whiteBg icon="ios-options-outline">
        <div>
          <Grid container className={classes.rootTable}>
            <Grid item xs={12}>
              <Paper className={classes.rootTable}>
                {toolbar && (
                  <EnhancedTableToolbar
                    numSelected={selected.length}
                    filterText={filterText}
                    onUserInput={(event) => this.handleUserInput(event)}
                    title="Table"
                    placeholder="Search"
                  />
                )}
                <div className={classes.tableWrapper}>
                  <Table className={
                    classNames(
                      classes.table,
                      hovered && classes.hover,
                      stripped && classes.stripped,
                      bordered && classes.bordered,
                      classes[size]
                    )}
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={this.handleSelectAllClick}
                      onRequestSort={this.handleRequestSort}
                      rowCount={data.length}
                      columnData={columnData}
                      checkcell={checkcell}
                    />
                    <TableBody>
                      {data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => {
                        const isSelected = this.isSelected(n.id);
                        return (
                          <TableRow
                            onClick={event => this.handleClick(event, n.id)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={n.id}
                            selected={isSelected}
                          >
                            {checkcell && (
                              <TableCell padding="checkbox">
                                <Checkbox checked={isSelected} />
                              </TableCell>
                            )}
                            {renderCell(n, columnData)}
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                {pagination && (
                  <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                      'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                      'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </PapperBlock>
    );
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveGrid);
