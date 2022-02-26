import React from "react";
import { API_URL } from "../../configs";
import Loading from "./Loading";
import { withRouter } from "react-router-dom";
import './Search.css'

class Search extends React.Component{
    constructor(){
        super()
        this.state = {
            currencies : [],
            searchQuery: '',
            searchResult: [],
            isLoading: false,
        }
    }

   async componentDidMount(){
       this.setState({isLoading:true})
       try {
           const response = await fetch(API_URL);
           const result = await response.json();
           this.setState({currencies:result, isLoading:false})
       } catch (error) {
        console.log(error);   
       }
   }

   handleChangeInput = (e) =>{
    const searchQuery = e.target.value;
    const {currencies} = this.state;

    this.setState({searchQuery})
    
    if(!searchQuery){
        this.setState({
            searchResult:[],
        })
        return
    }
    const charFromQuery = searchQuery.split('');
    this.setState({isLoading:true})

    setTimeout(()=>{
        const searchResult = currencies.filter(item =>{
            return charFromQuery.every(char => item.id.includes(char))
        });
        this.setState({
            searchResult,
            isLoading:false
        })
    },500)
   }

   handleRedirect(id){
       const {history} = this.props;
       history.push({
           pathname: `/currency/${id}`
       })
       this.setState({searchQuery: '', searchResult:[]})
   }

   renderSearchResults = ()=>{
    const {searchQuery, searchResult, isLoading} = this.state;
    if(!searchQuery){
        return ''
    }
    if(searchResult.length){
        return (
            <div className="Search-result-container">
            {searchResult.map(result =>
              <div
                key={result.id}
                className="Search-result"
                onClick={()=>this.handleRedirect(result.id)}
              >
                {result.name} ({result.symbol})
              </div>
            )}
          </div>
        )
    }
    if(!isLoading){
        return (
            <div className="Search-result-container">
                <div className="Search-no-result">
                  No results found.
                </div>
              </div>
        )
    }
   }

    render(){
        const {searchQuery, isLoading} = this.state
        return (
            <div className='Search'>
            <div>
              <span className="Search-icon" />
              <input 
                type="text"
                className="Search-input"
                placeholder="Currency name"
                value={searchQuery}
                onChange={this.handleChangeInput}
              />
               {
          isLoading &&
            <div className="Search-loading">
              <Loading
                width="12px"
                height="12px"
              />
            </div>}
            </div>
       {this.renderSearchResults()}     
          </div>
        )
    }
}
export default withRouter(Search);