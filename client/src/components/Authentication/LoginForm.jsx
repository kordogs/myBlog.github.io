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
import { Link, Navigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { UserContext } from "../../UserContext";
import { useContext } from "react";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setredirect] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function handleLogin(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (response.ok) {
      // Login successful
      setUsername("");
      setPassword("");
      setShowModal(true);
      setMessage("Successfully Logged In");
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setredirect(true);
      });
    } else {
      // Login failed
      setMessage("Wrong Password or Username");
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (redirect) {
    return <Navigate to={"/"} />;
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
        Please Sign In
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account by clicking Sign up above
        </Anchor>
      </Text>

      <p style={{ textAlign: "center", color: "red" }}>{message}</p>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Username"
          placeholder="Username"
          required
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleLogin} disabled={!isFormValid}>
          Sign in
        </Button>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header>
            <Modal.Title>Warning</Modal.Title>
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
              handleCloseModal();
            }}
          >
            Confirm
          </Button>
        </Modal>
      </Paper>
    </Container>
  );
}
