import {
  Center,
  Divider,
  Grid,
  Group,
  NumberInput,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";

interface TableAssetProps {
  asset: string;
  amount: number;
  price: number;
}

function TableAsset(props: TableAssetProps) {
  const { asset, amount, price } = props;

  const value = Number(price) * Number(amount);

  return (
    <>
      <Grid.Col span={4} style={{ textAlign: "left" }}>
        <Stack gap={0}>
          <Text fw={500}>{amount}</Text>
          <Text fw={500}>{asset}</Text>
        </Stack>
      </Grid.Col>

      <Grid.Col span={4} style={{ textAlign: "center" }}>
        <Text fw={500}>{`$${price}`}</Text>
      </Grid.Col>

      <Grid.Col span={4} style={{ textAlign: "right" }}>
        <Text fw={500}>{`$${value}`}</Text>
      </Grid.Col>
    </>
  );
}

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
      <Center>
        <Title>Lending</Title>
      </Center>

      <Grid columns={24}>
        <Grid.Col span={{ base: 12 }}>
          <Paper p={20} radius="md" shadow="md" withBorder>
            <NumberInput label="Amount" />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <Paper p={20} radius="md" shadow="md" withBorder>
            <Title order={5}>Result:</Title>

            <Divider variant="dashed" mb={20} />

            <Stack gap={10}>
              <SimpleGrid cols={3}>
                <Text
                  fw={400}
                  size="sm"
                  c="dimmed"
                  style={{ textAlign: "left" }}
                >
                  Supplied
                </Text>
                <Text
                  fw={400}
                  size="sm"
                  c="dimmed"
                  style={{ textAlign: "center" }}
                >
                  Price
                </Text>
                <Text
                  fw={400}
                  size="sm"
                  c="dimmed"
                  style={{ textAlign: "right" }}
                >
                  USD Value
                </Text>
              </SimpleGrid>

              <Divider variant="dashed" />

              <Grid columns={12} justify="flex-end" align="stretch">
                {supplied.map((item) => {
                  return (
                    <TableAsset
                      asset={item.asset}
                      amount={item.amount}
                      price={item.price}
                      key={item.asset}
                    />
                  );
                })}
              </Grid>

              <SimpleGrid cols={3}>
                <Text
                  fw={400}
                  size="sm"
                  c="dimmed"
                  style={{ textAlign: "left" }}
                >
                  Borrowed
                </Text>
                <Text
                  fw={400}
                  size="sm"
                  c="dimmed"
                  style={{ textAlign: "center" }}
                >
                  Price
                </Text>
                <Text
                  fw={400}
                  size="sm"
                  c="dimmed"
                  style={{ textAlign: "right" }}
                >
                  USD Value
                </Text>
              </SimpleGrid>

              <Divider variant="dashed" />

              <Grid columns={12} justify="flex-end" align="stretch">
                {borrowed.map((item) => {
                  return (
                    <TableAsset
                      asset={item.asset}
                      amount={item.amount}
                      price={item.price}
                      key={item.asset}
                    />
                  );
                })}
              </Grid>
            </Stack>

            <Space my={20} />

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

            <Space my={20} />

            <Text fw={600}>Aset Liquidation Price (LP):</Text>
            <Text>LP = Borrow / (HF - 1)</Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
