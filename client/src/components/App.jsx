import React from 'react';
import Overview from './Overview/overview.jsx';
import Ratings_Reviews from './Ratings_Reviews/Ratings_Reviews.jsx';
import Questions_Answers from './Questions_Answers/Questions_Answers.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentProductId: ''};
  }

  handleProductIdChange(newId) {
    //can be used by all components for product ID change
    this.setState({currentProductId: newId})
  }

  render() {
    return (
      <div>
        <Overview productId={this.state.currentProductId} handleProductIdChange={this.handleProductIdChange.bind(this)}/>
        <Ratings_Reviews />
        <Questions_Answers productId={this.state.productId} />
      </div>
    )
  }
}

export default App;