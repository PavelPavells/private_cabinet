import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { getControl } from "../../../../actions/controlActions.js";
import "./Control.scss";
class Control extends Component {
  constructor() {
    super();
    this.state = {
        name: "",
        email: "",
        contact_person: "",
        pass: "",
        isCheckedAdmin: false,
        isCheckedManager: false
    };
  }
  isCheckedAdmin = () => {
    this.setState({ isCheckedAdmin: !this.state.isCheckedAdmin })
  }
  isCheckedManager = () => {
    this.setState({ isCheckedManager: !this.state.isCheckedManager })
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }
  onSubmit = e => {
    e.preventdefault();
    // let changeUserData = {
    //     name: this.state.name,
    //     email: this.state.email,
    //     contact_person: this.state.contact_person,
    //     pass: this.state.pass,
    //     isChecked: this.changeFlag
    // }
    // this.props.getControl(changeUserData);
  }
  render() {
    return (
      <div className="main-content">

        {/**-------------------------- SECTION FOR CHANGE PERSON DATA ------------------------------ */}

       {/* <h1>Регистрация пользователя</h1> */}
        
          <h3>Добавить нового пользователя</h3>
          <div className="main-content__main-settings-wrapper">
            <p>Добавить нового пользователя Вы можете здесь</p>
            <form
              className="main-content__main-settings-form-control"
              onSubmit={this.onSubmit}
            >
              <label>
                <div className="auth-label">Имя пользователя</div>
                <input
                  value={this.state.name}
                  onChange={this.onChange}
                  id="name"
                  type="name"
                  className="auth-input main-content__forms"
                />
                <div className="auth-label__description">
                  Изменить имя пользователя Вы можете здесь.
                </div>
              </label>
              <label>
                <div className="auth-label">Контактное лицо</div>
                <input
                  value={this.state.contact_person}
                  onChange={this.onChange}
                  id="contact_person"
                  type="contact-person"
                  className="auth-input"
                />
                <div className="auth-label__description">
                  Изменить контактное лицо Вы можете здесь.
                </div>
              </label>
              <label>
                <div className="auth-label">Пароль</div>
                <input
                  value={this.state.pass}
                  onChange={this.onChange}
                  id="pass"
                  type="pass"
                  className="auth-input main-content__forms"
                />
                <div className="auth-label__description">
                  Изменить пароль Вы можете здесь.
                </div>
              </label>
              <label>
                <div className="auth-label">Email</div>
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  id="email"
                  type="email"
                  className="auth-input main-content__forms"
                />
                <div className="auth-label__description">
                  Изменить Email Вы можете здесь.
                </div>
              </label>

              <label>
              <div className="auth-label">Администратор</div>
              <input
                value={this.state.isCheckedAdmin}  
                type="checkbox"
                className="main-content__forms-control"
                onClick={this.changeFlag}
              />
              <div className="auth-label__description">
                Добавить привелегии Админа Вы можете здесь.
              </div>
            </label>
            <label>
              <div className="auth-label">Менеджер</div>
              <input
                value={this.state.isCheckedManager}
                type="checkbox"
                className="main-content__forms-control"
                onClick={this.changeFlag}
              />
              <div className="auth-label__description">
                Добавить привелегии Менеджера Вы можете здесь.
              </div>
            </label>

              <button type="submit" className="auth-button">
                Добавить нового пользователя
              </button>
            </form>
          </div>
      </div>
    );
  }
}
Control.propTypes = {
  security: PropTypes.object.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  contact_person: PropTypes.string,
  pass: PropTypes.string,
};
const mapStateToProps = state => ({
   name: state.name,
   email: state.email,
   contact_person: state.contact_person,
   pass: state.pass,
   security: state.security
});
export default connect(
  mapStateToProps,
  null                                                  //{ getControl }
)(Control);