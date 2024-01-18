import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Spacer,
  Textarea,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";

export const EditForm = ({ onClose, event, categories, users }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [createdBy, setCreatedBy] = useState();
  const [inputStartDate, setInputStartDate] = useState("");
  const [inputStartTime, setInputStartTime] = useState("");
  const [inputEndDate, setInputEndDate] = useState("");
  const [inputEndTime, setInputEndTime] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const [waiting, setWaiting] = useState(false);

  let [dateStart, timeStart] = event.startTime.split("T");
  if (timeStart.length > 5) {
    timeStart = timeStart.slice(0, 5);
  }

  let [dateEnd, timeEnd] = event.endTime.split("T");
  if (timeEnd.length > 5) {
    timeEnd = timeEnd.slice(0, 5);
  }

  useEffect(() => {
    setTitle(event.title || "");
    setDescription(event.description || "");
    setLocation(event.location || "");
    setImage(event.image || "");
    setCategoryIds(event.categoryIds || []);
    setCreatedBy(event.createdBy || "");
    setInputStartDate(dateStart || "");
    setInputStartTime(timeStart || "");
    setInputEndDate(dateEnd || "");
    setInputEndTime(timeEnd || "");
  }, [event]);

  const startTime = inputStartDate + "T" + inputStartTime;
  const endTime = inputEndDate + "T" + inputEndTime;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      location,
      image,
      categoryIds,
      createdBy,
      startTime,
      endTime,
    };

    setWaiting("true");

    const response = await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setWaiting(false);
      onClose();
      toast({
        title: "Thank you!",
        description: "The edit was succesfull",
        status: "success",
        duration: 3000,
        isCloseable: true,
      });
      navigate("/");
    } else {
      console.error(`Error edit event: ${response.statusText}`);
      onClose();
      toast({
        title: "Failed",
        description: "An error occurred during the edit",
        status: "error",
        duration: 3000,
        isCloseable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <Input
          backgroundColor="white"
          type="text"
          name="title"
          id=""
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          required
        />
      </div>
      <div>
        <Spacer mt="3" />
        <label htmlFor="description">Event description</label>
        <Textarea
          backgroundColor="white"
          name="description"
          id=""
          cols="30"
          rows="4"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          required
        />
      </div>
      <div>
        <Spacer mt="3" />
        <label htmlFor="location">Location</label>
        <Input
          backgroundColor="white"
          type="text"
          name="location"
          id=""
          onChange={(event) => setLocation(event.target.value)}
          value={location}
          required
        />
      </div>
      <div>
        <Spacer mt="3" />
        <label htmlFor="image">Image url</label>
        <Input
          backgroundColor="white"
          type="text"
          name="image"
          id=""
          onChange={(event) => setImage(event.target.value)}
          value={image}
          required
        />
      </div>

      <div>
        <Spacer mt="3" />
        <label htmlFor="category">Category:</label>
        <Spacer />
        <select
          name="category"
          id=""
          onChange={(event) => setCategoryIds(event.target.value)}
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

        <label htmlFor="created">Created by:</label>
        <Spacer />
        <select
          name="created"
          id=""
          onChange={(event) => setCreatedBy(event.target.value)}
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
        <label htmlFor="start-date">Start date</label>
        <Input
          backgroundColor="white"
          type="date"
          name="start-date"
          id=""
          onChange={(event) => setInputStartDate(event.target.value)}
          value={inputStartDate}
          required
        />
      </div>
      <div>
        <Spacer mt="3" />
        <label htmlFor="start-time">Start time</label>
        <Input
          backgroundColor="white"
          type="time"
          name="start-time"
          id=""
          onChange={(event) => setInputStartTime(event.target.value)}
          value={inputStartTime}
          required
        />
      </div>
      <div>
        <Spacer mt="3" />
        <label htmlFor="end-date">End date</label>
        <Input
          backgroundColor="white"
          type="date"
          name="end-date"
          id=""
          onChange={(event) => setInputEndDate(event.target.value)}
          value={inputEndDate}
          required
        />
      </div>
      <div>
        <Spacer mt="3" />
        <label htmlFor="end-time">End time</label>
        <Input
          backgroundColor="white"
          type="time"
          name="end-time"
          id=""
          onChange={(event) => setInputEndTime(event.target.value)}
          value={inputEndTime}
          required
        />
      </div>
      <Flex mt={3}>
        <Spacer />
        <Button mt="2" onClick={onClose}>
          Cancel
        </Button>
        {!waiting && (
          <Button mt="2" ml="2" type="submit">
            Save changes
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
