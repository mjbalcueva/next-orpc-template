import "server-only";

import { createRouterClient } from "@orpc/server";
import { headers as nextHeaders } from "next/headers";

import { router } from "@/services/orpc/router";

globalThis.$client = createRouterClient(router, {
  context: async () => ({
    headers: await nextHeaders(),
  }),
});
