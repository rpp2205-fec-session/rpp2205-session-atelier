import React from 'react';
import Answer from './Answer.jsx';

class Answers extends React.Component {
  constructor(props) {
    super(props);
    console.log('props: ', props)

    this.state = {
      viewAllAnswersForFirstQuestion: false,
      viewAllAnswersForSecondQuestion: false,
    }

    this.sortAnswers = this.sortAnswers.bind(this);
    this.sortBySeller = this.sortBySeller.bind(this);
    this.handleViewMoreAnswers = this.handleViewMoreAnswers.bind(this);
  }

  sortAnswers(callback, index) {
    console.log(this.props)
    let results = this.props[index]
    .filter(callback)
    .sort((a, b) => {
      return b.helpfulness - a.helpfulness;
    });

    return results;
  }

  sortBySeller(index) {
    let sellerSorted = this.sortAnswers((answer) => {
      return answer.answerer_name === 'Seller';
    }, index);

    let notSellerSorted = this.sortAnswers((answer) => {
      return answer.answerer_name !== 'Seller';
    }, index);

    let results = sellerSorted.concat(notSellerSorted);
    return results;
  }

  handleViewMoreAnswers(index) {
    if (index === 'viewAllAnswersForFirstQuestion') {
      this.setState({
        viewAllAnswersForFirstQuestion: !this.state[index]
      })
    } else {
      this.setState({
        viewAllAnswersForSecondQuestion: !this.state[index]
      })
    }
  }

  render() {
    if (this.props.allAnswersForFirstQuestion) {
      let sortedAllAnswersForFirstQuestion = this.sortBySeller('allAnswersForFirstQuestion');
      return (
        <div className={`answers${this.state.viewAllAnswersForFirstQuestion ? '_expand_mode' : ''}`}>
          {sortedAllAnswersForFirstQuestion.map((answer, index) => {
            if (index > 1) return;
            return (
              <div key={answer.answer_id}>
                <Answer answer={answer} />
              </div>
            )
          })}
          {this.state.viewAllAnswersForFirstQuestion &&
            <div>
              {sortedAllAnswersForFirstQuestion.map((answer, index) => {
              if (index < 2) return;
              return (
                <div key={answer.answer_id}>
                  <Answer answer={answer} />
                </div>
              )
            })}
            </div>}
            {this.props.allAnswersForFirstQuestion.length > 2 &&
            <button onClick={() => this.handleViewMoreAnswers('viewAllAnswersForFirstQuestion')}>{this.state.viewAllAnswersForFirstQuestion ? 'Collapse answers' : 'See more answers'}</button>
            }
        </div>
      )
    } else {
      let sortedAllAnswersForSecondQuestion = this.sortBySeller('allAnswersForSecondQuestion');
      return (
        <div className={`answers${this.state.viewAllAnswersForSecondQuestion ? '_expand_mode' : ''}`}>
          {sortedAllAnswersForSecondQuestion.map((answer, index) => {
            if (index > 1) return;
            return (
              <div key={answer.answer_id}>
                <Answer answer={answer} />
              </div>
            )
          })}
          {this.state.viewAllAnswersForFirstQuestion &&
            <div>
              {sortedAllAnswersForSecondQuestion.map((answer, index) => {
              if (index < 2) return;
              return (
                <div key={answer.answer_id}>
                  <Answer answer={answer} />
                </div>
              )
            })}
            </div>}
            {this.props.allAnswersForSecondQuestion.length > 2 &&
            <button onClick={() => this.handleViewMoreAnswers('viewAllAnswersForSecondQuestion')}>{this.state.viewAllAnswersForSecondQuestion ? 'Collapse answers' : 'See more answers'}</button>
            }
        </div>
      )
    }
  }
}

export default Answers;
