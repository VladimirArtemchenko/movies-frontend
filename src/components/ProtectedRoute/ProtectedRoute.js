import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {() =>
        props.isLogin === true ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  );
}
