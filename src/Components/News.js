import React, {useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?q=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(30);    
    setLoading(true);
    let data = await fetch(url);    
    props.setProgress(50);
    let parsedData = await data.json();    
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);    
    props.setProgress(100);
  }

  const handlePrevClick = async () => {
    setPage(page - 1);
    //await this.setState({ page: this.state.page - 1 });
    updateNews();
  };

  const handleNextClick = async () => {
    setPage(page + 1);
    //await this.setState({ page: this.state.page + 1 });
      updateNews();
  };

  const fetchMoreData = async () => {    
      let url = `https://newsapi.org/v2/top-headlines?q=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page + 1);
      let data = await fetch(url);
      let parsedData = await data.json();     
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setLoading(false);
  };


  useEffect(() => {    
      document.title = `${
      props.category.charAt(0).toUpperCase() + props.category.slice(1)
    } - Daily News App`; 
    updateNews();   
     // eslint-disable-next-line 
  },[]);
  
  
    return (
      <>
      <div className="container my-3">
        <h2
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontFamily: "monospace",
            margin: "35px 0px",
            marginTop: "90px",
          }}
        >
          Daily News App - Top{" "}
          {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
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
                      date={
                        element.publishedAt ? element.publishedAt : "Unknown"
                      }
                      source={
                        element.source.name ? element.source.name : "Unknown"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
      </>
    );
  }


  News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

export default News;
