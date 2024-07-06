import {
  ActionIcon,
  Container,
  Group,
  rem,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import cx from "clsx";
import Link from "next/link";
import MyLogo from "~/core/components/MyLogo";
import classes from "./footerSocial.module.css";
import { capitalizeFirstLetter } from "~/core/utils/string";
import { baseTransition } from "~/core/constants/base_setting";

const links = [
  {
    brand: "linkedin",
    icon: IconBrandLinkedin,
    link: "/",
  },
  {
    brand: "twitter",
    icon: IconBrandTwitter,
    link: "/",
  },
  {
    brand: "youtube",
    icon: IconBrandYoutube,
    link: "/",
  },
];

export default function Footer() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const changeColorScheme = computedColorScheme === "light" ? "dark" : "light";
  const tooltipScheme = `${capitalizeFirstLetter(changeColorScheme)} Theme`;

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <MyLogo />

        <Group
          gap={5}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          {links.map((item) => {
            const label = capitalizeFirstLetter(item.brand);

            return (
              <Tooltip
                label={label}
                withArrow
                transitionProps={baseTransition}
                key={item.brand}
              >
                <ActionIcon
                  size="lg"
                  color="gray"
                  variant="subtle"
                  component={Link}
                  href={item.link}
                >
                  <item.icon
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Tooltip>
            );
          })}

          <Tooltip
            label={tooltipScheme}
            withArrow
            transitionProps={baseTransition}
          >
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              aria-label="Toggle color scheme"
              onClick={() => setColorScheme(changeColorScheme)}
            >
              <IconSun
                className={cx(classes.icon, classes.light)}
                stroke={1.5}
              />
              <IconMoon
                className={cx(classes.icon, classes.dark)}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Container>
    </div>
  );
}
