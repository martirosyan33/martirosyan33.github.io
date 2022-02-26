import React from "react";
import { API_URL } from '../../configs'
import { query } from "../../core/helpers/query";
import Loading from "../common/Loading";
import Pagination from "./Pagination";
import Table from "./Table";
import './Table.css'

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            currencies: [],
            error: null,
            totalPages:5,
        }
    };

    componentDidMount() {
        const {history, location} = this.props
        const {page} = query(location.search);
        if(!page){  
            history.push({
                pathname: '/',
                search: `?page=1`,
              })
    
        }
       this.fetchCurrency(page || 1)
    }

    componentDidUpdate(prevProps){
        const {page:prevPage} = query(prevProps.location.search)
        const {page:nextPage} = query(this.props.location.search)
        if(prevPage !== nextPage){
            this.fetchCurrency(nextPage)
        }
    }

    fetchCurrency(page){
        this.setState({ isLoading: true });
        fetch(`${API_URL}&page=${page || 1}&per_page=20`)
            .then(data => {
                if (data.status === 200) {
                    return data.json()
                }
                throw Error()
            })
            .then((currencies) => {
                this.setState({
                    isLoading: false,
                    currencies,
                })
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error
                })
            })
    }
    
      handleChangePagination = (direction)=>{
        const {location, history} = this.props 
        let {page} = query(location.search);
        page = direction === 'next' ? +page + 1 : +page - 1
        history.push({
            pathname: '/',
            search: `?page=${page}`,
          })
    }

    render() {
        const { isLoading, currencies, error, totalPages } = this.state;
        const {location} = this.props
        const {page} = query(location.search);

        if (error) {
            return <div>Error</div>
        }
        if (isLoading) {
            return <div className="loading-container">
                <Loading />
            </div>
        }
        return (
            <>
            <Table currencies={currencies}/>
            <Pagination 
            page={+page || 1} 
            totalPages={totalPages}
            handleChangePagination={this.handleChangePagination}
            />
            </>
            )
    }
}
export default List