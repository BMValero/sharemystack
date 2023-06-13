import { useEffect, useState } from "react";
import { Spinner, YStack } from "tamagui";

import { List } from "../../../../components/List";
import { StacksResponse, getStacks } from "../../../../lib/database/getStacks";
import { withAuth } from "../../../../components/auth/withAuth";

function StarredStacks() {
  const [isLoading, setLoading] = useState(true);
  const [stacks, setStacks] = useState<StacksResponse["data"]>(null);

  useEffect(() => {
    getStacks({ starred: true }).then(({ data }) => {
      setStacks(data);
      setLoading(false);
    });
  }, [setStacks, getStacks]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <YStack fullscreen>
        <List
          data={stacks}
          href={(item) => `/(stacks)/@${item.slug}`}
          title={(item) => item.name}
          subTitle={(item) => item.website}
        />
      </YStack>
    </>
  );
}

export default withAuth(StarredStacks);
