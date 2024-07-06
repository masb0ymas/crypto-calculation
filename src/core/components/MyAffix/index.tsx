import { ActionIcon, Affix, rem, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";

export default function MyAffix() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: rem(65), left: rem(30) }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <ActionIcon
            color="blue"
            variant="filled"
            size="lg"
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            <IconArrowUp size="1rem" />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
}
