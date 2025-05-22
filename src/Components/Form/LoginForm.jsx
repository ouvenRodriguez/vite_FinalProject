import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../Api/user";
import { useNavigate } from "react-router-dom";
import "./style.css";

const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    pass: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const { email, pass } = user;
    if (!email || !pass) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await login(user);
      console.log(response);
      if (response.success) {
        alert("Inicio de sesión exitoso");
        // Redirigir al usuario a la página de inicio o a otra página
        console.log(response.body.data);
        localStorage.setItem("@token", response.body.data);
        navigate("/home");
        
      } else {
        alert(response.body.error || "Error al iniciar sesión. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Inténtalo de nuevo.");
    }
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div id="login-form">
      <h1>Iniciar Sesión</h1>
      <p>Bienvenido de nuevo</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            required
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <label>Correo Electrónico</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            required
            name="pass"
            value={user.pass}
            onChange={handleChange}
          />
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
