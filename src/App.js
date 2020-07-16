import React, {Component} from 'react';
import Settings from "./Settings.js"
import Title from "./Title.js"
import RTabs from "./Tabs.js"

class App extends Component {

  render() {
    return(
      <div>
        <Title />
        <RTabs />
      </div>
    )
  }
}

export default App;
