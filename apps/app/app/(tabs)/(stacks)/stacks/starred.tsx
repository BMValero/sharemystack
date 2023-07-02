import { useEffect, useState } from "react";

import { Loading } from "@/components/Loading";
import { withAuth } from "@/components/auth/withAuth";
import { StackList } from "@/components/stacks/StackList";
import { StacksResponse, getStacks } from "@/lib/database/getStacks";

function StarredStacks() {
  const [isLoading, setLoading] = useState(true);
  const [stacks, setStacks] = useState<StacksResponse["data"]>(null);

  useEffect(() => {
    getStacks({ starred: true }).then(({ data }) => {
      setStacks(data);
      setLoading(false);
    });
  }, [getStacks, setStacks]);

  return isLoading ? <Loading /> : <StackList stacks={stacks} />;
}

export default withAuth(StarredStacks);
