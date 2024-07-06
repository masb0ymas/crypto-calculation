import { Container, Loader } from "@mantine/core";
import { ReactComponentLike } from "prop-types";
import React, { useState } from "react";
import MyAffix from "~/core/components/MyAffix";
import Footer from "./public/footer";
import Header from "./public/header";

interface IProps {
  Component: ReactComponentLike;
}

const RootContext = React.createContext<
  { stateLayoutLoading: [boolean, (loading: boolean) => void] } & any
>({ stateLayoutLoading: [false, () => {}] });

export default function RootContainer(props: IProps) {
  const { Component } = props;

  const stateLayoutLoading = useState(false);
  const [isLayoutLoading] = stateLayoutLoading;

  return (
    <RootContext.Provider value={{ stateLayoutLoading }}>
      <div>
        <Header />

        <Container size="md" py={20}>
          {/* loading component */}
          {isLayoutLoading && <Loader />}

          {/* render content */}
          <Component {...props} />

          <MyAffix />
        </Container>

        <Footer />
      </div>
    </RootContext.Provider>
  );
}
