import SizeSelector from './size-selector.jsx';
import QuantitySelector from './quantity-selector.jsx';
import AddToOutfit from './add-to-outfit.jsx';
import withClickData from '../hoc_click_data.jsx';

const selectionReminder = {borderColor: "red", borderWidth: "2px"};
const original = {borderColor: "black", borderWidth: "1px"};

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 0, sizeAndQuantityObj: undefined, sizeBorderStyle: original, quantityBorderStyle: original }
  }

  componentDidMount() {
    if (this.props.styleObj.skus) {
      var sizeAndQuantityArr = Object.values(this.props.styleObj.skus);
      var sizeAndQuantityObj = sizeAndQuantityArr.reduce((acc, element) => {
        acc[element.size] = element.quantity;
        return acc;
      }, {});
      this.setState({ sizeAndQuantityObj });

    }
  }

  handleSizeSelect(e) {
    var size = e.target.value;
    if (size !== 'Select Size') {
      this.setState({ quantity: this.state.sizeAndQuantityObj[size], sizeBorderStyle: original })
    } else {
      this.setState({ quantity: 0 });
    }
  }

  handleQuantitySelect(e) {
    var quantity = e.target.value;
    if(quantity !== 'Select Quantity') {
      this.setState({quantityBorderStyle: original})
    }
  }

  handleButtonClick(e) {
    var selectedSize = document.getElementById('defaultSizeOption');
    var selectedQuantity = document.getElementById('defaultQuantityOption');
    if (selectedSize.selected) {
      this.setState({sizeBorderStyle: selectionReminder})
    }
    if (selectedQuantity.selected) {
      this.setState({quantityBorderStyle: selectionReminder})
    }
    this.props.interaction(e.target);
  }

  render() {
    if (!this.state.sizeAndQuantityObj) {
      return null;
    }
    return (<div className="add-to-cart" data-testid="test-AddToCart">
      <div className="add-to-card-line1">
        <SizeSelector sizeAndQuantityObj={this.state.sizeAndQuantityObj} handleSizeSelect={this.handleSizeSelect.bind(this)} borderStyle={this.state.sizeBorderStyle}/>
        <QuantitySelector quantity={this.state.quantity} borderStyle={this.state.quantityBorderStyle} handleQuantitySelect={this.handleQuantitySelect.bind(this)}/>
      </div>
      <div className="add-to-card-line2">
        <button id="add-to-cart-btn" onClick={this.handleButtonClick.bind(this)}>Add To Cart</button>
        <AddToOutfit addToOutfit={this.props.addToOutfit} removeFromOutfit={this.props.removeFromOutfit} productId={this.props.productId}/>
      </div>

    </div>)

  }
}

export default withClickData(AddToCart, 'overview');