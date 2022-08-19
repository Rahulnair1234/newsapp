import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
     static defaultProps={
      country:"in",
      category:"general",
      apikey:process.env.REACT_APP_APIKEY,
      pagesize:6,
      
     }
     static propTypes={
      country:PropTypes.string,
      category:PropTypes.string,
      apikey:PropTypes.string,
      pagesize:PropTypes.number,
   
     }
        
      
    async componentDidMount(){
  
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pagesize=${this.props.pagesize}&page=1`;
      this.setState({loading:true});
      let data= await fetch(url);
      let parsedData=await data.json();
      this.setState({articles : parsedData.articles,totalResults:parsedData.totalResults,loading:false})

    }
   
     
    constructor(){
        super();
        console.log("Hello i am a constructor from news");
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0

        }
    }
    // handlePrevClick=async()=>{
    //   console.log("previous");
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pagesize=${this.props.pagesize}&page=${(this.state.page-1)}`;
    //   this.setState({loading:true});
    //   let data= await fetch(url);
    //   let parsedData=await data.json();
     
    //   this.setState({
    //     page:this.state.page-1,
    //     articles : parsedData.articles,
    //     loading:false
    //   })
    // }
    // handleNextClick=async()=>{
    //   console.log("next");
     
    
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pagesize=${this.props.pagesize}&page=${(this.state.page + 1)}`;
    //   this.setState({loading:true});
    //   let data= await fetch(url);
    //   let parsedData=await data.json();
     
    //   this.setState({
    //     page:this.state.page+1,
    //     articles : parsedData.articles,
    //     loading:false
    //   })
    // }
    fetchMoreData=async()=>{
      this.setState({
        page:this.state.page+1
      })
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pagesize=${this.props.pagesize}&page=${(this.state.page + 1)}`;
     
      let data= await fetch(url);
      let parsedData=await data.json();
     
      this.setState({
        page:this.state.page+1,
        articles : this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
        loading:false
      })
    }
  render() {
    return (
       <>
     
        <h1 className='text-center'style={{margin:"40px" ,marginTop:"90px"}}>NewsMonkey Top Headlines</h1>
         {(this.state.loading)&&<Spinner/>}      
         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={this.state.articles.length!==this.state.totalResults?<Spinner/>:<h3>No more news to fetch</h3>}
        >
          <div className='container'>
        <div className="row mx -2 my-3" >
        {this.state.articles.map((element)=>{
         return <div className="col-md-4" key={element.url}>
                 <NewsItem title={element.title?element.title.slice(0,40)+"...":""}source={element.source.name} date={element.publishedAt} author={element.author}description={element.description?element.description.slice(0,50)+"...":""} newsUrl={element.url} imageUrl={element.urlToImage?element.urlToImage:"https://imgs.search.brave.com/UGqZxAmjJzjMUF7oPj_NGZ4pBqmx3gvAvSkouS39mro/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5m/QzRGVU40SmtTX1dX/dXhfNDZVY3VnSGFF/SyZwaWQ9QXBp"}/>
                 </div>
        })}
         </div>  
        </div>
        </InfiniteScroll>
        
        

     
      </>
    )
  }
}

export default News
