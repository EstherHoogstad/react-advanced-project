import { React, useState } from "react";
import { Center, Heading, Flex, Button } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { SearchBar } from "../components/Searchbar";
import { EventItem } from "../components/EventItem";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = ({ selectionEvent }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const { events, categories } = useLoaderData();

  return (
    <>
      <Center
        backgroundColor="green.100"
        flexDirection="column"
        p={10}
        pt={3}
        gap={3}
      >
        <Heading color="green.900" textAlign="center" m={5}>
          List of events
        </Heading>
        <Button
          color="white"
          backgroundColor="green.300"
          m={3}
          cursor="pointer"
        >
          <Link to={"/event/new"}>New event</Link>
        </Button>

        <SearchBar value={searchText} onChange={handleSearchChange} />

        <Flex
          gap={4}
          flexWrap="wrap"
          flexDir={["column", "row"]}
          justify="center"
        >
          {events
            .filter((event) => {
              const titleMatch = event.title
                .toLowerCase()
                .includes(searchText.toLowerCase());

              const categoryMatch = Array.isArray(event.categoryIds)
                ? event.categoryIds
                    .map(
                      (categoryId) =>
                        categories.find(
                          (category) => category.id === categoryId
                        )?.name
                    )
                    .some((categoryName) =>
                      categoryName
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                : false;

              return titleMatch || categoryMatch;
            })

            .map((event) => (
              <Link key={event.id} to={`/event/${event.id}`}>
                <EventItem
                  key={event.title}
                  event={event}
                  selectionEvent={selectionEvent}
                />
              </Link>
            ))}
        </Flex>
      </Center>
    </>
  );
};
