import { registerAccountGame } from "@/api/account/register";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";

interface ServerRegisterProps {
  serverName: string;
  expansion: string;
  jwt: string | null;
}

const ServerRegister: React.FC<ServerRegisterProps> = ({
  serverName,
  expansion,
  jwt,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "xxxxxxxxxxxx",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (!password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "yyyyyyyyyyyyyyy",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (password.trim().length < 5 || password.trim().length > 30) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "hbb",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }
    setIsSubmitting(true);

    try {
      await registerAccountGame(
        {
          username: username,
          password: password,
          realm_name: serverName,
          expansion: expansion,
          game_mail: username,
        },
        jwt || ""
      );

      router.push("/accounts");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div
      id="register"
      className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-3xl font-bold text-yellow-400 sm:text-4xl">
          Únete a la Batalla
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-300 text-2xl">
          El reino espera a su próxima leyenda. Traza tu camino, desafía la
          oscuridad y demuestra tu fuerza en la aventura definitiva.
        </p>

        <form
          action="#"
          className="mt-6 mb-0 space-y-4 rounded-lg bg-black/30 p-4 shadow-lg sm:p-6 lg:p-8"
          onSubmit={handleFormSubmit}
        >
          <p className="text-center text-lg font-medium text-white">
            Crea tu legado. Registrate ahora.
          </p>

          <div>
            <label htmlFor="email" className="sr-only">
              Ingresar usuario
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-700 bg-gray-900 p-4 pe-12 text-sm text-white shadow-xs"
                placeholder="Introduce tu usuario"
                value={username}
                onChange={handleUsernameChange}
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-700 bg-gray-900 p-4 pe-12 text-sm text-white shadow-xs"
                placeholder="Introduce tu contraseña"
                value={password}
                maxLength={20}
                onChange={handlePasswordChange}
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={20}
                className="w-full rounded-lg border-gray-700 bg-gray-900 p-4 pe-12 text-sm text-white shadow-xs"
                placeholder="Confirmar tu contraseña"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-yellow-500 px-5 py-3 text-sm font-medium text-black transition hover:bg-yellow-400"
          >
            Entra al Reino
          </button>

          <p className="text-center text-sm text-gray-400">
            ¿Eres Viejo en la batalla?{" "}
            <a
              className="underline text-yellow-400 hover:text-yellow-300"
              href="#"
            >
              Mis cuentas
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ServerRegister;
