import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const LoginForm = () => {
  return (
    <div id="login-form">
      <h1>Iniciar Sesión</h1>
      <p>Bienvenido de nuevo</p>
      <form>
        <div className="form-group">
          <input type="text" required />
          <label>Correo Electrónico</label>
        </div>
        <div className="form-group">
          <input type="password" required />
          <label>Contraseña</label>
        </div>
        <button type="submit">Iniciar Sesión</button>
        <div id="login-footer">
          <p>
            ¿No tienes cuenta? <Link to="/register">Registrate</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
