import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  async function handleRegister(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/SignUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setUsername("");
      setPassword("");
      setShowModal(true);
      setMessage("Sucessfully Registered");
    } else {
      setMessage("Username is already taken");
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function handleRedirect() {
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/Login"} />;
  }

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an Account?{" "}
        <Link size="sm" component="button" to={"/Login"}>
          Login
        </Link>
        <p style={{ color: "red" }}>{message}</p>
      </Text>
      <form onSubmit={handleRegister}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Username"
            placeholder="Username"
            required
            value={username}
            onChange={(ev) => {
              setUsername(ev.target.value);
            }}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={password}
            onChange={(ev) => {
              setPassword(ev.target.value);
            }}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button
            fullWidth
            mt="xl"
            onClick={handleRegister}
            disabled={!isFormValid}
          >
            Sign Up
          </Button>

          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header>
              <Modal.Title>Notice</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{ color: "red", textAlign: "center" }}>{message}</p>
            </Modal.Body>
            <Button
              style={{
                border: "solid 1px black",
                margin: "5px",
                backgroundColor: "grey",
                color: "white",
              }}
              variant="secondary m-1"
              onClick={handleCloseModal}
            >
              Close
            </Button>
            <Button
              style={{
                border: "solid 1px black",
                margin: "5px",
                backgroundColor: "green",
                color: "white",
              }}
              variant="success m-1"
              onClick={() => {
                handleRedirect();
              }}
            >
              Confirm
            </Button>
          </Modal>
        </Paper>
      </form>
    </Container>
  );
}
