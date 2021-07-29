import React from "react";
import { z } from "zod";
import { NextPage } from "next";
import { Form, InputField } from "chakra-form";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  defaultTime: z.string(),
});

type schemaType = z.infer<typeof schema>;

const FormPage: NextPage = () => {
  return (
    <Form
      initialValues={{ name: "Foobar" }}
      schema={schema}
      onSubmit={async (data: schemaType) => {
        alert(JSON.stringify(data, null, 2));
      }}
      submitText="Create"
      wrapProps={{ align: "flex-start" }}
      buttonCenter
    >
      <InputField name="name" isRequired />
      <InputField name="description" isRequired />
      <InputField name="defaultTime" label="Default time" placeholder="2 weeks" />
    </Form>
  );
};

export default FormPage;
