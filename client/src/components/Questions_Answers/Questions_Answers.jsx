import React from 'react';
import Search from './Search.jsx';
import ModalWindow from './ModalWindow.jsx';
import axios from 'axios';
import QA from './QA.jsx';
import withClickData from '../hoc_click_data.jsx';

// this class is top-level component for Questions_Answers

class Questions_Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QAs: [],
      filteredQAs: [],
      viewMoreQuestions: false,
      isFormShown: false,
      searchWord: '',
    }

    this.getAllQuestions = this.getAllQuestions.bind(this);
    this.sortQuestionsByHelpfulness = this.sortQuestionsByHelpfulness.bind(this);
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.handleViewMoreQuestions = this.handleViewMoreQuestions.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
  }

  componentDidMount() {
    this.getAllQuestions();
  }

  getAllQuestions() {
    return axios.get(`/qa/questions/${this.props.productId}`)
    .then(data => {
      let sortedQAs = this.sortQuestionsByHelpfulness(data.data.results)
      this.setState({
        QAs: sortedQAs
      });
    })
  }

  sortQuestionsByHelpfulness(data) {
    return data.sort((a, b) => {
      return b.question_helpfulness - a.question_helpfulness
    });
  }

  handleAddQuestion(e) {
    this.props.interaction(e.target)
    this.setState({
      isFormShown: true
    });
  }

  handleViewMoreQuestions(e) {
    this.props.interaction(e.target)
    this.setState({
      viewMoreQuestions: true
    });
  }

  closeForm() {
    this.setState({
      isFormShown: false
    });
  }

  handleChangeSearch(value) {
    this.setState({
      searchWord: value,
      filteredQAs: this.filterSearch(this.state.QAs)
    });
  }

  filterSearch(data) {
    let results = data.filter(question => {
      return question.question_body.includes(this.state.searchWord);
    });
    return results;
  }

  render() {
    return (
      <div className="questions_answers">
        <h2 className="questions_answers_title">QUESTIONS & ANSWERS</h2>
        <Search handleChangeSearch={this.handleChangeSearch} />
        {this.state.searchWord.length < 2 ?
        <>
          {this.state.QAs.map((qa, index) => {
            if (index > 1) return;
            return (
              <QA key={index} productId={this.props.productId} qa={qa} productName={this.props.productName} />
            );
          })}
          {this.state.viewMoreQuestions && this.state.QAs.map((qa, index) => {
            if (index < 2) return;
            return (
              <QA key={index} qa={qa} productId={this.props.productId} productName={this.props.productName} />
            )
          })}
        </> :
        <>
          {this.state.filteredQAs.map(qa => {
            return (
              <QA key={qa.question_id} productId={this.props.productId} qa={qa} productName={this.props.productName} />
              )
            })}
        </>
        }
        <div className="questions_btn">
          {this.state.QAs.length > 2 && <button className="more_answered_questions" onClick={this.handleViewMoreQuestions}>More answered questions</button>}
          <button className="add_question" onClick={this.handleAddQuestion}>Add A Question +</button>
        </div>
        {this.state.isFormShown &&
          <ModalWindow
            productId={this.props.productId}
            productName={this.props.productName}
            closeForm={this.closeForm}/>
        }
      </div>
    )
  }
}

export default withClickData(Questions_Answers, 'questions_answers');