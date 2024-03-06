import './NewsCard.css';

import { Comments } from '../Comments/Comments';

export const NewsDetailCard = ({ news }) => {
  return (
    <>
      <div className="page-container-news">
        <div className="containerNews">
          <h1 className="newsTitle">{news.title} </h1>
          <p className="newsShortContent"> {news.shortContent}</p>
          <p className="newsFullContent"> {news.fullContent}</p>
          <img className="imgNews" src={news.image} alt={news.name} />
          <p className="newsAuthor">{news.author}</p>
          <p className="newsTags">{news.tags}</p>
          <Comments comments={news.comments} />
        </div>
      </div>
    </>
  );
};
