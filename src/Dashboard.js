import React, { Component } from 'react';
import { GET_LIST, AppBarMobile, jsonServerRestClient, ImageInput, ImageField } from 'admin-on-rest';
import withWidth from 'material-ui/utils/withWidth';
import { Card } from 'material-ui/Card'
import Dropzone from 'react-dropzone'
import UserInfo from './UserInfo'

const client = jsonServerRestClient('https://jsonplaceholder.typicode.com');
const styles = {
  userCard: {
    borderLeft: 'solid 4px #ff00ff',
    flex: 1,
    margin: '1rem',
    padding: '2rem'
  },
  imageInput: {
    borderLeft: 'solid 4px #ff00ff',
    flex: 1,
    margin: '1rem',
    padding: '2rem'
  },
  dropzone: {
    borderLeft: 'solid 4px #00ffff',
    flex: 1,
    margin: '1rem',
    padding: '2rem'
  },
  filedrop: {
    border: 'dashed 2px',
    padding: '2rem',
    width: 'auto',
    textAlign: 'center' ,
    userSelect: 'none'
  },
  li: {
    listStyle: 'none'
  },
  img: {
    padding: '1rem',
    display: 'inline-block',
    width: '20%'
  },
  imagePreview: {
    borderLeft: 'solid 4px #00ffff',
    flex: 1,
    margin: '1rem',
    padding: '2rem',
    display: 'flex'
  }
}

const restClientA = (type, resource, params) => new Promise(resolve => setTimeout(() => resolve(client(type, resource, params)), 500));

// const restClientA = (type, resource, params) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(client(type, resource, params))
//     }, 500);
//   });
// };

const restClientB = async (type, resource, params) => await client(type, resource, params);

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      input: {}
    };
  }

  componentDidMount() {
    // await fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(json => this.setState({ users: json }))

    restClientB(GET_LIST, 'users', {
        filter: { field: 'name'},
        sort: { field: 'name', order: 'ASC'},
        pagination: { page: 1, perPage: 1000 },
    })
    // .then(response => console.log(response.total))
    // .then(response => this.setState({ userCount: response.total }))
    .then(response => {
      let users = response.data;
      // let names = users.filter(user => user.name.substring(0, 1) === 'N')
      let names = users.filter(user => user.name.match(/^[Nn]/))
      // console.log(names)
      // console.log(names.length)
      // let names = users.forEach(user => console.log(user.name.substring(0, 1)))
      this.setState({ userCount: response.total })
      this.setState({ nameStartingWithN: names.length })
    });
  }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log('nextProps', nextProps);
  //   console.log('nextState', nextState);
  // }

  onDrop(acceptedFiles, rejectedFiles) {
    // console.log('acceptedFiles', acceptedFiles);
    // console.log('rejectedFiles', rejectedFiles);
    this.setState((prevState, props) => {
      return { files: [...prevState.files, ...acceptedFiles] };
    });
  }

  render() {
    const { width } = this.props;
    let userCount = this.state.userCount;
    let nameStartingWithN = this.state.nameStartingWithN;
    let files = this.state.files.map(file => {
      return (
        <li key={`list-${file.name}`}>{file.name} - {file.size} bytes</li>
      );
    })
    let images = this.state.files.map(file => {
      return (
        <img
          style={styles.img }
          src={file.preview}
          alt={file.name}
          key={`picture-${file.name}`}/>
      );
    });

    return(
      <div>
        {width === 1 && <AppBarMobile title="Loop Coding Exercise" />}
        <div style={ { display: 'flex' } }>
          <UserInfo value={userCount} subtitle="Total Users" />
          <UserInfo value={nameStartingWithN} subtitle="Users with Name Beginning with 'N'" />
        </div>
        <Card style={styles.imageInput}>
          <ImageInput
            input={this.state.input}
            label="Related pictures"
            accept="image/*"
            multiple={true}
            placeholder={
              <div>
                <h2>ImageInput</h2>
                <p>Drop your file here</p>
              </div>
            }>
            <ImageField source="src" title="title" style={ styles.img } />
          </ImageInput>
        </Card>
        <Card style={styles.dropzone}>
          <h2>Dropzone</h2>
          <Dropzone accept="image/jpeg, image/png" onDrop={this.onDrop.bind(this)} style={styles.filedrop}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </Card>
        <Card style={styles.imagePreview}>
          <h2>Images Upload Preview</h2>
          { images }
        </Card>
        <Card style={styles.dropzone}>
          <h2>Dropped Images List</h2>
          <ul>
            { files }
          </ul>
        </Card>
      </div>
    );
  };
}

export default withWidth()(Dashboard);
