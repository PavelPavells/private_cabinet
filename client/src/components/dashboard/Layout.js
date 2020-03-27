import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { getProjects } from "../../actions/projectsActions";
//import { registerWebApp } from "../../actions/webAppActions";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Redirect
} from "react-router-dom";
import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import Main from "./MainContent/Main/Main";
import Account from "./MainContent/Account/Account";
import News from "./MainContent/News/News";
import SalePartners from "./MainContent/SalePartners/SalePartners";
import Tasks from "./MainContent/Tasks";
import NotFound from "../404/404";
import PriceList from "./MainContent/PriceList/PriceList";
import Control from "./MainContent/Control/Control";
import Payment from "./MainContent/Payment/Payment";
import Shipment from "./MainContent/Shipment/Shipment";
import WebApp from "./MainContent/WebApp/WebApp";
import "./Layout.scss";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: ''
    }
  }
  componentDidMount() {
    //this.props.getProjects();
    //this.props.registerWebApp();
    localStorage.getItem("uuid")
  }
  render() {
    const { news, control, logoutUser } = this.props;
    const { contragentName, partnerStatus } = this.props.data;
    let uuid = localStorage.getItem('uuid')
    let dashboardContent;
    if(!uuid) {
      return <Redirect to="/" />
    } else {
      dashboardContent = (
        <>
          <div className="right">
            <SideNav />
            <TopNav contragentName={contragentName} partnerStatus={partnerStatus} uuid={uuid} logoutUser={logoutUser} />
            <Switch>
              <Route
                exact
                path="/dashboard"
                //projects={projects}                //projects={projects}
                component={Main}                     //component={Dashboard}
              />
              <Route
                exact
                path="/tasks"
                component={Tasks}
              />
              <Route 
                path="/sales" 
                render={() => <SalePartners data={uuid} />}
              />
              <Route 
                path="/account" 
                render={() => <Account data={uuid}/>}
              />
              <Route 
                path="/news" 
                component={News}
                news={news} 
              />
              <Route 
                path="/price-list"  
                render={() => <PriceList data={uuid} />}
              />
              <Route 
                path="/control" 
                component={Control}
                control={control}
              />
              <Route 
                path="/payment" 
                render={() => <Payment data={uuid} />}
              />
              <Route 
                path="/shipment" 
                render={() => <Shipment data={uuid} />}
              />
              <Route 
                path="/app" 
                render={() => <WebApp data={uuid} />}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    }
    return (
      <Router>
        <div className="wrapper">
          {dashboardContent}
        </div>
      </Router>
    );
  }
}
Layout.propTypes = {
  security: PropTypes.object
};
const mapStateToProps = state => ({
  security: state.security,
});
export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Layout)
);
//export default Layout