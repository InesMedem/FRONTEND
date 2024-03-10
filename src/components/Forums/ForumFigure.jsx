import './ForumFigure.css';
import { useNavigate } from 'react-router';
import { LikeForum } from '../LikeButtonCompany/LikeButtonForum';

export const ForumFigure = ({ forum }) => {
  const navigate = useNavigate();
  const creationDate = new Date(forum.createdAt);
  const formattedDate = creationDate.toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
  });

  return (
    <div className="containerForum">
      <div
        className="section-consumer__image"
        style={{ backgroundImage: `url(${forum.image})` }}
      ></div>

      <div className="section-forum__text">
        <h2 className="forumTitle">{forum.title}</h2>
        <p className="forumCreation">{formattedDate}</p>
        <p className="forumContent">{forum.content}</p>
        <LikeForum id={forum._id} />
        <button
          className="button--blue"
          onClick={() => {
            navigate(`/forumDetail/${forum._id}`);
          }}
        >
          Enter forum
        </button>

        <div className="containerForumOwner">
          <h4 className="nameOwnerForum">{forum.owner.userName}</h4>

          <img
            className="imgOwnerForum"
            src={forum.owner.image}
            alt={forum.owner.userName}
          />
        </div>
      </div>
    </div>
  );
};
