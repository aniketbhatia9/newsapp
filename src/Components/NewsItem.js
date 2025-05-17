import React, { Component } from "react";

export class NewsItem extends Component {
  
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <div style={{display : 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
        <span className="badge rounded-pill bg-danger" style={{zIndex: '1',display : 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
        {source} </span>
        </div>
        
          <img src={imageUrl ? imageUrl : "https://dims.apnews.com/dims4/default/7c4bf98/2147483647/strip/true/crop/3206x1803+0+167/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F61%2F42%2Fc7e213b8e7544f247ae8beb98b71%2Fbb95834739984a00b5a33367480b7b29"} className="card-img-top" alt="..." href="/" />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
