"use client";

import { VantaProvider } from "../state/VantaContext";
import Layout from "./Layout";

export default function AppShell({ children }) {
  return (
    <VantaProvider>
      <Layout>{children}</Layout>
    </VantaProvider>
  );
}
