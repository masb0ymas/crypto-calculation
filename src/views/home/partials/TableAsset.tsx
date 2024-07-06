import { Divider, Grid, SimpleGrid, Stack, Text } from "@mantine/core";
import React from "react";

interface RowTableAssetProps {
  asset: string;
  amount: number;
  price: number;
}

interface TableAssetProps {
  label: string;
  data: RowTableAssetProps[];
}

/**
 * 
 * @param props 
 * @returns 
 */
function RowTableAsset(props: RowTableAssetProps) {
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

/**
 * 
 * @param props 
 * @returns 
 */
export default function TableAsset(props: TableAssetProps) {
  const { label, data } = props;

  return (
    <Stack gap={10}>
      <SimpleGrid cols={3}>
        <Text fw={400} size="sm" c="dimmed" style={{ textAlign: "left" }}>
          {label}
        </Text>

        <Text fw={400} size="sm" c="dimmed" style={{ textAlign: "center" }}>
          Price
        </Text>

        <Text fw={400} size="sm" c="dimmed" style={{ textAlign: "right" }}>
          USD Value
        </Text>
      </SimpleGrid>

      <Divider variant="dashed" />

      <Grid columns={12} justify="flex-end" align="stretch">
        {data.map((item) => {
          return (
            <RowTableAsset
              asset={item.asset}
              amount={item.amount}
              price={item.price}
              key={item.asset}
            />
          );
        })}
      </Grid>
    </Stack>
  );
}
