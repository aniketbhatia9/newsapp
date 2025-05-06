import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    console.log("Hello from constructor of News component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };    
    document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - Daily News App`; 
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&category=${this.props.category}&apiKey=cf4ae8d766a74590bef50d88a4939ce1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);

    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&category=${this.props.category}&apiKey=cf4ae8d766a74590bef50d88a4939ce1&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);

    // let parsedData = await data.json();
    // this.setState({ page: this.state.page - 1, articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false });
    await this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    //   if (this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)) {

    //   }
    //   else{
    //   let url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&category=${this.props.category}&apiKey=cf4ae8d766a74590bef50d88a4939ce1&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({ page: this.state.page + 1, articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false });
    // }
    await this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  async componentDidMount() {
    //console.log("componentDidMount of News component");
    // Update the document title using the browser API
    //let url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&category=${this.props.category}&apiKey=cf4ae8d766a74590bef50d88a4939ce1";
    // let url =
    //   `https://newsapi.org/v2/top-headlines?q=${this.props.country}&category=${this.props.category}&apiKey=cf4ae8d766a74590bef50d88a4939ce1&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false });
    this.updateNews();
  }

  render() {
    return (
      <div className="container my-3">
        <h2
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontFamily: "monospace",
            margin: "35px 0px",
          }}
        >
          Daily News App - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines
        </h2>
        {/* {this.state.loading && <Spinner />} */}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    date={element.publishedAt ? element.publishedAt : "Unknown"}
                    source={
                      element.source.name ? element.source.name : "Unknown"
                    }
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
