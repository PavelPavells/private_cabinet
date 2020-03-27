import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  currentDiscount,
  volumePurchase,
  ordersTable,
  newsData
} from "./data.json";
//import { getMainInfo } from "../../../../actions/getMainInfoActions";
import "./Main.scss";
class Main extends Component {
  constructor() {
    super();
    this.state = {
      main: []
    };
  }
  render() {
    return (
      <div className="main-content">
        <div className="wrapper-main">
          <div className="wrapper-main-info">
            <p className="wrapper-main-info__paragraph">Статус:</p>
            <div className="wrapper-registration__partner">
              <p className="registration-partner">
                Зарегистрированный торговый партнер
              </p>
              <div className="partner-stars__rating">
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                {/*
                <span>☆</span>
                <span>☆</span>
                */}
              </div>
            </div>
            <div className="wrapper-sales__partner">
              <p className="sales-partner">
                Текущая накопительная скидка на продукцию Кардекс:
              </p>
              {currentDiscount.map((item, key) => (
                <p key={item.id} className="sales-percent">
                  {item.current_discount}
                </p>
              ))}
            </div>
            <div className="wrapper-volume__purchase">
              <p className="volume-purchase">
                Объем учтенных закупок для расчета скидки
              </p>
              {volumePurchase.map((item, key) => (
                <p key={item.id} className="volume-sum">
                  {item.current_discount}
                </p>
              ))}
            </div>
            <p className="wrapper-main-info__paragraph">
              Предоставляемые накопительные скидки:
            </p>
            <div className="wrapper-main-table">
              <div className="wrapper-block__left">
                <div className="table-block__one">Объем закупок, в руб.</div>
                <div className="table-block__two">
                  <div className="table-block__left">От</div>
                  <div className="table-block__right">До</div>
                </div>
                <div className="table-block__two">
                  <div className="table-block__left">
                    <strong className="numbers">300000</strong>
                  </div>
                  <div className="table-block__right">
                    <div className="numbers">1000000</div>
                  </div>
                </div>
                <div className="table-block__two">
                  <div className="table-block__left">
                    <div className="numbers">1000001</div>
                  </div>
                  <div className="table-block__right">
                    <div className="numbers">3000000</div>
                  </div>
                </div>
                <div className="table-block__two">
                  <div className="table-block__left">
                    <div className="numbers">3000001</div>
                  </div>
                  <div className="table-block__right"></div>
                </div>
              </div>
              <div className="wrapper-block__center">
                <div className="table-block__one-center">Скидка</div>
                <div className="table-block__two-center">
                  <div className="numbers">22%</div>
                </div>
                <div className="table-block__three-center">
                  <div className="numbers">28%</div>
                </div>
                <div className="table-block__four-center">
                  <div className="numbers">23%</div>
                </div>
              </div>
              <div className="wrapper-block__right">
                <div className="table-block__one-right">
                  Условия получения скидки
                </div>
                {ordersTable.map((index, key) => (
                  <div key={index.id} className="table-block__two-right">
                    {index.conditions || "Закупка от 349 001 руб."}
                  </div>
                ))}
                {ordersTable.map((index, key) => (
                  <div key={index.id} className="table-block__three-right">
                    {index.conditions || "Закупка от 649 001 руб."}
                  </div>
                ))}
                {ordersTable.map((index, key) => (
                  <div key={index.id} className="table-block__four-right">
                    {index.conditions || "Закупка от 2 649 001 руб."}
                  </div>
                ))}
              </div>
            </div>
            <div className="separator-block"></div>
          </div>
          <div className="wrapper-main-news">
            <div className="wrapper-news__header">
              <div>
                <strong>
                  Оповещения, новости
                  <br />и персональные предложения:
                </strong>
              </div>
            </div>
            <div className="wrapper-news__articles">
              {newsData.map((index, key) => (
                <div key={index.id} className="articles">
                  <div className="wrapper-article__header">
                    <div className="articles-logo__mail"></div>
                    <p key={index.id}>
                      {index.date_now} {index.theme}
                    </p>
                  </div>
                  <p key={key.id} className="news-text">
                    {index.main_info}
                  </p>
                  <div className="wrapper-more__info">
                    <a href="/https://yandex.ru" alt="">
                      Подробнее...
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Main.propTypes = {
  main: PropTypes.array,
  security: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  main: state.main,
  security: state.security
});
export default connect(
  mapStateToProps,
  null                         //{getMainInfo}
)(Main);