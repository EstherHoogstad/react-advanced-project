import { React, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Heading,
  Center,
  Container,
  Box,
  Image,
  Text,
  Flex,
  Tag,
  Button,
  Wrap,
  ButtonGroup,
  Spacer,
} from "@chakra-ui/react";
import { EditModal } from "../components/EditModal";
import { Delete } from "../components/Delete";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
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

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();

  const [editOpen, setEditOpen] = useState(false);
  const openEdit = () => {
    setEditOpen(true);
  };
  const editClose = () => {
    setEditOpen(false);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const openDelete = () => {
    setDeleteOpen(true);
  };
  const deleteClose = () => {
    setDeleteOpen(false);
  };

  const navigate = useNavigate();

  const deleteEvent = () => {
    fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };

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
          <Image
            boxSize="100%"
            p={3}
            h="sm"
            objectFit="cover"
            src={event.image}
            alt={event.title}
          />
          <Flex minWidth="max-content" gap="2">
            <Box paddingLeft={3}>
              <Heading mb={2}>{event.title}</Heading>

              <Text
                mb="2"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                {event.description}
              </Text>
              <Text as="b">{event.location}</Text>
              <Box fontSize="sm" mb={4} mt={2}>
                <Text>From {dateTime(event.startTime)}h</Text>
                <Text>Untill {dateTime(event.endTime)}h</Text>
              </Box>
              <Box mb={4} mt={2}>
                <Wrap mt={3}>
                  {categories
                    .filter((category) =>
                      event.categoryIds.includes(category.id)
                    )
                    .map((category) => (
                      <Tag bg="green.300" key={category.id}>
                        {category.name}
                      </Tag>
                    ))}
                </Wrap>
              </Box>
            </Box>
            <Spacer />
            <Box paddingRight={3}>
              {users
                .filter((user) => event.categoryIds.includes(user.id))
                .map((user) => (
                  <div key={user.id}>
                    <Text mt="0" display="block">
                      Created by:
                    </Text>
                    <div>
                      <Image boxSize="100px" src={user.image} alt={user.name} />
                      {user.name}
                    </div>
                  </div>
                ))}
            </Box>
          </Flex>
          <Wrap mt={1} justify="center" alignItems="center">
            <ButtonGroup gap="2">
              <Button
                mb="4"
                style={{ width: "50%" }}
                colorScheme="green"
                onClick={() => openEdit(event)}
              >
                Edit event
              </Button>
              <Button
                style={{ display: "block", width: "60%" }}
                colorScheme="green"
                onClick={() => openDelete()}
              >
                Delete event
              </Button>
            </ButtonGroup>
          </Wrap>

          {editOpen && (
            <>
              <EditModal
                isOpen={editOpen}
                onClose={editClose}
                users={users}
                event={event}
                categories={categories}
              />
            </>
          )}

          {deleteOpen && (
            <>
              <Delete
                isOpen={deleteOpen}
                onClose={deleteClose}
                event={event}
                deleteEvent={deleteEvent}
              />
            </>
          )}
        </Container>
      </Center>
    </>
  );
};
