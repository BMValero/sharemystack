import { useEffect, useState } from "react";

import { Loading } from "@/components/Loading";
import { StackList } from "@/components/stacks/StackList";
import { StacksResponse, getStacks } from "@/lib/database/getStacks";

export default function UpdatedStacks() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stacks, setStacks] = useState<StacksResponse["data"]>(null);

  function loadData() {
    getStacks({ updated: true }).then(({ data }) => {
      setStacks(data);
      setLoading(false);
      setRefreshing(false);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  return loading ? (
    <Loading message="Loading updates stacks" />
  ) : (
    <StackList
      stacks={stacks}
      onRefresh={() => {
        setRefreshing(true);
        loadData();
      }}
      refreshing={refreshing}
    />
  );
}