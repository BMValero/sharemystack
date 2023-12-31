import { PlusCircle } from "@tamagui/lucide-icons";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Alert } from "react-native";
import { Button, Spinner } from "tamagui";

import { useProfile } from "@/hooks/data/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export function SuggestionButton({
  suggestion = "tool",
  text,
  icon,
}: {
  suggestion?: string;
  text?: string;
  icon?: JSX.Element;
}) {
  const { user } = useAuth();
  const { profile } = useProfile({ user });
  const [isLoading, setIsLoading] = useState(false);

  async function getCannyUrl() {
    const { data } = await supabase.functions.invoke<{
      jwt?: string | null;
    }>("get-canny-token", {
      body: { name: "Functions" },
    });

    setIsLoading(false);

    if (data?.jwt) {
      // https://sharemystack.com/auth/sso?companyID=6482cf4b2e5e451d99d96fec&redirect=https%3A%2F%2Fsharemystack.canny.io%2F
      const companyId = "6482cf4b2e5e451d99d96fec";
      const redirect = "https%3A%2F%2Fsharemystack.canny.io%2F";
      const ssoToken = data.jwt;
      const cannyUrl =
        "https://canny.io/api/redirects/sso?companyID=" +
        companyId +
        "&ssoToken=" +
        ssoToken +
        "&redirect=" +
        redirect;

      return cannyUrl;
    } else {
      return null;
    }
  }

  async function handleButtonPress() {
    if (user && profile) {
      setIsLoading(true);
      const cannyUrl = await getCannyUrl();

      if (cannyUrl) {
        WebBrowser.openBrowserAsync(cannyUrl);

        return;
      }
    }

    Alert.alert("Please create a profile before submitting feedback.");
  }

  return (
    <Button
      onPress={handleButtonPress}
      icon={isLoading ? <Spinner /> : icon ?? <PlusCircle size="$1" />}
      margin="$3"
      color={!isLoading && user && profile ? undefined : "$gray10"}
      disabled={isLoading}
    >
      {text ?? `Suggest new ${suggestion}`}
    </Button>
  );
}
