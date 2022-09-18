import { ReactNode } from "react";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import HomePage from "../pages/HomePage/HomePage";
import AdminLogin from '../pages/Admin/HomePage/Login'
import AdminHomePage from '../pages/Admin/HomePage/HomePage'
import AddTopic from "../pages/Admin/AddTopic/AddTopic";
import AddVideo from "../pages/Admin/AddVideo/AddVideo";
import VideoDetail from "../pages/VideoDetail/VideoDetail";
import EditVideo from "../pages/EditVideo/EditVideo";
import EditTopic from "../pages/Admin/EditTopic/EditTopic";
import VideoCounting from "../pages/Admin/VideoCounting/VideoCounting";

interface IRouter {
    path: string;
    component: () => JSX.Element;
    layout?: ({ children }: { children: ReactNode }) => JSX.Element;
  }

export const publicRoutes : IRouter[]=[
  { path: '/', component: HomePage, layout: DefaultLayout },
  {path:'/070699/admin',component:AdminLogin},
  {path:'/video/:id',component:VideoDetail ,layout: DefaultLayout},
]

export const privateRoutes : IRouter[] =[
  {path:'/070699/admin/index',component:AdminHomePage ,layout: DefaultLayout},
  {path:'/070699/admin/add-topic',component:AddTopic},
  {path:'/070699/admin/add-video',component:AddVideo},
  {path:'/070699/admin/edit-video/:id',component:EditVideo},
  {path:'/070699/admin/edit-topic',component:EditTopic},
  {path:'/070699/admin/get-all-video',component:VideoCounting},
]