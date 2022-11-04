import withClickData from '../hoc_click_data.jsx';

const highlightStyle = {"borderStyle": "solid", "color": "rgb(116, 196, 65)", "borderWidth": "2.5px"};
const nonHighlightStyl = {"borderStyle": "none"};


class StyleEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    var newId = this.props.id;
    this.props.changeStyle(newId);
    this.props.interaction(e.target);
  }

  render() {
    var checkDisplay = this.props.highlight ? "initial" : "none";
    var original_url = this.props.styleObj.photos[0].thumbnail_url;
    if (original_url) {
      var style_url = original_url.slice(0, original_url.length - 2) + '10';
    } else {
      var style_url = 'img/NoImageThumbnail.png';
    }
    return (
    <div className="styleThumbnails-parent">
      <img alt='img' className="styleThumbnails-check" src="img/check-icon.png" style={{"display": checkDisplay}}/>
      <div className="styleThumbnails-container" style={this.props.highlight ? highlightStyle : nonHighlightStyl}>
        <img alt='img' className="styleThumbnails" id={"styleThumbnails" + this.props.id} src={style_url} onClick={this.handleClick.bind(this)} width="50px"></img>
      </div>
    </div>
   )

  }
}

export default withClickData(StyleEntry, 'overview');