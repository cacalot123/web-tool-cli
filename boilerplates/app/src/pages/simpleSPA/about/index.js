import React, {Component} from 'react';




class About extends Component {
  state = {
    count: 1
  }

  click = () => {
    console.log(this)

  }

  componentDidMount() {
    console.log(1)
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    // const {store} = this.props;
    // console.log(store.price)
    return (
      <div className="about">
        <header className="about-header">
          <h1 className="about">about</h1>
        </header>

        <input type='button' onClick={this.click}/>
      </div>
    );
  }
}

export default About;
