import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { TableName } from "@/model/schema";
import { Profile } from "@/model/Profile";

type ProfilesSelector =
  | {
      featured: boolean;
      starred?: never;
      updated?: never;
      limit?: number;
    }
  | {
      featured?: never;
      starred?: boolean;
      updated?: never;
      limit?: number;
    }
  | {
      featured?: never;
      starred?: never;
      updated?: boolean;
      limit?: number;
    };

export function useProfiles({
  featured,
  starred,
  updated,
  limit,
}: ProfilesSelector) {
  const database = useDatabase();
  const [profiles, setProfiles] = useState<Profile[]>();

  let profilesQuery = database.collections
    .get<Profile>(TableName.PROFILES)
    .query();

  if (featured) {
    profilesQuery = profilesQuery.extend(
      Q.where("is_featured", true),
      Q.sortBy("updated_at", "desc")
    );
  }

  if (starred) {
    profilesQuery = profilesQuery.extend(
      Q.on(TableName.STARS, "profile_id", Q.notEq(null)),
      Q.sortBy("name", "asc")
    );
  }

  if (updated) {
    profilesQuery = profilesQuery.extend(Q.sortBy("updated_at", "desc"));
  }

  if (limit) {
    profilesQuery = profilesQuery.extend(Q.take(limit));
  }

  useEffect(() => {
    const subscription = profilesQuery.observe().subscribe((data) => {
      setProfiles(data);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return { profiles };
}
