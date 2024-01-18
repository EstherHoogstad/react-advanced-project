import { EventForm } from "../components/EventForm";
import { Heading, Center, Container } from "@chakra-ui/react";

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const NewEventPage = () => {
  return (
    <>
      <Center backgroundColor="green.300">
        <Container
          p={4}
          backgroundColor="green.200"
          maxW={{
            base: "container.sm",
            lg: "container.md",
          }}
        >
          <Heading color="green.900" textAlign="center" m={2}>
            New event
          </Heading>
          <EventForm />
        </Container>
      </Center>
    </>
  );
};
