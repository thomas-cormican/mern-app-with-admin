import React, { useContext } from "react";

import { AuthContext } from "../context/auth-context";

export default function Home() {
  const auth = useContext(AuthContext);

  return auth.user && <h1>Hello {auth.user.username}</h1>;
}
