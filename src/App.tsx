import { ReactNode, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoneLayout from "./components/Layouts/NoneLayout";
import NotFound from "./components/Layouts/NotFound";
import { privateRoutes, publicRoutes } from "./routers";
import PrivateRoute from "./routers/PrivateRoute";
import { useAppDispatch } from "./store/hooks";
import { getAllTopic } from "./store/reducers/dataSlice";

function App() {
  const dispatch = useAppDispatch()
useEffect(() =>{
  dispatch(getAllTopic())
},[])

  return (
    <>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout: ({
              children
            }: {
              children: ReactNode;
            }) => JSX.Element = route.layout || NoneLayout;

            return (
              <Route
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
                key={index}
              />
            );
          })}

          {privateRoutes.map((route, index) => {
            const Page = route.component;
            const Layout: ({
              children
            }: {
              children: ReactNode;
            }) => JSX.Element = route.layout || NoneLayout;

            return (
              <Route
                path={route.path}
                element={
                  <Layout>
                    <PrivateRoute component={Page} />
                  </Layout>
                }
                key={index}
              />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
