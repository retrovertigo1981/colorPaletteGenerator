import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../../components/UI/Alert";

const RegisterForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signUp, loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();
  const [errorRegister, setErrorRegister] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    await loginWithGoogle();
    navigate("/generate");
  };

  const handleGithubLogin = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    await loginWithGithub();
    navigate("/generate");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(user.email, user.password);
      navigate("/");
    } catch (err) {
      if (
        err.code === "auth/email-already-in-use" ||
        err.code === "auth/weak-password" ||
        err.code === "auth/invalid-email"
      ) {
        setShowAlert(true);
        setErrorRegister(
          "Error al registrar el usuario, alguna de las credenciales no cumple con la validación",
        );
      }
    }
  };

  return (
    <>
      <section className="h-screen overflow-y-hidden">
        {showAlert && (
          <Alert
            message={errorRegister}
            onClose={handleCloseAlert}
            variant="error"
          />
        )}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Inicia sesion con tu cuenta
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tu email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between"></div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <hr className="my-8 border-gray-300 dark:border-gray-600" />
                <p className="text-center text-sm font-normal text-gray-500 dark:text-gray-400">
                  O inicia sesion con
                </p>
                <div className="flex justify-between w-full">
                  <button
                    type="submit"
                    className="w-32 sm:w-40 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleGoogleLogin}
                  >
                    <img
                      className="h-6 mx-auto"
                      src="./google-color-logo.svg"
                      alt="google logo"
                    />
                  </button>
                  <button
                    type="submit"
                    className="w-32 sm:w-40 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleGithubLogin}
                  >
                    <img
                      className="h-6 mx-auto"
                      src="./github-logo.svg"
                      alt="github logo"
                    />
                  </button>
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Ya tienes cuenta?
                  <a
                    href="/login"
                    className="ml-2 font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign-in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { RegisterForm };
