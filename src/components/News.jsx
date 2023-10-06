import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import { PropTypes } from "prop-types";
export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize:6,
        category: 'general',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba95f2ea17454dfd89b9a75debbf2fb0&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let perselData = await data.json();
        this.setState({
            articles: perselData.articles,
            totalResults: perselData.totalResults,
            loading: false,
        });
    }
    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba95f2ea17454dfd89b9a75debbf2fb0&page=${this.state.page - 1} 
        &pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let perselData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: perselData.articles,
            loading: false,
        })
    }
    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba95f2ea17454dfd89b9a75debbf2fb0&page=${this.state.page + 1}
        &pageSize=${this.props.pageSize}`
            this.setState({ loading: true })
            let data = await fetch(url);
            let perselData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: perselData.articles,
                loading: false,
            })
        }
    }


    render() {
        return (

            <div className='container my-3'>
                <h1 className='text-center' style={{margin:'40px 0px'}}>Top Headlines</h1>
                {this.state.loading && <Spiner />}
                <div className='row '>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ''}
                                    description={element.description ? element.description : ''}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type='button' className="btn btn-danger" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className="btn btn-danger" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
