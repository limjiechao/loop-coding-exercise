import React from 'react';
import { List, Datagrid, EmailField, TextField } from 'admin-on-rest';

export const UserList = (props) => {
  return (
    <List title="All Users" {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="username" />
        <EmailField source="email" />
        <TextField label="Street" source="address.street" />
        <TextField label="Suite" source="address.suite" />
        <TextField label="Zipcode" source="address.zipcode" />
      </Datagrid>
    </List>
  );
};
