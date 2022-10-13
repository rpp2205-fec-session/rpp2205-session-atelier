import React from 'react';
import Overview from './Overview/overview.jsx';
import Ratings_Reviews from './Ratings_Reviews/Ratings_Reviews.jsx';
import axios from 'axios';
import { totalReviewsAndAvgRating } from './helperFunctions.jsx';
import Questions_Answers from './Questions_Answers/Questions_Answers.jsx';
import RPList from './RelatedItems_Comparison/rp-list.jsx'
import YourOutfit from './RelatedItems_Comparison/your-outfit.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentProductId: '',
                  rating: 0,
                  totalReviews: 0,
                  currentProduct: {}, //contains product name, category
                  defaultStyle: {},//contains price info(original_price, sale_price, thumbnail) //
                  styles: [],
                  background: "white"
                  };
    this.handleProductIdChange.bind(this);
  }

  componentDidMount() {
    var productId = '71697';
    var promises = [axios.get(`/reviews/meta/${productId}`),
                    axios.get(`/products/${productId}/styles`),
                    axios.get(`/products/${productId}`)];
    Promise.all(promises)
      .then(responseArr => {
        var reviewsAndRating = totalReviewsAndAvgRating(responseArr[0].data.ratings);
        this.setState({rating: reviewsAndRating[1],
                       totalReviews: reviewsAndRating[0],
                       currentProductId: productId,
                       currentProduct: responseArr[2].data,
                       defaultStyle: responseArr[1].data.results.find(style => style["default?"]),
                       styles: responseArr[1].data.results});

      })
      .catch(err => console.error(err))
  }

  handleProductIdChange(newId) {
    //can be used by all components for product ID change
    this.setState({currentProductId: newId})
  }

  handleOverviewBackground(color) {
    this.setState({background: color});
  }

  render() {
    //only render the children components after componentDidMount() is completed fetching data from server
    if (this.state.currentProductId === '') {
      return null;
    }
    return (
      <div style={{"backgroundColor": this.state.background}}>
        <Overview productId={this.state.currentProductId} currentProduct={this.state.currentProduct} styles={this.state.styles} handleProductIdChange={this.handleProductIdChange} rating={this.state.rating} totalReviews={this.state.totalReviews} handleOverviewBackground={this.handleOverviewBackground.bind(this)}/>
        <RPList productId={this.state.currentProductId}/>
        <YourOutfit productId={this.state.currentProductId} prodRating={this.state.rating}/>
        <Ratings_Reviews productId={this.state.currentProductId} handleProductIdChange={this.handleProductIdChange} rating={this.state.rating} totalReviews={this.state.totalReviews}/>
        <Questions_Answers productId={this.state.currentProductId} />
      </div>
    )
  }
}

export default App;