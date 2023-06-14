import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from './redux';
import { path } from './utils';
import Home from './routes/Home';
import System from './routes/System';
import Header from './AdminPage/Header/Header';
import CustomScrollbars from "./components/CustomScrollbars";
import HomePage from './HomePage/HomePage';
import DetailDoctor from "./DetailPage/DetailDoctor/DetailDoctor";
import VerifyEmail from './DetailPage/VerifyEmail/VerifyEmail';
import DetailSpecialty from './DetailPage/DetailSpecialty/DetailSpecialty';
import DetailClinic from './DetailPage/DetailClinic/DetailClinic';

class App extends Component {

  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
        if (this.props.onBeforeLift) {
            Promise.resolve(this.props.onBeforeLift())
                .then(() => this.setState({ bootstrapped: true }))
                .catch(() => this.setState({ bootstrapped: true }));
        } else {
            this.setState({ bootstrapped: true });
        }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
              <div className="content-container">
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                  <Switch>
                    <Route path={path.HOME} exact component={(Home)} />
                    <Route path={path.SYSTEM} component={(System)} />
                    <Route path={path.HOMEPAGE} component={HomePage} />
                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                  </Switch>
                </CustomScrollbars>
              </div>
          </div>
        </Router>
      </Fragment>
    ) ;
  }
}

const mapStateToProps = state => {
  return {
      started: state.app.started
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
