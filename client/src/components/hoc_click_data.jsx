import axios from 'axios';

const withClickData = (WrappedComponent, widget) => {
  class ClickData extends React.Component {
    constructor(props) {
      super(props);
    }

    interactionFunc(target) {
      var element = target.id ? target.nodeName + '#' + target.id : target.nodeName + '.' + target.className;
      var time =  String(new Date());
      axios.post('/interactions', { element, widget, time})
        .then(response => {
          if (response.status === 201) {
            console.log(response.data);
          }
        })
        .catch(err => {
          console.error(err);
        })
    }

    render() {
      return <WrappedComponent {...this.props} interaction={this.interactionFunc.bind(this)} />;
    }

  }
  return ClickData;
}

export default withClickData;