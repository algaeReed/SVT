import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react"; //路由懒加载  //Suspense必须使用这个 不然页面跳转时会报错
const App = lazy(() => import("../App"));
const Main = lazy(() => import("../layout/Main/Main"));
const About = lazy(() => import("../views/About/Index"));
const Setting = lazy(() => import("../views/Setting/Index"));
const Router = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<App></App>}>
            <Route path="/" index element={<Main></Main>}></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route path="/setting" element={<Setting></Setting>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
