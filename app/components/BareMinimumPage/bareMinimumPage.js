import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  disabled: {
    pointerEvents: 'none'
  }
};

class BareMinimumPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <div>
        Hello World from customer suggestion
      </div>
    );
  }
}

export default withStyles(styles)(BareMinimumPage);
