

// class Router {
//     static $container: HTMLElement;
//     static routes = [
//         { path: '/', ele: () => import("./pages/HomePage") },
//         { path: '/about', ele: () => import("./pages/AboutPage") },
//     ]
    

//     static init($container) {
//         this.$container = $container;
//         let currentPage = undefined;
        
//         const findMatchedRoute = () => {
//             return this.routes.find((route) => route.path.test(location.pathname));
//         };

//         const route = () => {
//             currentPage = null;
//             const TargetPage = findMatchedRoute()?.element;
//             currentPage = new TargetPage(this.$container);
//         };
//         window.addEventListener("historychange", (evt) => {
//             const { detail } = evt;
//             const { to, isReplace } = detail;
//             if (isReplace || to === location.pathname) {
//                 history.replaceState(null, "", to);
//             } else {
//                 history.pushState(null, "", to);
//             }
//             route();
//         });
//         window.addEventListener("popstate", () => {
//             route();
//         });
//     }
// }


// export default Router;