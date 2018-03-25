import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import Dashboard from './Dashboard';
import { UserList } from './users'
import { PostList, PostEdit, PostCreate } from './posts';

const restClient = jsonServerRestClient('https://jsonplaceholder.typicode.com');

const App = () => (
  <Admin
    dashboard={Dashboard}
    title="Loop Coding Exercise"
    restClient={restClient}>
      <Resource name="users" list={UserList} />
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate}/>
  </Admin>
);

export default App;
