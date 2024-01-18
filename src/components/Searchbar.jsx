import { Input, Flex } from "@chakra-ui/react";

export const SearchBar = ({ value, onChange }) => {
  return (
    <Flex justifyContent="center" width="full" mb={8}>
      <Input
        placeholder="Search events"
        bg="white"
        value={value}
        onChange={onChange}
        width={{ base: "100%", sm: "75%", lg: "50%" }}
      />
    </Flex>
  );
};
