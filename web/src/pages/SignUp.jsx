import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Label,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useRef, useState } from "react";
import axios from "axios";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fullNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const genderRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fullName: fullNameRef.current.value.trim(),
      username: usernameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
      confirmPassword: confirmPasswordRef.current.value.trim(),
      gender: genderRef.current.value,
    };

    if (!data.username || !data.email || !data.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    console.log(data);

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post("/api/auth/signup", data);
      console.log("res.data", res.data);
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left Side */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
              Prodigit
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Welcome to Prodigit Blog. A place to sharp your skills and learn
          </p>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Full name" />
              <TextInput
                type="text"
                placeholder="Full name"
                id="fullName"
                required
                ref={fullNameRef}
              />
            </div>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                required
                ref={usernameRef}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                required
                ref={emailRef}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                required
                ref={passwordRef}
              />
            </div>
            <div>
              <Label value="Confirm password" />
              <TextInput
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                required
                ref={confirmPasswordRef}
              />
            </div>

            <div>
              <Label value="Gender" />
              <Select id="gender" ref={genderRef} required>
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </div>

            <Button
              gradientDuoTone="greenToBlue"
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
