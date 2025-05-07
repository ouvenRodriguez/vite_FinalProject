import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

const RegisterForm = () => {
  return (
    <div id="register-form">
      <h1>Registrarse</h1>
      <p>¡Bienvenido! Crea una cuenta para comenzar.</p>
      <form>
        <div className="form-group">
          <input type="text" required />
          <label>Nombre</label>
        </div>
        <div className="form-group">
          <input type="text" required />
          <label>Apellido</label>
        </div>
        <div className="form-group">
          <input type="text" required />
          <label>Correo Electrónico</label>
        </div>
        <div className="form-group">
          <input type="password" required />
          <label>Contraseña</label>
        </div>
        <button type="submit">Registrarse</button>
        <div id="register-footer">
          <p>¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
