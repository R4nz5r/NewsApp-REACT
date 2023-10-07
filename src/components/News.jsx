import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import { PropTypes } from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News`
    }
    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30)
        let perselData = await data.json();
        this.props.setProgress(70)
        this.setState({
            articles: perselData.articles,
            totalResults: perselData.totalResults,
            loading: false,
            totalResults: 0,
        });
        this.props.setProgress(100)
    }
    async componentDidMount() {
        this.updateNews()
    }
    
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let perselData = await data.json();
        this.setState({
            articles: this.state.articles.concat(perselData.articles),
            totalResults: perselData.totalResults,
             
        });
    };

    render() {
        return (

            <>
                <h1 className='text-center' style={{ margin: '40px 0px' }}>News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spiner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spiner />}
                >
                    <div className="container">
                        <div className='row '>
                            {this.state.articles.map((element) => {
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
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
