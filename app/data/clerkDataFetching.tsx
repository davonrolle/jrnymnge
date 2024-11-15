import { currentUser } from "@clerk/nextjs/server";

export default async function ClerkName() {
  const user = await currentUser();
  const username = user?.username;
  const welcomeSuffix = username ? `, ${username}` : "";

  return <p>{welcomeSuffix}</p>;
}
