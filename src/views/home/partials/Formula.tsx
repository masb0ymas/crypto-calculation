"use-client";

import {
  Divider,
  Group,
  NumberFormatter,
  Paper,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  intlNumberFormat,
  roundDecimal,
  validateNumber,
} from "~/core/utils/number";
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

  const collateral = data.supplies.reduce((acc, curValue) => {
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

  console.log({ collateral, maxLT, total_borrow });

  const health_factor_dirty = (collateral * maxLT) / total_borrow;
  const health_factor = validateNumber(health_factor_dirty);
  const result_hf = roundDecimal(health_factor);

  const new_colleteral = validateNumber(collateral);
  const new_maxLT = validateNumber(maxLT);
  const new_totalBorrow = validateNumber(total_borrow);

  const formulaText = `HF = (${new_colleteral} * ${new_maxLT}) / ${new_totalBorrow}`;

  return (
    <Stack>
      <Paper p={20} radius="md" shadow="md" withBorder>
        <Stack gap={5}>
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
            <Text fw={600}>{result_hf <= 0 ? "?" : <u>{result_hf}</u>}</Text>
          </Group>

          <Space my={10} />

          <Text size="sm" c="gray">
            Note:
          </Text>
          <Text size="sm" c="gray">
            HF = Health Factor
          </Text>

          {result_hf > 0 && (
            <>
              <Space my={10} />
              <Text c="gray" component="span">
                {`Your health factor is `}
                <Text fw={600} component="span">
                  <u>{`${result_hf}`}</u>
                </Text>
                <br />
                <Text component="span">
                  {result_hf < 2
                    ? "It's best to increase your health factor above 2"
                    : "Your position is safe"}
                </Text>
              </Text>
            </>
          )}
        </Stack>
      </Paper>

      <Paper p={20} radius="md" shadow="md" withBorder>
        <Stack gap={5}>
          <Text fw={600}>Aset Liquidation Price (LP):</Text>
          <Text>LP = Token Price / Health Factor</Text>

          <Space my={5} />

          <Text size="sm" c="gray">
            Note:
          </Text>
          <Text size="sm" c="gray">
            LP = Liquidation Price
          </Text>

          {data.supplies.map((item) => {
            const token_price = validateNumber(item.price);
            const lp = token_price / result_hf;

            return (
              <React.Fragment key={item.asset}>
                <Divider variant="dashed" my={10} />

                <Text component="span">
                  {`LP = ${item.price} / ${result_hf}`}
                </Text>
                <Text fw={600} component="span">
                  {`Liquidity Price = `}
                  <NumberFormatter
                    prefix="$"
                    value={lp}
                    thousandSeparator
                    decimalScale={4}
                  />
                  <Text component="span" fw={600}>
                    {` / ${item.asset}`}
                  </Text>
                </Text>

                <Space my={10} />
                <Text c="gray" component="span">
                  {`Your assets are liquid when the price of ${item.asset} is `}
                  <Text fw={600} component="span">
                    <u>
                      <NumberFormatter
                        prefix="$"
                        value={lp}
                        thousandSeparator
                        decimalScale={4}
                      />
                    </u>
                  </Text>
                </Text>
              </React.Fragment>
            );
          })}
        </Stack>
      </Paper>

      <Paper p={20} radius="md" shadow="md" withBorder>
        <Stack gap={5}>
          <Text fw={600}>Considered Paid Off (CPO):</Text>
          <Text>LTV = (Total borrow / Collateral) * Liquid Threshold</Text>
          <Text>IA = Token price * LTV</Text>
          <Text>CPO = Token price + IA</Text>

          <Space my={5} />

          <Text size="sm" c="gray">
            Note:
          </Text>
          <Text size="sm" c="gray">
            LTV = Loan To Value
          </Text>
          <Text size="sm" c="gray">
            IA = Increase in Assets
          </Text>
          <Text size="sm" c="gray">
            CPO = Considered Paid Off
          </Text>

          {data.supplies.map((item) => {
            const token_price = validateNumber(item.price);
            const token_amount = validateNumber(item.amount);
            const liquid_threshold = validateNumber(item.liquid_threshold);

            const collateral = token_price * token_amount;
            const new_collateral = roundDecimal(collateral);

            const ltv = (total_borrow / new_collateral) * liquid_threshold;
            const new_ltv = roundDecimal(ltv);

            const increase_in_assets = token_price * new_ltv;
            const new_ia = roundDecimal(increase_in_assets);

            const cpo = token_price + new_ia;
            const new_cpo = roundDecimal(new_ia);

            if (total_borrow / collateral >= 1) {
              return <></>;
            }

            return (
              <React.Fragment key={item.asset}>
                <Divider variant="dashed" my={10} />

                <Text component="span">
                  {`LTV = (${total_borrow} / `}
                  <Text component="span">
                    <NumberFormatter
                      value={new_collateral}
                      thousandSeparator
                      decimalScale={4}
                    />
                    {`) * `}
                  </Text>
                  <Text component="span">
                    <NumberFormatter
                      value={liquid_threshold}
                      thousandSeparator
                      decimalScale={2}
                    />
                    {` = `}
                  </Text>
                  <NumberFormatter
                    value={new_ltv}
                    thousandSeparator
                    decimalScale={4}
                  />{" "}
                  <Text component="span" fw={500}>
                    {`(`}
                    <u>
                      <NumberFormatter
                        suffix="%"
                        value={new_ltv * 100}
                        thousandSeparator
                        decimalScale={2}
                      />
                    </u>
                    {`)`}
                  </Text>
                </Text>

                <Text component="span">
                  {`IA = ${token_price} * `}
                  <NumberFormatter
                    value={new_ltv}
                    thousandSeparator
                    decimalScale={4}
                  />
                  {` = `}
                  <Text component="span" fw={500}>
                    <NumberFormatter
                      prefix="$"
                      value={new_ia}
                      thousandSeparator
                      decimalScale={4}
                    />
                  </Text>
                </Text>

                <Text component="span">
                  {`CPO = ${token_price} + `}
                  <NumberFormatter
                    value={new_ia}
                    thousandSeparator
                    decimalScale={4}
                  />
                  {` = `}
                  <Text component="span" fw={500}>
                    <NumberFormatter
                      prefix="$"
                      value={cpo}
                      thousandSeparator
                      decimalScale={4}
                    />
                  </Text>
                </Text>

                <Space my={10} />
                <Text c="gray">
                  {`if ${item.asset} increase up to `}
                  <Text component="span">
                    <u>
                      <NumberFormatter
                        suffix="%"
                        value={new_ltv * 100}
                        thousandSeparator
                        decimalScale={2}
                      />
                    </u>
                  </Text>
                </Text>
                <Text c="gray" component="span">
                  {`Your loan can be considered paid off if your ${item.asset} balance is above `}
                  <Text fw={600} component="span">
                    <u>
                      <NumberFormatter
                        prefix="$"
                        value={cpo}
                        thousandSeparator
                        decimalScale={4}
                      />
                    </u>
                  </Text>
                </Text>
              </React.Fragment>
            );
          })}
        </Stack>
      </Paper>
    </Stack>
  );
}
