import { Alert, Button, Modal, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const response = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          content: comment,
          userId: currentUser._id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setComment("");
        setCommentError(null);
        setComments([...comments, data]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comment/getcomments/${postId}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-up");
        return;
      }
      const response = await fetch(`/api/comment/likecomments/${commentId}`, {
        method: "PUT",
      });
      if (response.ok) {
        const data = await response.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numbersOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };
  const handleDeleteComment = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-up");
        return;
      }
      const response = await fetch(`/api/comment/deletecomments/${commentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            src={currentUser.photoProfile}
            className="h-5 w-5 rounded-full object-cover"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            {" "}
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be logged in to comment.
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      )}
      {currentUser && (
        <form className="border border-teal-500 rounded-md p-3">
          <Textarea
            placeholder="Add a comments"
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-500 text-sm">
              {200 - comment.length} charaters remaining
            </p>
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert className="mt-5" color="failure">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments && comments.length == 0 ? (
        <p className="text-gray-500 text-sm my-5">No comments yet</p>
      ) : (
        <>
          <div className="flex gap-1 mt-3  items-center">
            <p>Comments</p>
            <div className="border border-gray-500  px-2 rounded-sm ">
              <p>{comments && comments.length}</p>
            </div>
          </div>
          {comments &&
            comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={(commentId) => {
                  setShowModal(true);
                  setCommentToDelete(commentId);
                }}
              />
            ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDeleteComment(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default CommentSection;
