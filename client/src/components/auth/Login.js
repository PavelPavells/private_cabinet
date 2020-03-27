import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from '../../actions/securityActions';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Layout from "../dashboard/Layout"
import "./Auth.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      errors: {},
      data: [],
      success: this.props.data.success,
      loadingData: false
    };
  }
  componentDidMount(){
    if(localStorage.getItem('uuid') !== null ) {
      window.location.pathname = "/dashboard"
      window.history.back("/dashboard")
      window.history.go("/dashboard")
      this.props.history.pushState("/dashboard", Layout)
    } 
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  clickForm = () => {
    const { email, pass } = this.state;
    this.props.loginUser(email, pass);
  };
  onKeyPress = event => {
    if(event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.clickForm()
    }
  }

  // WITH REDUX
  // componentDidMount() {
  //   if(this.props.security.validToken) {
  //     this.props.history.push('/dashboard')
  //   }
  // }
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if(nextProps.security.validToken) {
  //     this.props.history.push('/dashboard')
  //   }
  //   if(nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors
  //     })
  //   }
  // }
  // onSubmit = event => {
  //   event.preventDefault()
  //   const LoginRequest = {
  //     email: this.state.email,
  //     pass: this.state.pass
  //   }
  //   this.props.login(LoginRequest)
  // }
  // onChange = event => {
  //   this.setState({ [event.target.id]: event.target.value })
  // }

  render() {
    const { errors, email, pass } = this.state;
    const { err } = this.props.data;
    let uuid = localStorage.getItem('uuid')
      if(this.props.data.length === 0 
        || this.props.data.success === "false" 
        || pass === "" 
        || email === ""
      ) {
      return (
        <div className="wrapper">
          <div className="header-logo">
            <img src="../../img/carddex_logo.png" alt="" />
          </div>
          <div className="base-wrapper">
            <div className="main-paragraph">
              <h1>Личный кабинет Карддекс</h1>
              <h3>Личный кабинет партнеров и дилеров Карддекс</h3>
              <p>
                Войдите или зарегистрируйтесь для получения всей доступной
                информации по продуктам Карддекс, вашим заказам, скидкам и
                предложениям.
              </p>
            </div>
            <div className="wrapper-separator"></div>
            <div className="wrapper-auth">
              <div className="wrapper-auth__header">
                <Link to="/" className="link-login active">
                  Вход
                </Link>
                {/*
                <Link to="/register" className="link-register">
                  Регистрация
                </Link>
                */}
              </div>

              <div className="auth-group">
                <label>
                  <div className="auth-label">Email</div>
                  <input
                    onChange={this.onChange}
                    onKeyDown={this.onKeyPress}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className="auth-input"
                  />
                  <div className="auth-error">
                    {errors.email}
                    {errors.emailnotfound}
                  </div>
                </label>
              </div>
              <div className="auth-group">
                <label>
                  <div className="auth-label">Пароль</div>
                  <input
                    onChange={this.onChange}
                    onKeyDown={this.onKeyPress}
                    value={this.state.pass}
                    error={errors.pass}
                    id="pass"
                    type="password" //passowrd
                    className="auth-input"
                  />
                  <div className="auth-error">
                    {err}
                    {errors.passwordincorrect}
                  </div>
                </label>
              </div>
              <div className="auth-password__ask">
                <label>
                  <input type="checkbox" /> Запомнить меня
                </label>
                <a
                  href="https://yandex.ru"
                  className="auth-group__ask-password"
                >
                  Забыли пароль?
                </a>
              </div>
              <div className="auth-condition">
                <span>Нажимая кнопку "Войти", вы принимаете</span>
                <a
                  href="https://yandex.ru"
                  className="auth-conditon__confidiency"
                >
                  Условия "Политики Конфиденциальности"
                </a>
              </div>
              <div>
                <Link to="/">
                  <button
                    onClick={this.clickForm}
                    type="submit"
                    className="auth-button"
                  >
                    Войти
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="footer-copy">
              <h1>Copyright 2019 &copy; CARDDEX</h1>
              <p>Информация на сайте не является публичной офертой</p>
            </div>
          </div>
        </div>
      )
    } else if(this.props.data.success === "true" && uuid !== null) {
      return <Redirect to="/dashboard" />
    } else {
      return (
        <div className="wrapper">
          <div className="header-logo">
            <img src="../../img/carddex_logo.png" alt="" />
          </div>
          <div className="base-wrapper">
            <div className="main-paragraph">
              <h1>Личный кабинет Карддекс</h1>
              <h3>Личный кабинет партнеров и дилеров Карддекс</h3>
              <p>
                Войдите или зарегистрируйтесь для получения всей доступной
                информации по продуктам Карддекс, вашим заказам, скидкам и
                предложениям.
              </p>
            </div>
            <div className="wrapper-separator"></div>
            <div className="wrapper-auth">
              <div className="wrapper-auth__header">
                <Link to="/" className="link-login active">
                  Вход
                </Link>
                {/*
                <Link to="/register" className="link-register">
                  Регистрация
                </Link>
                */}
              </div>

              <div className="auth-group">
                <label>
                  <div className="auth-label">Email</div>
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    onKeyDown={this.onKeyPress}
                    id="email"
                    type="email"
                    className="auth-input"
                  />
                  <div className="auth-error">
                    {errors.email}
                    {errors.emailnotfound}
                  </div>
                </label>
              </div>
              <div className="auth-group">
                <label>
                  <div className="auth-label">Пароль</div>
                  <input
                    onChange={this.onChange}
                    value={this.state.pass}
                    error={errors.pass}
                    onKeyDown={this.onKeyPress}
                    id="pass"
                    type="password"
                    className="auth-input"
                  />
                  <div className="auth-error">
                    {errors.pass}
                    {errors.passwordincorrect}
                  </div>
                </label>
              </div>
              <div className="auth-password__ask">
                <label>
                  <input type="checkbox" /> Запомнить меня
                </label>
                <a
                  href="https://yandex.ru"
                  className="auth-group__ask-password"
                >
                  Забыли пароль?
                </a>
              </div>
              <div className="auth-condition">
                <span>Нажимая кнопку "Войти", вы принимаете</span>
                <a
                  href="https://yandex.ru"
                  className="auth-conditon__confidiency"
                >
                  Условия "Политики Конфиденциальности"
                </a>
              </div>
              <div>
                <Link to="/dashboard">
                  <button
                    type="submit"
                    className="auth-button"
                  >
                    Войти
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="footer-copy">
              <h1>Copyright 2019 &copy; CARDDEX</h1>
              <p>Информация на сайте не является публичной офертой</p>
            </div>
          </div>
        </div>
      );
    }
  }
}
Login.propTypes = {
 login: PropTypes.func.isRequired,
 security: PropTypes.object.isRequired,
 errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
 security: state.security,
 errors: state.errors
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
//export default Login;