import withClickData from '../hoc_click_data.jsx';

function Modal (props) {

  if(!props.open) {
    return null
  }
  return(
    <div id="modal_container">
      <div id="modal">
        <button id="modalbttn" onClick={(e) => {props.closeModal(); props.interaction(e.target)}}>Close</button>
        <h3>Comparing</h3>
        <div className ="row">
          <div className="column">
            <b><p>{props.overview.name}</p></b>
            {props.overview.features.map((element, index) => {
              return(
                <p key={index}>{element.feature}: {element.value}</p>
              )
            })}
          </div>
          <div className="column">
            <p></p>
          </div>
          <div className="column">
            <b><p>{props.card.name}</p></b>
            {props.card.features.map((element, index) => {
              return(
                <p key={index}>{element.feature}: {element.value}</p>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withClickData(Modal, 'Related Items & Comparison');