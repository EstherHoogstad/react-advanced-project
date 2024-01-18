import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Flex } from "@chakra-ui/react";

export const Navigation = () => {
  const location = useLocation();

  const toHomepage = location.pathname !== "/";

  return (
    <Flex bg="green.300" direction="row" justify="left" p={3}>
      <nav>
        {toHomepage && (
          <Button mt="2" mb="2" bg="green.100">
            <Link to="/">&larr; Events</Link>
          </Button>
        )}
      </nav>
    </Flex>
  );
};
