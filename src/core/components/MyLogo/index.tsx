import { Group, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import env from "~/config/env";

export default function MyLogo() {
  return (
    <Link href={"/"} style={{ textDecoration: "none" }}>
      <Group gap={10}>
        <Image
          src="/static/currency-market.png"
          width={32}
          height={32}
          alt="currency market"
        />
        <Text fw={500} c="dimmed" size="md">
          {env.APP_NAME}
        </Text>
      </Group>
    </Link>
  );
}
