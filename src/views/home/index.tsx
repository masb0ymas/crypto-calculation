import { Grid, NumberInput, Paper, Stack, Text, Title } from "@mantine/core";
import TableAsset from "./partials/tableAsset";

export default function HomePage() {
  const supplied = [
    {
      asset: "ETH",
      amount: 0.7677,
      price: 3002,
    },
  ];

  const borrowed = [
    {
      asset: "USDC",
      amount: 1258,
      price: 1,
    },
  ];

  const colleteral = supplied.reduce((acc, curValue) => {
    const usdValue = Number(curValue.price) * Number(curValue.amount);

    acc += usdValue;

    return acc;
  }, 0);

  const total_borrow = borrowed.reduce((acc, curValue) => {
    const usdValue = Number(curValue.price) * Number(curValue.amount);

    acc += usdValue;

    return acc;
  }, 0);

  const health_factor_dirty = (colleteral * 0.85) / total_borrow;
  const health_factor =
    Math.round((health_factor_dirty + Number.EPSILON) * 100) / 100;

  return (
    <Stack>
      <div style={{ textAlign: "center", alignItems: "center" }}>
        <Title>Lending</Title>
        <Text>
          DeFi <u>Lending</u> Calculator
        </Text>
      </div>

      <Grid columns={24}>
        <Grid.Col span={{ base: 12 }}>
          <Paper p={20} radius="md" shadow="md" withBorder>
            <NumberInput label="Amount" />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <Paper p={20} radius="md" shadow="md" withBorder>
            <Stack>
              <Title order={5}>
                <u>Result:</u>
              </Title>

              <TableAsset label="Supplied" data={supplied} />
              <TableAsset label="Borrowed" data={borrowed} />

              <Stack gap={5}>
                <Title order={5}>
                  <u>Formula:</u>
                </Title>
                <Text fw={600}>Health Factor (HF):</Text>
                <Text>HF = (Colleteral * Liquid Threshold) / Total Borrow</Text>

                <Text>
                  {`HF = (${colleteral} * 0.85) / ${total_borrow}`} ={" "}
                  <Text component="span" fw={600}>
                    <u>{health_factor}</u>
                  </Text>
                </Text>
              </Stack>

              <Stack gap={5}>
                <Text fw={600}>Aset Liquidation Price (LP):</Text>
                <Text>LP = Borrow / (HF - 1)</Text>
              </Stack>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
