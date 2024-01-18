import { React } from "react";
import { useLoaderData, Link } from "react-router-dom";
import {
  Heading,
  AspectRatio,
  Image,
  Text,
  Box,
  Tag,
  Wrap,
} from "@chakra-ui/react";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    events: await events.json(),
    categories: await categories.json(),
  };
};

const dateTime = (timeString) => {
  const date = new Date(timeString);

  const newDateTime = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return newDateTime.format(date);
};

export const EventItem = ({ event }) => {
  const { events, categories } = useLoaderData();

  return (
    <>
      <Box
        w={300}
        h={415}
        maxW="sm"
        textAlign="center"
        backgroundColor="white"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
      >
        {events.map((event) => (
          <Link key={event.id} to={`/event/${event.id}`}></Link>
        ))}

        <AspectRatio ratio={16 / 9}>
          <Image src={event.image} alt={event.title} />
        </AspectRatio>

        <Heading p={1} m={3} textAlign="center" size="md">
          {event.title}
        </Heading>

        <Box mt="4">
          <Text
            mb={3}
            color="gray.500"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wide"
            fontSize="xs"
          >
            {event.description}
          </Text>
        </Box>

        <Text as="b">{event.location}</Text>
        <Text mt={4} fontSize="sm">
          From {dateTime(event.startTime)}h
        </Text>
        <Text fontSize="sm">Untill {dateTime(event.endTime)}h</Text>

        <Box mb={4} mt={2}>
          <Wrap mt={3} justify="center">
            {categories
              .filter((category) => event.categoryIds.includes(category.id))
              .map((category) => (
                <Tag bg="green.300" key={category.id}>
                  {category.name}
                </Tag>
              ))}
          </Wrap>
        </Box>
      </Box>
    </>
  );
};
