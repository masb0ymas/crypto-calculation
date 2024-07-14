import {
  Divider,
  Grid,
  NumberFormatter,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import _ from "lodash";
import EmptyRecord from "~/core/components/Empty/EmptyRecord";

interface RowTableAssetProps {
  defi: string;
  market: string;
  asset: string;
  liquid_threshold: number;
  price: number;
  amount: number;
}

interface TableAssetProps {
  label: string;
  data: RowTableAssetProps[];
}

export const defaultForm = {
  defi: "",
  market: "",
  asset: "",
  liquid_threshold: 0,
  price: 0,
  amount: 0,
};

/**
 *
 * @param props
 * @returns
 */
function RowTableAsset(props: RowTableAssetProps) {
  const { asset, amount, price, liquid_threshold } = props;

  const usd_value = Number(price) * Number(amount);

  return (
    <>
      <Grid.Col span={3} style={{ textAlign: "left" }}>
        <Stack gap={0}>
          <Text fw={500}>{amount}</Text>
          <Text fw={500}>{asset}</Text>
        </Stack>
      </Grid.Col>

      <Grid.Col span={3} style={{ textAlign: "center" }}>
        <Text fw={500}>{`$${price}`}</Text>
      </Grid.Col>

      <Grid.Col span={3} style={{ textAlign: "center" }}>
        <Text fw={500}>{`${liquid_threshold * 100}%`}</Text>
      </Grid.Col>

      <Grid.Col span={3} style={{ textAlign: "right" }}>
        <Text component="span" fw={500}>
          <NumberFormatter
            prefix="$"
            value={usd_value}
            thousandSeparator
            decimalScale={2}
          />
        </Text>
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

  const defaultMobileSize = 480;
  const { width } = useViewportSize();

  function renderAsset() {
    if (!_.isEmpty(data)) {
      return data.map((item) => {
        return <RowTableAsset {...item} key={item.asset} />;
      });
    }

    return (
      <Grid.Col>
        <Space mt={10} />

        <EmptyRecord />

        <Space mt={10} />
      </Grid.Col>
    );
  }

  let text_lt = "Liquid Threshold";

  if (width < defaultMobileSize) {
    text_lt = "LT";
  }

  return (
    <Stack gap={10}>
      <SimpleGrid cols={4}>
        <Text fw={400} size="sm" c="dimmed" style={{ textAlign: "left" }}>
          {label}
        </Text>

        <Text fw={400} size="sm" c="dimmed" style={{ textAlign: "center" }}>
          Price
        </Text>

        <Text fw={400} size="sm" c="dimmed" style={{ textAlign: "center" }}>
          {text_lt}
        </Text>

        <Text fw={400} size="sm" c="dimmed" style={{ textAlign: "right" }}>
          USD Value
        </Text>
      </SimpleGrid>

      <Divider variant="dashed" />

      <Grid columns={12} justify="flex-end" align="stretch">
        {renderAsset()}
      </Grid>
    </Stack>
  );
}
