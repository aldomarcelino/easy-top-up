"use client";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { Button, TextField } from "components/elements";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CheckSession from "services/check-session";
import { Colors } from "styles/theme/color";
import { setLocalStorage } from "utils/local-storage";

const LoginPage = () => {
  const router = useRouter();
  // Check user session
  CheckSession();
  // Initialize State
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  // Event on change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle hit Login button
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("email", form.email);
      formData.append("password", form.password);

      const response = await axios.post("/api/auth/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status) {
        router.push("/");
        setLocalStorage("user_name", response.data.name);
      }

      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.response && e.response.data && e.response.data.message);
    }
  };

  return (
    <Box maxWidth="40%" margin="auto" padding="74px 0px">
      <Box
        textAlign="center"
        sx={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
      >
        <Box
          position="relative"
          sx={{ height: "114px", width: "100%", marginBottom: "23px" }}
        >
          <Image
            layout="fill"
            src="/logo_transparent.png"
            alt="logo-wellness"
            objectFit="contain"
          />
        </Box>
      </Box>
      <Box
        padding="48px 74px"
        borderRadius="25px"
        sx={{
          backgroundColor: Colors.white,
          boxShadow: Colors.shadowDark,
        }}
      >
        <Typography variant="h3" fontSize="28px" fontWeight={700}>
          Login
        </Typography>
        <Typography marginBottom="24px" fontWeight={300}>
          Don't have an account yet?{" "}
          <span>
            <a href="/register" style={{ color: Colors.blue100 }}>
              Create an account
            </a>
          </span>
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            value={form.email}
            name="email"
            label="Email"
            type="email"
            handleChange={handleChange}
            placeholder="aldo.marcelino@mailinator.com"
            width="100%"
          />
          <Box marginTop="24px">
            <TextField
              value={form.password}
              name="password"
              label="Password"
              type={showPass ? "text" : "password"}
              placeholder="••••"
              width="100%"
              handleChange={handleChange}
              endAdornment={
                <Box
                  sx={{ margin: "0px 12px", cursor: "pointer" }}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <Eye /> : <EyeOff />}
                </Box>
              }
            />
          </Box>

          <Typography
            variant="h3"
            fontSize="16px"
            color={Colors.blue100}
            textAlign="center"
            marginTop="24px"
            marginBottom="32px"
          >
            Forgot Password
          </Typography>

          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography
              variant="body2"
              color={Colors.red100}
              marginBottom="8px"
              textAlign="center"
            >
              {error}
            </Typography>
            <Button
              label={loading ? "Loading..." : "Login"}
              buttonType="primary"
              padding="15px 132px"
              submit
            />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
