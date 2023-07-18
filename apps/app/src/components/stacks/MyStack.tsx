import { Trash2 } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { ListItem, YStack } from "tamagui";

import { MyStackHeader } from "./MyStackHeader";
import { List } from "../List";
import { SwipeableRow } from "../SwipeableRow";
import { ToolIcon } from "../icons/ToolIcon";

import { Loading } from "@/components/Loading";
import { useAuth } from "@/components/providers/AuthProvider";
import { CreateStack } from "@/components/stacks/CreateStack";
import { StackSheet } from "@/components/stacks/StackSheet";
import { StackResponse, getStack } from "@/lib/database/getStack";
import { supabase } from "@/lib/supabase";

export function MyStack() {
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [stack, setStack] = useState<StackResponse["data"]>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && (!stack || refresh)) {
      getStack({ user: user.id }).then(({ data }) => {
        setStack(data);
        // setName(data?.name);
        // setSlug(data?.slug);
        setLoading(false);
        setRefresh(false);
      });
    }
  }, [user, stack, refresh]);

  function removePick(stackId: string | null, toolId: string | null) {
    setLoading(true);
    const query = supabase
      .from("picks")
      .delete()
      .match({ stack_id: stackId, tool_id: toolId });
    query.then((result) => {
      // console.log({ result });
      setRefresh(true);
    });
  }

  return isLoading ? (
    <Loading message="Loading my stack" />
  ) : stack ? (
    <YStack fullscreen>
      <MyStackHeader stack={stack} refresh={() => setRefresh(true)} />
      <List
        data={stack.picks_view}
        placeholder="You have not added any tools to your stack yet."
        renderItem={({ item }) => {
          return (
            <SwipeableRow
              rightActions={[
                {
                  text: <Trash2 color="white" />,
                  color: "$red10",
                  onPress: () => removePick(item.stack_id, item.tool_id),
                },
              ]}
            >
              <ListItem
                title={item.tool_name}
                subTitle={item.category_name}
                icon={
                  <ToolIcon svgXml={item.tool_icon} width="36" height="36" />
                }
              />
            </SwipeableRow>
          );
        }}
      />
      <StackSheet />
    </YStack>
  ) : (
    <CreateStack refresh={() => setRefresh(true)} />
  );
}