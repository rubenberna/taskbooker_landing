import React from "react";
import TaskersList from './banners/TaskersList'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Taskers</h1>
        <TaskersList />
      </div>
    );
  }
}
export default App;
