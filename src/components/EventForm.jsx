import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Input, Textarea, Button, Flex, Spacer, Text } from "@chakra-ui/react";

export const EventForm = () => {
  const { users, categories } = useLoaderData();
  const navigate = useNavigate();

  const [createdBy, setCreatedBy] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [location, setLocation] = useState("");
  const [inputStartDate, setInputStartDate] = useState("");
  const [inputStartTime, setInputStartTime] = useState("");
  const [inputEndDate, setInputEndDate] = useState("");
  const [inputEndTime, setInputEndTime] = useState("");

  const [waiting, setWaiting] = useState(false);

  const startTime = inputStartDate + "T" + inputStartTime;
  const endTime = inputEndDate + "T" + inputEndTime;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    };

    setWaiting(true);

    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("New event added");
      setWaiting(false);
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Text>Title</Text>
        <Input
          backgroundColor="white"
          type="text"
          name="title"
          id=""
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>
      <div>
        <Spacer mt="3" />
        <Text>Event description</Text>
        <Textarea
          backgroundColor="white"
          name="description"
          id=""
          cols="30"
          rows="4"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>
      <div>
        <Spacer mt="3" />
        <Text>Image url</Text>
        <Input
          backgroundColor="white"
          type="text"
          name="image"
          id=""
          onChange={(e) => setImage(e.target.value)}
          value={image}
          required
        />
      </div>

      <div>
        <Spacer mt="3" />
        <Text>Category:</Text>
        <Spacer />
        <select
          name="category"
          id=""
          onChange={(e) => setCategoryIds(e.target.value)}
          value={categoryIds}
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <Spacer mt="3" />
        <Text>User</Text>
        <Spacer />
        <select
          name="user"
          id=""
          onChange={(e) => setCreatedBy(e.target.value)}
          value={createdBy}
          required
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Spacer mt="3" />
        <Text>Location</Text>
        <Input
          backgroundColor="white"
          type="text"
          name="location"
          id=""
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          required
        />
      </div>
      <div>
        <Spacer mt="3" />
        <Text>Start date</Text>
        <Input
          backgroundColor="white"
          type="date"
          name="start-date"
          id=""
          onChange={(e) => setInputStartDate(e.target.value)}
          value={inputStartDate}
          required
        />
      </div>
      <div>
        <Spacer mt="3" />
        <Text>Start time</Text>
        <Input
          backgroundColor="white"
          type="time"
          name="start-time"
          id=""
          onChange={(e) => setInputStartTime(e.target.value)}
          value={inputStartTime}
          required
        />
      </div>
      <div>
        <Spacer mt="3" />
        <Text>End date</Text>
        <Input
          backgroundColor="white"
          type="date"
          name="end-date"
          id=""
          onChange={(e) => setInputEndDate(e.target.value)}
          value={inputEndDate}
          required
        />
      </div>
      <div>
        <Spacer mt="3" />
        <Text>End time</Text>
        <Input
          backgroundColor="white"
          type="time"
          name="end-time"
          id=""
          onChange={(e) => setInputEndTime(e.target.value)}
          value={inputEndTime}
          required
        />
      </div>
      <Flex>
        <Spacer />
        <Link to={"/"}>
          <Button mt="2">Cancel</Button>
        </Link>
        {!waiting && (
          <Button mt="2" ml="2" type="submit">
            Save event
          </Button>
        )}
        {waiting && (
          <Button mt="2" ml="2" disabled>
            Adding event
          </Button>
        )}
      </Flex>
    </form>
  );
};
