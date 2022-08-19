import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,date,author,source}=this.props
    return (
      <div>
            <div className="card" style={{width: "18rem"}}>
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{title}</h5><span className="badge text-bg-info">{source}</span>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">Last updated on {new Date(date).toUTCString()} by {author?author:"Unknown"}</small></p>
            <a href={newsUrl}  rel="noreferrer" target="_blank" className="btn btn-primary">Read More</a>
  </div>
</div>
 

      </div>
    )
  }
}

export default NewsItem
