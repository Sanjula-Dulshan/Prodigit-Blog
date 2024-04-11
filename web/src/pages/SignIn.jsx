import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import axios from "axios";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    };

    if (!data.email || !data.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    console.log(data);

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post("/api/auth/login", data);
      console.log("res.data", res.data);
      setLoading(false);
      navigate("/");
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
                placeholder="********"
                id="password"
                required
                ref={passwordRef}
              />
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
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don&apos;t have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
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
