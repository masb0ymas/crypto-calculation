"use-client";

import {
  ActionIcon,
  Button,
  Divider,
  Grid,
  Group,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconApps,
  IconCoinBitcoin,
  IconLink,
  IconReload,
} from "@tabler/icons-react";
import axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";
import { useState } from "react";
import env from "~/config/env";
import { optDeFiPlatform } from "~/core/constants/defi";
import List from "~/core/utils/list";
import { validateNumber } from "~/core/utils/number";
import aaveJson from "~/data/json/aave.json";
import { useLendingStore } from "~/data/state";
import Formula from "./partials/Formula";
import TableAsset from "./partials/TableAsset";
import { baseTransition } from "~/core/constants/base_setting";

export default function HomePage() {
  const [choiceDeFi, setChoiceDeFi] = useState<string | null>("");
  const [choiceChain, setChoiceChain] = useState<string | null>("");
  const [choiceSupplyAsset, setChoiceSupplyAsset] = useState<string | null>("");
  const [choiceBorrowAsset, setChoiceBorrowAsset] = useState<string | null>("");

  const [amountSupply, setAmountSupply] = useState<string | number>("");
  const [amountBorrow, setAmountBorrow] = useState<string | number>("");

  let supplies = useLendingStore.getState().supplies;
  const updateSupplies = useLendingStore((state) => state.addSupply);
  const removeSupplies = useLendingStore((state) => state.removeSupply);

  let borrowed = useLendingStore.getState().borrowed;
  const updateBorrowed = useLendingStore((state) => state.addBorrow);
  const removeBorrowed = useLendingStore((state) => state.removeBorrow);

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
      "id",
      (_values, item, _index) => {
        return `${_.toUpper(item.asset)} - ${item.name}`;
      }
    );

    if (!_.isEmpty(marketLists)) {
      const supplyAssets = chainETH?.markets.find(
        (x) => x.id === choiceSupplyAsset
      );

      const borrowAssets = chainETH?.markets.find(
        (x) => x.id === choiceBorrowAsset
      );

      supplyLT = Number(supplyAssets?.liquid_threshold);
      borrowLT = Number(borrowAssets?.liquid_threshold);

      supplyToken = _.toUpper(String(supplyAssets?.asset));
      borrowToken = _.toUpper(String(borrowAssets?.asset));
    }
  }

  async function addSupplies() {
    const url = `${env.COINGECKO_API_URL}/coins/${choiceSupplyAsset}`;
    const options: AxiosRequestConfig<any> = {
      headers: { "x-cg-api-key": env.COINGECKO_API_KEY },
    };

    let price = 0;
    let symbol = choiceSupplyAsset;

    try {
      const { data } = await axios.get(url, options);

      price = _.get(data, "market_data.current_price.usd", 0);
      symbol = _.get(data, "symbol");

      console.log(data);
    } catch (error) {
      console.log(error);
    }

    updateSupplies({
      defi: String(choiceDeFi),
      market: String(choiceChain),
      asset: String(symbol),
      liquid_threshold: supplyLT,
      price,
      amount: Number(amountSupply),
    });
  }

  async function addBorrowed() {
    const url = `${env.COINGECKO_API_URL}/coins/${choiceBorrowAsset}`;
    const options: AxiosRequestConfig<any> = {
      headers: { "x-cg-api-key": env.COINGECKO_API_KEY },
    };

    let price = 0;
    let symbol = choiceBorrowAsset;

    try {
      const { data } = await axios.get(url, options);

      price = _.get(data, "market_data.current_price.usd", 0);
      symbol = _.get(data, "symbol");

      console.log(data);
    } catch (error) {
      console.log(error);
    }

    updateBorrowed({
      defi: String(choiceDeFi),
      market: String(choiceChain),
      asset: String(symbol),
      liquid_threshold: borrowLT,
      price,
      amount: Number(amountBorrow),
    });
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
                    placeholder="Choice DeFi"
                    nothingFoundMessage="Nothing found..."
                  />
                  <Select
                    label="Market/Chain"
                    data={chainLists}
                    value={choiceChain}
                    onChange={setChoiceChain}
                    leftSection={<IconLink size={20} stroke={1.5} />}
                    checkIconPosition="right"
                    placeholder="Choice Market"
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
                      placeholder="Choice Asset"
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
                  placeholder="Input asset amount"
                  onChange={setAmountSupply}
                  disabled={!choiceSupplyAsset}
                />

                <Button
                  radius="md"
                  size="sm"
                  variant="light"
                  fullWidth
                  type="button"
                  disabled={validateNumber(amountSupply) <= 0}
                  onClick={() => addSupplies()}
                >
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
                    placeholder="Choice DeFi"
                    nothingFoundMessage="Nothing found..."
                  />
                  <Select
                    label="Marktet/Chain"
                    data={chainLists}
                    value={choiceChain}
                    onChange={setChoiceChain}
                    leftSection={<IconLink size={20} stroke={1.5} />}
                    checkIconPosition="right"
                    placeholder="Choice Market"
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
                      placeholder="Choice Asset"
                      nothingFoundMessage="Nothing found..."
                    />
                  </Grid.Col>

                  <Grid.Col span={4}>
                    <NumberInput
                      label="Liquid Threshold"
                      readOnly
                      value={borrowLT * 100}
                      suffix=" %"
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
                  placeholder="Input asset amount"
                  onChange={setAmountBorrow}
                  disabled={!choiceBorrowAsset}
                />

                <Button
                  radius="md"
                  size="sm"
                  variant="light"
                  fullWidth
                  disabled={validateNumber(amountBorrow) <= 0}
                  onClick={() => addBorrowed()}
                >
                  Add Borrow
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 24, xs: 24, sm: 12, md: 12 }}>
          <Paper p={20} radius="md" shadow="md" withBorder>
            <Stack>
              <Group justify="space-between">
                <Title order={5}>
                  <u>Result:</u>
                </Title>

                <Tooltip label="Reset" transitionProps={baseTransition}>
                  <ActionIcon variant="subtle" radius="md" onClick={() => {
                    removeSupplies()
                    removeBorrowed()
                  }}>
                    <IconReload />
                  </ActionIcon>
                </Tooltip>
              </Group>

              <TableAsset label="Supplies" data={supplies} />
              <TableAsset label="Borrowed" data={borrowed} />

              <Formula data={{ supplies: supplies, borrowed: borrowed }} />
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
