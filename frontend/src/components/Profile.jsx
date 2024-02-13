import { useSelector } from "react-redux";
import { Alert, Button, Progress, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploading, setImageUploading] = useState(null);
  const [imageUploadingError, setImageUploadingError] = useState(null);
  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);
  const uploadImage = async () => {
    setImageUploading(true);
    setImageUploadingError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on('state_changed', (snapshot) => {
      const progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageUploading(progess.toFixed(0));
    },
      (error) => {
        setImageUploadingError("Couldn't upload the image (File must be less than 2 MB)");
        setImageUploading(null);
        setImage(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageUploadingError(false);
        });
      })

  };
  const handleSubmit = (e) => {
    e.preventDefault;
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/**"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center relative cursor-pointer shadow-sm overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {
            imageUploading && (
              <CircularProgressbar value={imageUploading || 0} text={`${imageUploading}%`} strokeWidth={5} styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  left: '0',
                  top: '0',
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageUploading / 100})`,
                },
              }} />
            )
          }
          <img
            src={imageFileUrl || currentUser.photoProfile}
            alt="Image of an user"
            className={`rounded-full w-full h-full border-8 object-cover border-[lightgray] ${imageUploading && imageUploading < 100 && 'opacity-60'} `}
          />
        </div>
        {
          imageUploadingError && <Alert color='failure'>{imageUploadingError}</Alert>
        }
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
        <div className="text-red-500 flex justify-between mt-3">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
};

export default Profile;
