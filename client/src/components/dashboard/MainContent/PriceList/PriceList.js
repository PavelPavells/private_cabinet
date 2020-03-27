import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Loader from "../../../common/Spinner";
//import { getPriceList } from "../../../../actions/priceListActions.js";
import site from "../../../../Global";
import "./PriceList.scss";

class PriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      search: "",
      login: "",
      offset: 0,
      page: 0,
      refresh: false,
      optionFilter: 15,
      groupByCategories: true,
      openElectronicControl: false,
      openDoorControl: true,
    };
  }
  componentDidMount() {
    axios
      .post(`${site}findPrice`, {
        offset: this.state.offset,
        size: this.state.optionFilter,
        login: this.props.data
      })
      .then(res => {
        this.setState({
          data: res.data,
          isLoading: true,
          optionFilter: this.state.optionFilter
        });
      })
      .catch(error => console.log(error));
  }
  updateSearch = event => {
    this.setState({ search: event.target.value })
  };
  handleSendSearch = event => {
    if(event.key === 'Enter') {

    }
    axios
      .post(`${site}findPrice`, {
        offset: this.state.offset,
	      size: this.state.optionFilter,
        value: this.state.search,
        login: this.props.data,
        search: this.state.search
      })
      .then(res => {
        this.setState({
          data: res.data,
          search: this.state.search
        });
      })
      .catch(error => console.log(error))
  }
  onChange = event => {
    this.setState({ [event.target.class]: event.target.value });
  };
  groupByCategory = event => {
    //event.preventDefault();
    let groupCategoryDoor = document.querySelector(".wrapper-table__header-door-controllers");
    groupCategoryDoor.classList.toggle("visible-block");
    let groupCategoryControllers = document.querySelector(".wrapper-table__header__checkpoint");
    groupCategoryControllers.classList.toggle("visible-block");
    this.setState({
      groupByCategories: !this.state.groupByCategories
    });
  };
  getFirstPage = () => {
    this.setState({ firstPage: this.state.firstPage })
    axios.post(`${site}findPrice`, {
      offset: this.state.offset,
      size: this.state.optionFilter,
      value: this.state.search,
      login: this.props.data
    })
    .then(res => {
      this.setState({
        data: res.data,
        offset: this.state.offset,
        size: this.state.optionFilter,
        page: 0
      })
    })
  }
  getPreviousPage = () => {
    let self = this;
    this.setState(prevState => {
      if(prevState.page > 0) {
        return {
          page: prevState.page - 1
        }
      }
    }, () => {
      axios.post(`${site}findPrice`, {
        offset: this.state.page,
        size: this.state.optionFilter,
        value: this.state.search,
        login: this.props.data
      })
      .then(res => {
        self.setState({
          data: res.data,
        })
      })
      .catch(error => console.log(error))
    })
  }
  getNextPage = () => {
    let self = this;
    this.setState(prevState => {
      return {
        page: prevState.page + 1
      }
    }, () => {
      axios.post(`${site}findPrice`, {
        offset: this.state.page,
        size: this.state.optionFilter,
        value: this.state.search,
        login: this.props.data
      })
      .then(res => {
        self.setState({
          data: res.data,
        })
      })
      .catch(error => console.log(error))
    })
  }
  getLastPage = () => {
    axios
      .post(`${site}getLastPage`, {
        offset: this.state.offset,
        size: this.state.optionFilter,
        login: this.props.data,
        value: this.state.search
      })
      .then(res => {
        this.setState({
          data: res.data,
          offset: this.state.offset,
          page: res.data.payload.page
        })
      })
    .catch(error => console.log(error))
  }
  handleRefreshData = () => {
    axios
      .post(`${site}findPrice`, {
        offset: this.state.offset,
        size: this.state.optionFilter,
        login: this.props.data
      })
      .then(res => {
        this.setState({
          data: res.data,
          isLoading: true,
          page: this.state.page,
          optionFilter: this.state.optionFilter
        });
      })
      .catch(error => console.log(error));
  };
  handleOptionFilter = event => {
    let self = this;
    let elem = event.target.value;
    this.setState({
        optionFilter: elem
      }, () => {
         axios
         .post(`${site}findPrice`, {
            offset: this.state.offset,
            size: this.state.optionFilter,
            value: this.state.search,
            login: this.props.data
         })
         .then(res => {
          self.setState({
            optionFilter: elem,
            data: res.data,
            isLoading: true
          });
        });
      }
    );
  };
  //toggleElectronicControl = event => {
  //  event.preventDefault();
  //  this.setState({ openElectronicControl: !this.state.openElectronicControl });
  //};
  //toggleDoorControl = event => {
  //  event.preventDefault();
  //  this.setState({ openDoorControl: !this.state.openDoorControl })
  //}
  render() {
    const {
      openElectronicControl,
      groupByCategories,
      isLoading,
      data
    } = this.state;
    if (!isLoading) {
      return <Loader />;
    } else {
      return (
        <main className="main-content">
          {/** ========================== HEADER TABLE ============================== */}

          <header style={{height: '7vh'}} className="wrapper-table__header">
            <section className="table__header-left">
              <div className="table__header-left-up">
                <div className="onoffswitch">
                  <input
                    type="checkbox"
                    name="onoffswitch"
                    className="onoffswitch-checkbox"
                    id="header-checkbox"
                    onClick={this.groupByCategory}
                  />
                  <label
                    className="onoffswitch-label"
                    htmlFor="header-checkbox"
                  >
                    <span className="onoffswitch-inner"></span>
                    <span className="onoffswitch-switch"></span>
                  </label>
                </div>
                <div>Сгруппировать по категориям</div>
              </div>
            </section>
            <section className="table__header-right">
              <form>
                <input
                  className="table__header-right-input"
                  type="text"
                  placeholder="Введите данные для поиска или фильтра"
                  value={this.state.search}
                  onChange={this.updateSearch}
                />
              </form>
              <div onClick={this.handleSendSearch} className="header_search"></div>
            </section>
          </header>

          {/** ========================== HEADER MAIN TABLE ============================== */}

          <section className="wrapper-table__main">
            <section className="wrapper-table__header">
                {data.payload.recordDisplayRules.map((index, key) => {
                  if(index.visible === 1) {
                    return (
                    <div key={index.field_name} className="name-of-product">
                      <div className="table-header__text">
                        <strong>{index.display_name}</strong>
                      </div>
                    </div>
                  )
                  } else {
                    return null;
                  }
                })}
            </section>

            {/** ========================== DOOR  TABLE ============================== */}

            <section className="wrapper-table__main-categories">
              <div className="wrapper-table__header-door-controllers visible-block">
                <div className="name-of-product__door-contollers">
                  <div className="toggle-down">
                    <div
                      onClick={this.toggleDoorControl}
                      className="name-of-product__img"
                    ></div>
                  </div>
                  <div
                    onClick={this.toggleDoorControl}
                    className="table-header__text"
                  >
                    <strong>Дверные контроллеры</strong>
                  </div>
                </div>
              </div>
              {groupByCategories ? (
                <div
                  className="wrapper-itype__name"
                >
                  {data.payload.recordSet.map((index, key) => (
                    <div key={index.item_uuid} className="wrapper-column">
                      <div className="toggle-itype-name" key={key.id}>
                        <div style={{textAlign: 'left', width: '90%'}}>{index.parent_itype_name}</div>
                      </div>
                      <div className="toggle-itype-name" key={key.id}>
                        <div style={{textAlign: 'left', width: '90%'}}>{index.itype_name}</div>
                      </div>
                      <div className="toggle-itype-name" key={key.id}>
                        <div>{index.item_article}</div>
                      </div>
                      <div className="toggle-itype-name" key={key.id}>
                        <div style={{textAlign: 'left', width: '90%'}}>{index.item_work_name}</div>
                      </div>
                      <div className="toggle-itype-name" key={key.id}>
                        <div>{index.price_type}</div>
                      </div>
                      <div className="toggle-itype-name" key={key.id}>
                        <div className="numbers">{index.price.toFixed(2)}</div>
                      </div>
                      <div className="toggle-itype-name" key={key.id}>
                        <div className="numbers">{index.discount_price.toFixed(2)}</div>
                      </div>
                      <div className="toggle-itype-name" key={key.id}>
                        <div>{index.currency_desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>

            {/** ========================== ELECTRONIC CONTROL  TABLE ============================== */}

            <section className="wrapper-table__main-categories">
              <div className="wrapper-table__header__checkpoint visible-block">
                <div className="name-of-product__checkpoint">
                  <div onClick={this.rotateArrow} className="toggle-down">
                    <div
                      onClick={this.toggleElectronicControl}
                      className="name-of-product__img-checkpoint"
                    ></div>
                  </div>
                  <div
                    onClick={this.toggleElectronicControl}
                    className="table-header__text"
                  >
                    <strong>Турникеты и электронные проходные</strong>
                  </div>
                </div>
              </div>
            </section>
            {openElectronicControl ? (
              <div
                className="wrapper-itype__name"
              >
                {data.payload.recordSet.map((index, key) => (
                  <div key={index.item_uuid} className="wrapper-column">
                    <div className="toggle-itype-name" key={key.id}>
                      {index.item_work_name}
                    </div>
                    <div className="toggle-item-article" key={key.id}>
                      {index.item_article}
                    </div>
                    <div className="toggle-price" key={key.id}>
                      {index.price}
                    </div>
                    <div className="toggle-retail-price" key={key.id}>
                      {index.retail_price}
                    </div>
                    <div className="toggle-discount-price" key={key.id}>
                      {index.discount_price}
                    </div>
                    {/*<div className="toggle-future-price" key={key.id}>{index.future_price}</div>*/}
                    <div className="toggle-product-card" key={key.id}>
                      {index.currency_desc}
                    </div>
                    <div className="toggle-product-card" key={key.id}>
                      {index.price_type}
                    </div>
                    <div className="toggle-product-card" key={key.id}>
                      {index.parent_itype_name}
                    </div>
                    <div className="toggle-product-card" key={key.id}>
                      {index.itype_name}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </section>

          {/** ========================== FOOTER TABLE ============================== */}

          <footer className="wrapper-table__footer">
            <section className="wrapper-table__footer-left">
              <div onClick={this.getFirstPage} className="footer-table__first-page"></div>
              <div onClick={this.getPreviousPage} className="footer-table__prev-page"></div>
              <div onClick={this.getNextPage} className="footer-table__next-page"></div>
              <div onClick={this.getLastPage} className="footer-table__last-page"></div>
              <div className="footer-table__options">
                <label>
                  <select
                    value={this.state.optionFilter}
                    onChange={this.handleOptionFilter}
                  >
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                  </select>
                </label>
              </div>
              <div className="footer-table__text">Позиций на странице</div>
            </section>
            <section className="wrapper-table__footer-right">
              <div className="footer-table__pages">
                {this.state.optionFilter} из {data.payload.countUUID}
              </div>
              {<Loader /> && <div onClick={this.handleRefreshData} className="footer-table__refresh-data"></div>}
            </section>
          </footer>
        </main>
      );
    }
  }
}
PriceList.propTypes = {
    priceList: PropTypes.array,
    security: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    priceList: state.priceList,
    security: state.security,
    price: state.price
});
export default connect(
  mapStateToProps, 
  null                                     //{ getPriceList }
)(PriceList);