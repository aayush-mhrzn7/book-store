import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Authentication({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  useEffect(() => {
    if (authentication && status !== authentication) {
      navigate("/login");
    } else if (!authentication && status !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authentication, status]);
  return loader ? <h1>loading....</h1> : <>{children};</>;
}
