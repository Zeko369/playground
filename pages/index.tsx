import { Heading, VStack } from "@chakra-ui/layout";
import { Link } from "chakra-next-link";
import React, { useState } from "react";

const Home = () => {
  const [file, setFile] = useState<any>();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  const onClick = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/foo", {
      method: "POST",
      body: formData,
    });

    console.log(await res.text());
  };

  return (
    <VStack>
      <Heading>Home</Heading>

      <Link href="/form">Form</Link>

      <input type="file" onChange={onChange} />
      <button onClick={onClick}>Click</button>
    </VStack>
  );
};

export default Home;
