import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { registerWebApp } from "../../../../actions/webAppActions";
import "./WebApp.scss";

class RegisterApp extends Component {
    render() {
        return(
            <div className="register-msg">Приложение успешно зарегестрировано.</div>
        )
    }
}
class WebApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            app: false,
            isRegister: false,
            isLoading: false,
            open: false
        }
    }
    onSubmit = event => {
        event.preventDefault();
        let appData = !this.state.isRegister
        this.props.registerWebApp(appData);
    }
    toggle = e => {
        e.preventDefault()
        this.setState({
            open: !this.state.open
        })
    }
    render() {
        return(
            <div className="main-content">
                <h1>Регистрация Веб-приложения</h1>
                {this.state.open ? <RegisterApp /> : null}
                <div className="wrapper-registration-app">
                    <div className="wrapper__building-designer">
                        <div className="wrapper__building-designer-header">
                            <h3>Конструктор помещений</h3>
                        </div>
                        <div className="building-designer-logo"></div>
                        <div className="building-designer-text">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </div>
                        <div onChange={this.onSubmit} className="wrapper-registration-app__button">
                            <button onClick={this.toggle} value={this.state.isRegister} className="button-registration-app">Зарегистрировать</button>
                        </div>
                    </div>
                    <div className="wrapper__hardware-configuration-wizards">
                        <div className="wrapper__hardware-configuration-wizards-header">
                            <h3>Мастер подбора конфигурации оборудования</h3>
                        </div>
                        <div className="hardware-configuration-wizards-logo"></div>
                        <div className="hardware-configuration-wizards-text">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </div>
                        <div className="wrapper-registration-app__button">
                            <button onClick={this.toggle} value={this.state.isRegister} className="button-registration-app">Зарегистрировать</button>
                        </div>
                    </div>

                     {/** ===================== TESTING FIELDS ======================= */}

                    <div className="wrapper__building-designer">
                        <div className="wrapper__building-designer-header">
                            <h3>Конструктор помещений</h3>
                        </div>
                        <div className="building-designer-logo"></div>
                        <div className="building-designer-text">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </div>
                        <div className="wrapper-registration-app__button">
                            <button onClick={this.toggle} value={this.state.isRegister} className="button-registration-app">Зарегистрировать</button>
                        </div>
                    </div>
                    <div className="wrapper__hardware-configuration-wizards">
                        <div className="wrapper__hardware-configuration-wizards-header">
                            <h3>Мастер подбора конфигурации оборудования</h3>
                        </div>
                        <div className="hardware-configuration-wizards-logo"></div>
                        <div className="hardware-configuration-wizards-text">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </div>
                        <div className="wrapper-registration-app__button">
                            <button onClick={this.toggle} value={this.state.isRegister} className="button-registration-app">Зарегистрировать</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
WebApp.propTypes = {
    app: PropTypes.object,
    security: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    security: state.security,
    app: state.app
})
export default withRouter(
    connect(
        mapStateToProps,
        null                //{ registerWebApp }
    )(WebApp)
)