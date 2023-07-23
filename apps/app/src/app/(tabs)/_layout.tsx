import { Home, Layers, Settings, Tag, Wrench } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { useEffect } from "react";

import { useSync } from "@/hooks/useSync";
import { database } from "@/lib/watermelon";

export default function Layout() {
  const { refresh } = useSync();

  useEffect(() => {
    const subscription = database
      .withChangesForTables([
        "tools",
        "categories",
        "categorizations",
        "stacks",
        "picks",
        "stars",
      ])
      .subscribe((changes) => {
        refresh();
      });

    return () => subscription.unsubscribe();
  }, [database]);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="(stacks)"
        options={{
          title: "Stacks",
          headerShown: false,
          tabBarIcon: ({ color }) => <Layers color={color} />,
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: "Tools",
          headerShown: false,
          tabBarIcon: ({ color }) => <Wrench color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          headerShown: false,
          tabBarIcon: ({ color }) => <Tag color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
    </Tabs>
  );
}
