import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'sports'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    console.log("hello")
    this.state= {
        articles: [],
        loading: false,
        page: 1
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7af41eb596214a40b3cd73d6548de964&page=1&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
  }

  handlePrevClick = async()=> {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7af41eb596214a40b3cd73d6548de964&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json()
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles
      })
  }

  handleNextClick = async()=> {
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }else{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7af41eb596214a40b3cd73d6548de964&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json()
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
  }}

  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{margin: '35px, 0px'}}>NewsPatrix-Sports Headlines</h1>
        <div className="row">
          {this.state.articles.map((element)=> {
            return  <div className="col-md-4" key={element.url}>
            <Newsitem title={element.title} description={element.description} imageUrl = {element.urlToImage} newsUrl={element.url}/> 
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
