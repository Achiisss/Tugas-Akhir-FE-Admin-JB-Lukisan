import React, { useState } from "react";
import { Row, Col, Image, Form, Button, Card, Alert } from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "admin123") {
      // Lakukan sesuatu jika login berhasil
      console.log("Login berhasil");
      navigate("/");
      
    } else if (email !== "admin@gmail.com" && password !== "admin123") {
      // Tampilkan alert jika email dan password salah
      setShowAlert(true);
      setAlertMessage("Email atau password salah, silahkan coba lagi!");
    } else if (email !== "admin@gmail.com") {
      // Tampilkan alert jika email salah
      setShowAlert(true);
      setAlertMessage("Email salah, silahkan coba lagi!");
    } else {
      // Tampilkan alert jika password salah
      setShowAlert(true);
      setAlertMessage("Password salah, silahkan coba lagi!");
    }
  };

  return (
    <Row className="justify-content-center">
      <Col sm={4}>
        <Image
          src="/images/lukis.png"
          alt="Login"
          className="login-image"
          style={{ width: "600px", height: "775px" }}
        />
      </Col>
      <Col sm={8}>
        <Card
          style={{
            backgroundColor: "#FBF9F7",
            height: "100%",
            borderRadius: "60px",
          }}
          className="rounded-end"
        >
          <Card.Body
            className="d-flex flex-column justify-content-center"
            style={{ marginTop: "-100px", marginLeft: "250px" }}
          >
            <Card.Title style={{ fontSize: "40px", fontWeight: "bold" }}>
              Log in
            </Card.Title>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  style={{
                    height: "61px",
                    width: "510px",
                    marginTop: "20px",
                  }}
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  style={{
                    height: "61px",
                    width: "510px",
                    marginTop: "20px",
                  }}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              
              <Button
                style={{
                  height: "61px",
                  width: "315px",
                  backgroundColor: "#4592AF",
                  marginTop: "30px",
                }}
                onClick={handleLogin}
              >
                Log in
              </Button>
              

              {showAlert && (
                <Alert variant="danger" style={{ marginTop: "20px" }}>
                  {alertMessage}
                </Alert>
              )}

              <p style={{ marginTop: "20px", color: "#B2B2B2" }}>
                Don’t have an account?{" "}
                <Link to="/signup">
                  <span style={{ color: "#4592AF" }}>Sign Up</span>
                </Link>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
