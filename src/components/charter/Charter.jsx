import React from "react";
import { withRouter } from "react-router";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class Charter extends React.Component{
    constructor() {
        super()
        this.state = {
            data : [],
        }
        this.charterRef = React.createRef();
    }

    outsideClick = (e) => {
        if(!this.charterRef.current.contains(e.target)) {
            this.props.handleIsShowCharter(e , false)
        }
    }
    
    async componentDidMount() {
        document.addEventListener('click', this.outsideClick)
        const {params} = this.props.match;
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=3`)
        const result = await response.json();
        const {prices} = result
        const priceModel = prices.map(item => item[1])
        this.setState({
            data: {
                series: [
                    {
                        name: "Price",
                        data: priceModel
                    }
                ]
            }})
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.outsideClick);
    }
    
    
    render() {
        return(
            <div ref={this.charterRef}>
                <HighchartsReact highcharts={Highcharts} options={this.state.data}/>
            </div>
        )
    }
}

export default withRouter(Charter);