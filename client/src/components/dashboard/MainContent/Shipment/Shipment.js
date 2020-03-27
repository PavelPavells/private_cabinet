import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import axios from "axios";
import Loader from "../../../common/Spinner";
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import site from "../../../../Global";
//import { getOrders } from "../../../../actions/getOrders.js";
import "./Shipment.scss";
class Shipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          isLoading: false,
          search: "",
          login: "",
          startDate: null,
          endDate: null,
          offset: 0,
          page: 0,
          refresh: false,
          optionFilter: 15,
          toggleMoreShipment: false,
        };
      }
      componentDidMount() {
        axios
          .post(`${site}sortBetweenPartnerShipments`, {
            offset: this.state.offset,
            size: this.state.optionFilter,
            login: this.props.data
          })
          .then(res => {
            this.setState({
              data: res.data,
              isLoading: true,
              optionFilter: this.state.optionFilter,
            });
          })
          .catch(error => console.log(error));
      }
      updateSearch = event => {
        this.setState({ search: event.target.value })
      };
      onDatesChange = ({startDate, endDate}) => {
        this.setState({startDate, endDate}, () => {
          axios
            .post(`${site}sortBetweenPartnerShipments`, {
              offset: this.state.offset,
              size: this.state.optionFilter,
              startDate: this.state.startDate ? this.state.startDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') : null, // eslint-disable-line
              endDate: this.state.endDate ? this.state.endDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') : null, // eslint-disable-line
              login: this.props.data
            })
            .then(res => {
              this.setState({
                data: res.data,   /// ADD startDate && endDate
              })
            })
        })
      }
      handleSendSearch = () => {
        axios
          .post(`${site}findPrice`, {
            offset: this.state.offset,
            size: this.state.optionFilter,
            value: this.state.search,
            login: this.props.data
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
      getFirstPage = () => {
        this.setState({ firstPage: this.state.firstPage })
        axios.post(`${site}sortBetweenPartnerShipments`, {
          offset: this.state.offset,
          size: this.state.optionFilter,
          login: this.props.data,
          startDate: this.state.startDate ? this.state.startDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') : null, // eslint-disable-line
          endDate: this.state.endDate ? this.state.endDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') : null, // eslint-disable-line
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
          axios.post(`${site}sortBetweenPartnerShipments`, {
            offset: this.state.page,
            size: this.state.optionFilter,
            login: this.props.data,
            startDate: this.state.startDate ? this.state.startDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') : null, // eslint-disable-line
            endDate: this.state.endDate ? this.state.endDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') : null, // eslint-disable-line
          })
          .then(res => {
            self.setState({
              data: res.data
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
          axios.post(`${site}sortBetweenPartnerShipments`, {
            offset: this.state.page,
            size: this.state.optionFilter,
            login: this.props.data,
            startDate: this.state.startDate ? this.state.startDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') : null, // eslint-disable-line
            endDate: this.state.endDate ? this.state.endDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') : null, // eslint-disable-line
          })
          .then(res => {
            self.setState({
              data: res.data
            })
          })
          .catch(error => console.log(error))
        })
      }
      getLastPage = () => {
        axios
          .post(`${site}findLastPartnerShipments`, {
            offset: this.state.offset,
            size: this.state.optionFilter,
            login: this.props.data,
            startDate: this.state.startDate ? this.state.startDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') : null, // eslint-disable-line
            endDate: this.state.endDate ? this.state.endDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') : null, // eslint-disable-line
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
          .post(`${site}sortBetweenPartnerShipments`, {
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
      };
      handleOptionFilter = event => {
        let self = this;
        let elem = event.target.value;
        this.setState({
            optionFilter: elem
          }, () => {
             axios
             .post(`${site}sortBetweenPartnerShipments`, {
                offset: this.state.offset,
                size: this.state.optionFilter,
                startDate: this.state.startDate ? this.state.startDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') : null, // eslint-disable-line
                endDate: this.state.endDate ? this.state.endDate._d.toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') : null, // eslint-disable-line
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
      toggleElectronicControl = event => {
        event.preventDefault();
        this.setState({ openElectronicControl: !this.state.openElectronicControl });
      };
      toggleDoorControl = event => {
        event.preventDefault();
        this.setState({ openDoorControl: !this.state.openDoorControl })
      }
      toggleMoreShipment = event => {
        event.stopPropagation()
        this.setState({ toggleMoreShipment: this.state.toggleMoreShipment }) //!
      }
      render() {
        const { isLoading, data } = this.state;
        //console.log(data.payload);
        //console.log(this.props.data)
        //console.log(this.state.page)
        //console.log(this.state.startDate)
        //console.log(this.state.endDate)
        if (!isLoading) {
          return <Loader />;
        } else {
          return (
            <main className="main-content">
              {/** ========================== HEADER TABLE ============================== */}
              <header className="wrapper-table__header">
                <section className="table__header-left">
                </section>
                <section className="table__header-right">
                  <form>
                  <DateRangePicker
                      anchorDirection="left"
                      block={false}
                      customArrowIcon={null}
                      customCloseIcon={null}
                      customInputIcon={null}
                      disabled={false}
                      displayFormat={function noRefCheck(){}}
                      enableOutsideDays={false}
                      horizontalMargin={0}
                      initialVisibleMonth={null}
                      isDayBlocked={function noRefCheck(){}}
                      isDayHighlighted={function noRefCheck(){}}
                      isOutsideRange={function noRefCheck(){}}
                      startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                      onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                      focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                      onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                      startDatePlaceholderText="Дата начала"
                      endDatePlaceholderText="Дата конца"
                      showClearDates
                      navNext={null}
                      navPosition="navPositionTop"
                      navPrev={null}
                      onNextMonthClick={function noRefCheck(){}}
                      onPrevMonthClick={function noRefCheck(){}}
                    />
                  </form>
                </section>
              </header>
    
              {/** ========================== HEADER MAIN TABLE ============================== */}
    
              <section className="wrapper-table__main-shipment">
                <section className="wrapper-table__header-shipment">
                    {data.payload.recordDisplayRules.map((index, key) => {
                      if(index.visible === 1) {
                        return (
                          <div key={index.field_name} className="name-of-product">
                            <div className="table-header__text" style={{textAlign: 'center'}}>
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
                    <div className="wrapper-itype__name">
                      {data.payload.recordSet.map((index, key) => (
                        <div key={index.pshipment_uuid} className="wrapper-column">
                          <div className="toggle-itype-name-shipment">
                            <div className="toggle-itype-name__inside">
                              {/*
                              <div onClick={this.toggleMoreShipment} className="toggle-itype-name__inside-photo">
                                 {toggleMoreShipment ? (
                                    <div>HELLO!!!!!!!!!!!!!!!!!!!!!!!!</div>
                                  ) : null} 
                              </div>
                                 */}
                              {index.pshipment_id}
                            </div>
                          </div>
                          <div className="toggle-itype-name-shipment">
                            <div className="numbers">{index.create_date.replace(/([^T]+)T([^\.]+).*/g, '$1 $2')}</div> {/* eslint-disable-line */}
                          </div>
                          <div className="toggle-itype-name-shipment">
                            <div>{index.currency_name}</div>
                          </div>
                          <div className="toggle-itype-name-shipment">
                            <div className="numbers">{index.pshipment_sum.toFixed(1)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                </section>
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
Shipment.propTypes = {
   orders: PropTypes.array
}
const mapStateToProps = state => ({
  security: state.security,
  //orders: state.orders                        // FOR REDUX SETTINGS
})
export default connect(
  mapStateToProps,
  null                                        //{ getOrders }
)(Shipment)