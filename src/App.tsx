import { Routes, Route } from "react-router-dom";

import {
  Home,
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers,
} from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignupForm from "@/_auth/forms/SignupForm";
import SigninForm from "@/_auth/forms/SigninForm";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import Feedback from "./_root/pages/Feedback";
import { XXX } from "./XXX";
import { Teams } from "./_root/pages/Teams";
import { TeamPage } from "./_root/pages/TeamPage";
import { CreateTeamPost } from "./_root/pages/CreateTeamPost";


const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
          <Route index path="/x" element={<XXX />} />

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/profile/:id/feedback" element={<Feedback />} />

          {/* TEAMS ROOTS */}
          
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamPage />} />
          <Route path="/teams/:id/create" element={<CreateTeamPost />} />
          {/* page dyal feeds teams x */}

          {/* page de create / modificaiton d'un team */}

          {/* page de creation de poste d'un team */}
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
