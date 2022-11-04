import { useState, useEffect } from 'react';
import RPC from './related-product-cards.jsx';
import Modal from './modal.jsx';
import axios from 'axios';
import { totalRatingsAndAvgRating, handlePromises } from '../helperFunctions.jsx';
import withClickData from '../hoc_click_data.jsx';

 function RPList(props) {

  const [rp, setRP] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const[start, setStart] = useState(0);
  const [Prev, togglePrev] = useState('');
  const [Next, toggleNext] = useState('');
  const [prodInfo, setProdInfo] = useState({})
  const [name, setName] = useState('')
  const ref = React.createRef();

  const arr = rp.map((element, index) => {
    return(
      <RPC action={true} info={element} show={(obj, name) => {setProdInfo(obj); setShowModal(true);}} key={index} redirect={props.changeProduct}/>
    )
  });

  useEffect(() => {
    var promises = [];
    props.relatedProds.forEach((element) => {
      promises.push(axios.get(`/products/${element.toString()}/styles`));
      promises.push(axios.get(`/products/${element.toString()}`));
      promises.push(axios.get(`/reviews/meta/${element.toString()}`));
    });

    Promise.all(promises)
      .then(responseArr => {
        var data = [];
        for (var i = 0; i <= responseArr.length - 3; i+=3) {
          var result = responseArr[i].data.results.find(style => style["default?"]);
          if(result === undefined) {
            result = responseArr[i].data.results[0];
          }
          data.push({
            defaultStyle: result,
            product: responseArr[i+1].data,
            rating: totalRatingsAndAvgRating(responseArr[i+2].data.ratings)[1]
          });
        }
        setRP([...data]);
      })
      .catch(err => console.log(err));

  }, [props.productId]);

  useEffect(()=> {
    if(start.toString() + 'px' === '0px') {
      togglePrev(true);
      console.log();
    }
    if(start.toString() + 'px' !== '0px') {
      togglePrev(false)
    }
    if(ref.current.clientWidth < ref.current.scrollWidth) {
      toggleNext(false);
    }
    if(!(ref.current.clientWidth < ref.current.scrollWidth)) {
      toggleNext(true);
    }
  }, [start, ref])


  return (
    <div data-testid="rpList" className="container">
      <p>Related Products</p>
      <div className="main-container">
          {Prev ?
            ('') :
            (<button className="nav Prev" onClick={(e) => { props.interaction(e.target); setStart(start + 300);}}>Prev</button>)
          }
        <div id="carousel-container" ref={ref}>
          <div id="carousel" style={{ transform: `translateX(${start.toString()}px)` }}>
            {arr}
          </div>
          {showModal ? (<Modal card={prodInfo} overview={props.overview} open={showModal} closeModal={() => setShowModal(false)} />) : ('')}
        </div>
          {Next ?
            ('') :
            (<button className="nav Next" onClick={(e) => {
              props.interaction(e.target);
              setStart(start - 300);
            }}>Next</button>)
          }
      </div>
    </div>
  )
}

export default withClickData(RPList, 'Related Items & Comparison');