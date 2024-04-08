import { Link } from "react-router-dom";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useRef } from "react";
import axios from "axios";

export default function SignUp() {
  const fullNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const genderRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullName: fullNameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      gender: genderRef.current.value,
    };
    console.log(data);

    try {
      const res = await axios.post("/api/auth/signup", data);
      console.log("res", res.data);
    } catch (error) {
      console.log(error);
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
            >
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
