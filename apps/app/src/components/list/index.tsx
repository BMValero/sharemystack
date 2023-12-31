import { FlashList, ListRenderItem } from "@shopify/flash-list";
// import { FlatList, ListRenderItem } from "react-native";
// import { RefreshControl } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Separator, Text } from "tamagui";

import { useSync } from "@/hooks/useSync";

export function List<T>({
  data,
  renderItem,
  placeholder,
  extraData,
  numColumns,
}: {
  data?: readonly T[] | null;
  renderItem?: ListRenderItem<T> | null;
  placeholder?: JSX.Element | string;
  extraData?: any;
  numColumns?: number;
}) {
  const { queueSync, isSyncing } = useSync();
  const [isRefreshing, setIsRefreshing] = useState(false);

  placeholder ??= "No data";
  if (typeof placeholder === "string") {
    placeholder = (
      <Text padding="$3" textAlign="center">
        {placeholder}
      </Text>
    );
  }

  function refresh() {
    setIsRefreshing(true);
    queueSync();
  }

  useEffect(() => {
    if (!isSyncing) {
      setIsRefreshing(false);
    }
  }, [isSyncing]);

  return (
    <FlashList
      ListEmptyComponent={placeholder}
      data={data}
      extraData={extraData}
      renderItem={renderItem}
      estimatedItemSize={87}
      ItemSeparatorComponent={() => <Separator />}
      onRefresh={refresh}
      refreshing={isRefreshing}
      numColumns={numColumns}
      /* refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      } */
    />
  );
}
