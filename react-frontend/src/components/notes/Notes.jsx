import axios from "axios";
import React from "react";
import { Button, Card } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import AddNote from "./AddNote";
import DeleteNote from "./DeleteNote";

const baseURL = "http://127.0.0.1:8000/api/notes/";

// export default function Notes() {
//   const [note, setNote] = React.useState(null);

//   React.useEffect(() => {
//     axios.get(baseURL, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + localStorage.getItem('access_token')
//         },
//     }).then((response) => {
//         setNote(response.data);
//     });
//   }, []);

//   if (!note) return null;

//   return (
//     <div>
//       <h1>{note.title}</h1>
//       <p>{note.user}</p>
//       <br />
//       <span>{note.created_on}</span> - <span>{note.updated_on}</span>
//       <br />
//       <p>{note.content}</p>
//     </div>
//   );
// }

export default class Notes extends React.Component {
    state = {
        notes: []
    }

    componentDidMount() {
        axios.get(baseURL, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then((response) => {
            const notes = response.data.results;
            this.setState({ notes });
            //console.log(notes)
        });
    }

    addNote(e) {
        axios.interceptors.request.use(
            config => {
                config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        )
        e.preventDefault();
        axios
            .post(baseURL, {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    title: "Hello World!",
                    user: `Bearer ${localStorage.getItem('access_token')}`
                    //content: "This is a new post.",
                }
            })
            .then((response) => {
                setPost(response.data);
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.notes.map(note => (
                        <div key={note.id}>
                            <Row xs={1} md={4} className="g-4">
                                <Col>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title>{note.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Created On: {note.created_on}</Card.Subtitle>
                                            <Card.Text>
                                                {note.content}
                                            </Card.Text>
                                            <DeleteNote id={note.id} />
                                            <Card.Link href="#">Another Link</Card.Link>
                                            <Button variant="primary">Go somewhere</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    ))
                }
                <AddNote />
            </div>
        )
    }
}