import React, { Component } from 'react';

class DateCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(), // Initialize with today's date
      futureDate: null,
    };
  }

  calculateFutureDate = () => {
    const { today } = this.state;
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 60); // Add 60 days to the current date
    this.setState({ futureDate });
  };

  render() {
    const { today, futureDate } = this.state;

    return (
      <div>
        <p>Today's Date: {today.toDateString()}</p>
        <button onClick={this.calculateFutureDate}>Calculate Future Date</button>
        {futureDate && <p>Date 60 Days from Today: {futureDate.toDateString()}</p>}
      </div>
    );
  }
}

export default DateCalculator;
