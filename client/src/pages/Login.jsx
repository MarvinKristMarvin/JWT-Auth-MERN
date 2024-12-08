import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      console.log("try login");
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      console.log("Response data:", data);
      if (data.error) {
        console.log("error");
        toast.error(data.error);
      } else {
        // empty the form
        console.log("no error");
        setData({});
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("catch");
      console.log(error);
    }
  };
  return (
    <div>
      <form action="" onSubmit={loginUser}>
        <label htmlFor="">Email</label>
        <input
          type="email"
          placeholder="enter email..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="enter password..."
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
