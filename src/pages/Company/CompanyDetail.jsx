import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useCommentError } from '../../hooks';

import { Comments } from '../../components/Comments/Comments';
import { CompanyDetailCard } from '../../components/Cards/ComapanyDetailCard';
import { getByIdCompany } from '../../services/company.service';
import { createComment, getByRecipient } from '../../services/comment.service';
import { toggleFavComments } from '../../services/user.service';
import { deleteComment } from '../../services/comment.service';

export const CompanyDetail = () => {
  const { id } = useParams();
  const { user, setUser } = useAuth();
  console.log('Entro likesComent', user);
  const [fullCompany, setFullCompany] = useState();
  const [send, setSend] = useState(false);
  const [resComment, setResComment] = useState({});
  const [contentValue, setContentValue] = useState('');
  const [comments, setComments] = useState([]);
  const [updateComments, setUpdateComments] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const fetchFullCompanies = async () => {
    setFullCompany(await getByIdCompany(id));
  };

  const handleComment = async () => {
    const customFormData = {
      owner: user,
      content: contentValue,
    };
    setSend(true);
    setResComment(await createComment(id, customFormData));
    setContentValue('');
    setSend(false);
  };

  const getComments = async () => {
    setComments(await getByRecipient('Company', id));
  };

  const handleLikeComment = async (commentId) => {
    try {
      const isLiked = user.favComments.includes(commentId);
      const updatedUser = {
        ...user,
        favComments: isLiked
          ? user.favComments.filter((id) => id !== commentId)
          : [...user.favComments, commentId],
      };
      setUser(updatedUser);

      await toggleFavComments(commentId);

      const updatedComments = await getByRecipient('Company', id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      if (Array.isArray(comments)) {
        const updatedComments = comments.filter((comment) => comment._id !== commentId);
        setComments(updatedComments);
      }
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
    }
  };

  useEffect(() => {
    fetchFullCompanies();
  }, [updateComments]);

  useEffect(() => {
    useCommentError(resComment, setResComment, setUpdateComments);
  }, [resComment, updateComments]);

  useEffect(() => {
    if (fullCompany != null) {
      getComments();
    }
  }, [fullCompany]);

  return (
    <>
      <div>{fullCompany?.data && <CompanyDetailCard company={fullCompany.data} />}</div>
      <section className="commentSection">
        <h6>Leave a comment</h6>
        <div className="addComment">
          <input
            className="input_user"
            type="text"
            id="content"
            value={contentValue}
            name="content"
            placeholder="comment content"
            onChange={(e) => setContentValue(e.target.value)}
          />
          <button
            className="button--blue"
            type="submit"
            disabled={send}
            onClick={() => handleComment()}
          >
            Add comment
          </button>
        </div>
        <div className="allComments">
          {comments &&
            comments?.data?.map((singleComment) => (
              <div key={singleComment?._id}>
                <p>{singleComment.content}</p>
                {user && user._id === singleComment.owner._id && (
                  <button onClick={() => handleDeleteComment(singleComment._id)}>
                    Delete
                  </button>
                )}
                <button onClick={() => handleLikeComment(singleComment._id)}>Like</button>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};
