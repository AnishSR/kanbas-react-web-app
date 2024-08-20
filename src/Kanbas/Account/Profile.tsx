import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
    } catch (err: any) {
      navigate("/Kanbas/Account/Signin");
    }
  };
  const saveProfile = async () => {
    console.log("Profile object being sent:", profile);
    try {
        const updatedProfile = await client.updateProfile(profile);
        console.log("Updated Profile from backend:", updatedProfile);
        dispatch(setCurrentUser(updatedProfile));
        alert("Profile updated successfully!");
    } catch (err: any) {
        console.error("Error updating profile:", err);
        alert("Failed to update profile.");
    }
};
  
  const dispatch = useDispatch();
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => { fetchProfile(); }, []);
  return (
    <div className="wd-profile-screen container mt-4">
      <h1 className="mb-4 text-center">Profile</h1>
      {profile && (
        <div className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="wd-username">Username</label>
            <input
              id="wd-username"
              className="wd-username form-control"
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="wd-password">Password</label>
            <input
              id="wd-password"
              className="wd-password form-control"
              value={profile.password}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              type="password"
            />
          </div>
          <div>
            <label htmlFor="wd-firstname">First Name</label>
            <input
              id="wd-firstname"
              className="wd-firstname form-control"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="wd-lastname">Last Name</label>
            <input
              id="wd-lastname"
              className="wd-lastname form-control"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="wd-dob">Date of Birth</label>
            <input
              id="wd-dob"
              className="wd-dob form-control"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              type="date"
            />
          </div>
          <div>
            <label htmlFor="wd-email">Email</label>
            <input
              id="wd-email"
              className="wd-email form-control"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="wd-role">Role</label>
            <select
              id="wd-role"
              className="wd-role form-select"
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
          {/*
          <button onClick={saveProfile} className="wd-save-btn btn btn-primary w-100">
            Save
          </button>
          */}
          <button onClick={signout} className="wd-signout-btn btn btn-danger w-100">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

