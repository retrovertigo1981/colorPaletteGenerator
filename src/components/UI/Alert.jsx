import React from "react";
import { Link } from "react-router-dom";

// Definimos las props que aceptará nuestro componente
const Alert = ({
  message, // Mensaje principal del alert
  links = [], // Array de objetos con los enlaces
  onClose, // Función para cerrar el alert
  variant = "error", // Tipo de alerta (error, warning, info, success)
}) => {
  // Objeto con las variantes de color
  const variants = {
    error: {
      border: "border-red-300 dark:border-red-800",
      bg: "bg-red-50 dark:bg-gray-800",
      text: "text-red-800 dark:text-red-400",
      button: "text-red-500 hover:bg-red-200",
    },
    warning: {
      border: "border-yellow-300 dark:border-yellow-800",
      bg: "bg-yellow-50 dark:bg-gray-800",
      text: "text-yellow-800 dark:text-yellow-400",
      button: "text-yellow-500 hover:bg-yellow-200",
    },
    info: {
      border: "border-blue-300 dark:border-blue-800",
      bg: "bg-blue-50 dark:bg-gray-800",
      text: "text-blue-800 dark:text-blue-400",
      button: "text-blue-500 hover:bg-blue-200",
    },
    success: {
      border: "border-green-300 dark:border-green-800",
      bg: "bg-green-50 dark:bg-gray-800",
      text: "text-green-800 dark:text-green-400",
      button: "text-green-500 hover:bg-green-200",
    },
  };

  const currentVariant = variants[variant];

  return (
    <div
      className={`flex items-center p-4 border-t-4 ${currentVariant.border} ${currentVariant.bg} ${currentVariant.text}`}
      role="alert"
    >
      <svg
        className="shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="ms-3 text-sm font-medium">
        {message}{" "}
        {links.map((link, index) => (
          <React.Fragment key={link.to}>
            {index > 0 && " o "}
            <Link
              to={link.to}
              className="font-semibold underline hover:no-underline"
            >
              {link.text}
            </Link>
          </React.Fragment>
        ))}
      </div>
      {onClose && (
        <button
          type="button"
          className={`ms-auto -mx-1.5 -my-1.5 ${currentVariant.bg} ${currentVariant.button} rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:hover:bg-gray-700`}
          onClick={onClose}
          aria-label="Close"
        >
          <span className="sr-only">Dismiss</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export { Alert };
