import { redirect } from "react-router-dom";

export function loader() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("expiration");
  return redirect("/auth?mode=login");
}
