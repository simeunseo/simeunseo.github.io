// App 컴포넌트
import Error404 from "./pages/error404";
import Home from "./pages/home";
import MyCategory from "./pages/mycategory";

const ROUTE_LIST = [
  { path: "/", element: Home },
  { path: "/mycategory", element: MyCategory },
];

function App($container) {
  this.$container = $container;
  let currentPage = undefined;

  const init = () => {
    const findMatchedRoute = () =>
      ROUTE_LIST.find((route) => route.path === location.pathname);

    const route = () => {
      currentPage = null;
      const TargetPage = findMatchedRoute()?.element || Error404;
      currentPage = new TargetPage(this.$container);
    };

    route();
  };
  init();
}
export default App;
