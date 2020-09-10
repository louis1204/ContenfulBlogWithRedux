import React from "react";
import Blog from "./Blog";
import BlogPost from "./BlogPost";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { getQueries } from "../store";
import { Provider } from "react-redux";
import { Provider as ReduxQueryProvider } from "redux-query-react";

export default class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Provider store={this.props.store}>
          <ReduxQueryProvider queriesSelector={getQueries}>
            <Switch>
              <Route path="/blog" exact component={Blog} />
              <Route path='/blog/:path' exact component={BlogPost} />
              <Route path='' component={Home} />
            </Switch>
          </ReduxQueryProvider>
        </Provider>
      </Router>
    );
  }
}
