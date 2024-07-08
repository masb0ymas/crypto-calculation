"use-client";

import { Divider, Group, Space, Stack, Text, Title } from "@mantine/core";
import { roundDecimal, validateNumber } from "~/core/utils/number";
import { defaultForm } from "./TableAsset";
import React from "react";

interface FormulaEntity {
  supplies: (typeof defaultForm)[];
  borrowed: (typeof defaultForm)[];
}

interface FormulaProps {
  data: FormulaEntity;
}

export default function Formula(props: FormulaProps) {
  const { data } = props;

  const colleteral = data.supplies.reduce((acc, curValue) => {
    const usdValue = Number(curValue.price) * Number(curValue.amount);

    acc += usdValue;

    return acc;
  }, 0);

  const total_borrow = data.borrowed.reduce((acc, curValue) => {
    const usdValue = Number(curValue.price) * Number(curValue.amount);

    acc += usdValue;

    return acc;
  }, 0);

  // maximum liquid threshold
  const maxLT = Math.max(...data.supplies.map((x) => x.liquid_threshold));

  console.log({ colleteral, maxLT, total_borrow });

  const health_factor_dirty = (colleteral * maxLT) / total_borrow;
  const health_factor = validateNumber(health_factor_dirty);
  const result_hf = roundDecimal(health_factor);

  const new_colleteral = validateNumber(colleteral);
  const new_maxLT = validateNumber(maxLT);
  const new_totalBorrow = validateNumber(total_borrow);

  const formulaText = `HF = (${new_colleteral} * ${new_maxLT}) / ${new_totalBorrow}`;

  return (
    <>
      <Stack gap={5} mt={20}>
        <Title order={5}>
          <u>Formula:</u>
        </Title>
        <Text fw={600}>Health Factor (HF):</Text>
        <Text>HF = (Colleteral * Liquid Threshold) / Total Borrow</Text>

        <Text>
          {formulaText} ={" "}
          <Text component="span" fw={600}>
            {result_hf <= 0 ? "?" : <u>{result_hf}</u>}
          </Text>
        </Text>

        <Divider variant="dashed" />

        <Group gap={5}>
          <Text fw={600}>Health Factor = </Text>
          <Title order={5}>{result_hf <= 0 ? "?" : <u>{result_hf}</u>}</Title>
        </Group>

        <Divider variant="dashed" />
      </Stack>

      <Stack gap={5} mt={30}>
        <Text fw={600}>Aset Liquidation Price (LP):</Text>
        <Text>LP = Token Price / Health Factor</Text>

        {data.supplies.map((item) => {
          const price = validateNumber(item.price);
          const lp = price / result_hf;

          return (
            <React.Fragment key={item.asset}>
              <Divider variant="dashed" mt={20} />

              <Text>{`LP = ${item.price} / ${result_hf}`}</Text>
              <Text>{`LP = ${lp} / ${item.asset}`}</Text>

              <Space my={10} />
              <Text>
                {`Your assets are liquid when the price of ${item.asset} is `}
                <Text fw={600} component="span">
                  <u>{`$${lp}`}</u>
                </Text>
              </Text>
            </React.Fragment>
          );
        })}
      </Stack>
    </>
  );
}
