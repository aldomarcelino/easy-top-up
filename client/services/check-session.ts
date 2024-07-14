import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckSession() {
  const router = useRouter();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("/api/auth/check-session");

        if (response.status === 200) {
          setRole(response.data.user_role);

          router.push("/");
        }
      } catch (error) {
        router.replace("/login");
      }
    };

    checkSession();
  }, [router]);

  return { role };
}
