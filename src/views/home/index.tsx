import {
  Button,
  Divider,
  Grid,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import TableAsset from "./partials/TableAsset";
import { optDeFiPlatform } from "~/core/constants/defi";
import aaveJson from "~/data/json/aave.json";
import { useState } from "react";
import List from "~/core/utils/list";
import _ from "lodash";
import {
  Icon123,
  IconApps,
  IconBuildingBank,
  IconCoinBitcoin,
  IconLink,
} from "@tabler/icons-react";

export default function HomePage() {
  const [choiceDeFi, setChoiceDeFi] = useState<string | null>("");
  const [choiceChain, setChoiceChain] = useState<string | null>("");
  const [choiceSupplyAsset, setChoiceSupplyAsset] = useState<string | null>("");
  const [choiceBorrowAsset, setChoiceBorrowAsset] = useState<string | null>("");

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

  let chainLists: any[] = [];
  let marketLists: any[] = [];
  let supplyLT: number = 0;
  let borrowLT: number = 0;
  let supplyToken: string = "eth";
  let borrowToken: string = "eth";

  if (choiceDeFi === "AAVE") {
    chainLists = List.transform(aaveJson.data, "name", "chain");

    const chainETH = aaveJson.data.find((x) => x.chain === choiceChain);

    marketLists = List.transform(
      // @ts-expect-error
      chainETH?.markets,
      "name",
      "asset",
      (_values, item, _index) => {
        return `${_.toUpper(item.asset)} - ${item.name}`;
      }
    );

    if (!_.isEmpty(marketLists)) {
      const supplyAssets = chainETH?.markets.find(
        (x) => x.asset === choiceSupplyAsset
      );

      const borrowAssets = chainETH?.markets.find(
        (x) => x.asset === choiceBorrowAsset
      );

      supplyLT = Number(supplyAssets?.liquid_threshold);
      borrowLT = Number(borrowAssets?.liquid_threshold);

      supplyToken = _.toUpper(String(supplyAssets?.asset));
      borrowToken = _.toUpper(String(borrowAssets?.asset));
    }
  }

  return (
    <Stack>
      <div style={{ textAlign: "center", alignItems: "center" }}>
        <Title>Lending</Title>
        <Text>
          DeFi <u>Lending</u> Calculator
        </Text>
      </div>

      <Grid columns={24} mt={20}>
        <Grid.Col span={{ base: 24, xs: 24, sm: 12, md: 12 }}>
          <Stack>
            <Paper p={20} radius="md" shadow="md" withBorder>
              <Stack gap={10}>
                <Title order={5}>Supply</Title>

                <Divider variant="dashed" my={10} />

                <SimpleGrid cols={2}>
                  <Select
                    label="DeFi Platform"
                    data={optDeFiPlatform}
                    value={choiceDeFi}
                    onChange={setChoiceDeFi}
                    leftSection={<IconApps size={20} stroke={1.5} />}
                    checkIconPosition="right"
                    nothingFoundMessage="Nothing found..."
                  />
                  <Select
                    label="Chain"
                    data={chainLists}
                    value={choiceChain}
                    onChange={setChoiceChain}
                    leftSection={<IconLink size={20} stroke={1.5} />}
                    checkIconPosition="right"
                    nothingFoundMessage="Nothing found..."
                  />
                </SimpleGrid>

                <Grid mt={5}>
                  <Grid.Col span={8}>
                    <Select
                      label="Asset"
                      data={marketLists}
                      value={choiceSupplyAsset}
                      onChange={setChoiceSupplyAsset}
                      leftSection={<IconCoinBitcoin size={20} stroke={1.5} />}
                      checkIconPosition="right"
                      nothingFoundMessage="Nothing found..."
                    />
                  </Grid.Col>

                  <Grid.Col span={4}>
                    <NumberInput
                      label="Liquid Threshold"
                      readOnly
                      value={supplyLT * 100}
                      suffix=" %"
                      thousandSeparator=","
                      allowNegative={false}
                    />
                  </Grid.Col>
                </Grid>

                <NumberInput
                  label="Amount"
                  suffix={` ${supplyToken}`}
                  thousandSeparator=","
                  allowNegative={false}
                  disabled={!choiceSupplyAsset}
                />

                <Button radius="md" size="sm" variant="light" fullWidth>
                  Add Supply
                </Button>
              </Stack>
            </Paper>

            <Paper p={20} radius="md" shadow="md" withBorder>
              <Stack gap={10}>
                <Title order={5}>Borrow</Title>

                <Divider variant="dashed" />

                <SimpleGrid cols={2}>
                  <Select
                    label="DeFi Platform"
                    data={optDeFiPlatform}
                    value={choiceDeFi}
                    onChange={setChoiceDeFi}
                    leftSection={<IconApps size={20} stroke={1.5} />}
                    checkIconPosition="right"
                    nothingFoundMessage="Nothing found..."
                  />
                  <Select
                    label="Chain"
                    data={chainLists}
                    value={choiceChain}
                    onChange={setChoiceChain}
                    leftSection={<IconLink size={20} stroke={1.5} />}
                    checkIconPosition="right"
                    nothingFoundMessage="Nothing found..."
                  />
                </SimpleGrid>

                <Grid>
                  <Grid.Col span={8}>
                    <Select
                      label="Asset"
                      data={marketLists}
                      value={choiceBorrowAsset}
                      onChange={setChoiceBorrowAsset}
                      leftSection={<IconCoinBitcoin size={20} stroke={1.5} />}
                      checkIconPosition="right"
                      nothingFoundMessage="Nothing found..."
                    />
                  </Grid.Col>

                  <Grid.Col span={4}>
                    <NumberInput
                      label="Liquid Threshold"
                      readOnly
                      value={borrowLT}
                      thousandSeparator=","
                      allowNegative={false}
                    />
                  </Grid.Col>
                </Grid>

                <NumberInput
                  label="Amount"
                  suffix={` ${borrowToken}`}
                  thousandSeparator=","
                  allowNegative={false}
                  disabled={!choiceBorrowAsset}
                />

                <Button radius="md" size="sm" variant="light" fullWidth>
                  Add Borrow
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 24, xs: 24, sm: 12, md: 12 }}>
          <Paper p={20} radius="md" shadow="md" withBorder>
            <Stack>
              <Title order={5}>
                <u>Result:</u>
              </Title>

              <TableAsset label="Supplied" data={supplied} />
              <TableAsset label="Borrowed" data={borrowed} />

              <Button radius="md" size="sm" fullWidth>
                Calculate
              </Button>

              <Stack gap={5} mt={20}>
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
