import { Link } from "react-router-dom";
import { Button, Label, Select, TextInput } from "flowbite-react";

export default function SignUp() {
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
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <div>
              <Label value="Confirm password" />
              <TextInput
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
              />
            </div>

            <div>
              <Label value="Gender" />
              <Select id="gender">
                <option>Male</option>
                <option>Female</option>
              </Select>
            </div>

            <Button gradientDuoTone="greenToBlue" type="submit">
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
