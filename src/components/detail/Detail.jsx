import React from "react";
import { getCurrencyURL } from '../../configs';
import Loading from "../common/Loading";
import { renderChangePercent } from '../../core/helpers/renderChangePercent'
import './Detail.css'
import { Charter } from "..";


class Detail extends React.Component {
  constructor() {
    super()
    this.state = {
      error: null,
      isLoading: false,
      currency: {},
      isShowCharter: false,
    }
  }
  componentDidMount() {
    this.getCurrencyInfoById()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getCurrencyInfoById()
    }
  }

  getCurrencyInfoById = async () => {
    const url = getCurrencyURL(this.props.match.params.id)
    this.setState({ isLoading: true })
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result, 'result');
      this.setState({ currency: result[0], isLoading: false })
    } catch (error) {
      this.setState({ error, isLoading: false })
    }
  }

  handleIsShowCharter = (e, isShow)=> {
    e.stopPropagation()

    this.setState((prev) =>(
      {isShowCharter: isShow && !prev.isShowCharter ? true : false}
    ))
  }


  render() {
    const { currency, isLoading, error, isShowCharter } = this.state;
    if (error) {
      return <div>Error...</div>
    }
    if (isLoading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>)
    }
    return (
      <>
        {isShowCharter && <Charter handleIsShowCharter={this.handleIsShowCharter} />}
        <div className="Detail">
          <h1 className="Detail-heading">
            <img 
            src={`${currency.image}`} 
            alt="currency_image" 
            onClick={(e)=>this.handleIsShowCharter(e, true)} 
            />
            {currency.name} ({currency.symbol})
          </h1>

          <div className="Detail-container">
            <div className="Detail-item">
              Price <span className="Detail-value">$ {currency.current_price}</span>
            </div>
            <div className="Detail-item">
              Rank <span className="Detail-value">{currency.market_cap_rank}</span>
            </div>
            <div className="Detail-item">
              24H Change
              <span className="Detail-value">{renderChangePercent(currency.market_cap_change_percentage_24h)}</span>
            </div>
            <div className="Detail-item">
              24H Change
              <span className="Detail-value">
                $ {currency.price_change_24h}
              </span>
            </div>

            <div className="Detail-item">
              <span className="Detail-title">Market cap</span>
              <span className="Detail-dollar">$</span>
              {currency.market_cap}
            </div>
            <div className="Detail-item">
              <span className="Detail-title">Total volume</span>
              {currency.total_volume}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Detail;  