import { useContext, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "../Utils/frebase"; // Ensure the path is correct
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../Context/UserContext"; // Corrected spelling of 'Context'
import AuthButton from "../Components/AuthButton"; // Ensure the path is correct

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [desc, setDesc] = useState(user?.desc || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // Update Profile Information
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const updateData = {
        username,
        email,
        phoneNumber,
        desc,
      };

      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, updateData);
      setUser({ ...user, ...updateData });
      setLoading(false);

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
    }
  };

  // Update Avatar Image
  const handleUpdateAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFile(URL.createObjectURL(file));
    
    setLoading(true);
    try {
      const storageRef = ref(storage, `users/${user.uid}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { avatar: url });
      setAvatar(url);
      setUser({ ...user, avatar: url });
      setLoading(false);

      console.log("Avatar updated successfully!");
    } catch (error) {
      console.error("Error updating avatar:", error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateProfile();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <label>
            <input
              type="file"
              className="hidden"
              onChange={handleUpdateAvatar}
            />
            <img
              src={file || avatar || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="rounded-full w-32 h-32 object-cover cursor-pointer"
            />
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Tell us about yourself"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <AuthButton text={loading ? "Updating..." : "Update Profile"} isLoading={loading} onClick={handleUpdateProfile} />
        </form>
      </div>
    </div>
  );
};

export default Profile;
