import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

const Comment = ({ comment, onLike, onEdit }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${comment.userId}`);
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  const handleEditComment = async () => {
    try {
      setIsEditing(true);
      setEditedContent(comment.content);
    } catch (error) {
      setIsEditing(false);
      console.log(error);
    }
  };
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/comment/editcomments/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });
      if (response.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex p-4 border-b dark:border-gray-600 text-sm ">
      <div className="flex-shrink-0">
        <img
          src={user.photoProfile}
          alt={user.username}
          className="w-10 h-10 rounded-full bg-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center ">
          <span className="font-bold ml-1 text-sm truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs ml-1">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              value={editedContent}
              className="mt-1 ml-1"
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs mt-1">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save Changes
              </Button>
              <Button
                type="button"
                size="sm"
                outline
                gradientDuoTone="purpleToBlue"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 mb-2 ml-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t darK:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm " />
              </button>
              <p className="text-gray-400">
                {comment.numbersOfLikes > 0 &&
                  comment.numbersOfLikes +
                    " " +
                    (comment.numbersOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <button
                    type="button"
                    className="text-gray-400 hover:text-blue-500"
                    onClick={handleEditComment}
                  >
                    Edit
                  </button>
                )}
              <span className="text-gray-400">Delete</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Comment;
