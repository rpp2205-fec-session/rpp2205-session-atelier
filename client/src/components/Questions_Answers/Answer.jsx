import React from 'react';

// this class handles each answer for the specific product
class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: props.answer.helpfulness,
      isYesClicked: false,
      isReported: false
    }

    this.handleReport = this.handleReport.bind(this);
    this.handleIncreaseCounts = this.handleIncreaseCounts.bind(this);
    this.handleDateFormat = this.handleDateFormat.bind(this);
  }

  handleReport() {
    // change the text to "Reported"
    this.setState({
      isReported: true
    });
  }

  handleIncreaseCounts() {
    // increase the count of helpfulness
    this.setState({
      isYesClicked: true,
      helpfulness: this.state.helpfulness + 1
    });
  }

  handleDateFormat(date) {
    console.log('date: ', date)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let d = new Date(date);
    let day = d.getDate() + 1;
    let month = monthNames[d.getMonth()];
    let year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  render() {
    let { body, answerer_name, date } = this.props.answer;

    return (
      <div>
        <p className="answer">A: {body}</p>
        <div className="answer_sub">
          <div className="by">by</div>
          <span className={answerer_name === "Seller" ? 'seller' : 'answerer'}>{answerer_name === "Seller" ? "Seller" : answerer_name}</span>
          <div role="answer_date" className="answer_date">{this.handleDateFormat(date)}</div>
          <div>|</div>
          <div className="helpful_text">Helpful?</div>
          <button className="yes_button"
            disabled={this.state.isYesClicked}
            onClick={this.handleIncreaseCounts}>Yes
          </button>
          <div className="helpfulness_number">({this.state.helpfulness})</div>
          {this.state.isReported ?
            <button disabled={this.state.isReported}
              className="report_button"
              role="report_button"
              onClick={this.handleReport}>Reported
            </button> :
            <button className="report_button"
              role="report_button"
              onClick={this.handleReport}>Report
            </button>}
        </div>
      </div>
    )
  }
}

export default Answer;
