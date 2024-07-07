import { Center, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconDatabaseOff } from "@tabler/icons-react";

export default function EmptyRecord() {
  return (
    <Center>
      <Stack align="center" gap={10}>
        <ThemeIcon variant="light" radius="lg" size="lg" color="gray">
          <IconDatabaseOff />
        </ThemeIcon>

        <Text size="sm" c="dimmed">
          No Records
        </Text>
      </Stack>
    </Center>
  );
}
