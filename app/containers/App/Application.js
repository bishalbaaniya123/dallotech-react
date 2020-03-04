import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import {
  PersonalDashboard,
  table1,
  table2,
  table3,
  table4,
  NotFound,
  sales,
  AddSales,
  Parent,
  AdvancedTable,
  pricing,
  FollowUpSales,
  QuarterlyPlanSales, CustomerRegistrationSales,
  PostVisitSales
} from '../pageListAsync';

class Application extends React.Component {
  render() {
    const { changeMode, history } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          { /* Home */ }
          <Route exact path="/app" component={PersonalDashboard} />

          {/* Sales */}
          <Route path="/app/sales/add" component={AddSales} />
          <Route path="/app/sales/customer-registration" component={CustomerRegistrationSales} />
          <Route path="/app/sales/quarterly-plan" component={QuarterlyPlanSales} />
          <Route path="/app/sales/follow-up" component={FollowUpSales} />
          <Route path="/app/sales/post-visit" component={PostVisitSales} />
          <Route path="/app/sales" component={sales} />


          {/* Pricing */}
          <Route path="/app/pricing" component={pricing} />


          {/* Jobs */}
          <Route path="/app/jobs/table1" component={table1} />
          <Route path="/app/jobs/table2" component={table2} />
          <Route path="/app/jobs/table3" component={table3} />
          <Route path="/app/jobs/table4" component={table4} />

          { /* Default */ }
          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Application;
