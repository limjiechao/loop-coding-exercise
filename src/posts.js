import React from 'react';
import {
  List,
  Edit,
  Create,
  Datagrid,
  ReferenceField,
  TextField,
  EditButton,
  DisabledInput,
  LongTextInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput } from 'admin-on-rest';

export const PostEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ReferenceInput label="User" source="userId" reference="users" validate={required}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="User" source="userId" reference="users" validate={required} allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Create>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostList = (props) => {
  return (
      <List {...props}>
          <Datagrid>
              <TextField source="id" />
              <TextField source="title" />
              <TextField source="body" />
              <ReferenceField label="User" source="userId" reference="users" validate={required} allowEmpty>
                <TextField source="name" />
              </ReferenceField>
              <EditButton />
          </Datagrid>
      </List>
  );
}
