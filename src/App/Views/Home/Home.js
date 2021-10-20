import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ListPost } from '../../Api/post';
import { ListComment } from '../../Api/comment';
import { FullUser } from '../../Api/user';
import { ListPostTag } from '../../Api/tag';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import './Home.css';
import '../../Components/Card/Card.css'

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

class Home extends Component {
    state = {
        post: [],
        openComments: false,
        openUser: false,
        comments: [],
        fullUser: []
    };

    componentDidMount() {
        if (sessionStorage.getItem('TokenSession')) {
            const ListPosts = Promise.resolve(ListPost());
            ListPosts.then((res) => {
                let dataPost = res.data.data
                this.setState({ post: dataPost })
            });
            ListPosts.catch((error) => {
            });
        }
    }

    onOpenModalComments = (id) => {
        const ListComments = Promise.resolve(ListComment(id));
        ListComments.then((res) => {
            let dataPostComments = res.data.data
            this.setState({ openComments: true, comments: dataPostComments });
        });
        ListComments.catch((error) => {
        });

    };

    onCloseModalComments = () => {
        this.setState({ openComments: false });
    };

    onOpenModalUser = (id) => {
        const User = Promise.resolve(FullUser(id));
        User.then((res) => {
            let dataPostUser = res.data
            this.setState({ openUser: true, fullUser: dataPostUser });
        });
        User.catch((error) => {
        });

    };

    onCloseModalUser = () => {
        this.setState({ openUser: false });
    };

    searchPost = (event) => {
        
        this.setState({search: event.target.value});
        const postTag = Promise.resolve(ListPostTag(event.target.value))
        postTag.then((res) => {
            let dataPostTag = res.data.data
            this.setState({ post: dataPostTag });
        });
        postTag.catch((error) => {
        });
    }

    render() {

        const { post, openComments, openUser, comments, fullUser, search } = this.state

        let posts = post.map(row => (
            <div className='card'>
                <div className='post-user'>
                    <img src={row.owner.picture} onClick={() => this.onOpenModalUser(row.owner.id)} />
                    <p onClick={() => this.onOpenModalUser(row.owner.id)}>{`${row.owner.firstName} ${row.owner.lastName} `}</p>
                </div>
                <img className='post-img' src={row.image} />

                <div className='post-like'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/220px-Heart_coraz%C3%B3n.svg.png' />
                    <p>{row.likes}</p>
                </div>
                <p className='post-tag'>{`#${row.tags.join(' #')}`}</p>
                <p>{row.text}</p>
                <a className='post-comment' onClick={() => this.onOpenModalComments(row.id)}>Ver comentarios</a>
            </div>
        ))

        if (!sessionStorage.getItem('TokenSession')) {
            return (<Redirect to={'/'} />)
        }

        return (
            <div className='home'>
                <div className='search'>
                    <h1>Post</h1>
                    <input className='input-search' placeholder='Search....' id='search' value={search} onChange={this.searchPost} />
                </div>
                <div className='post'>
                    {posts}
                </div>
                <div style={styles}>
                    <Modal open={openComments} onClose={this.onCloseModalComments} center={true}>
                        <h2>Comments</h2>
                        {comments.length !== 0 ?
                            comments.map(element => (
                                <div>
                                    <p><b>{`${element.owner.firstName} ${element.owner.lastName} `}:</b> {element.message}</p>

                                </div>
                            ))
                            : <p>No comments</p>}
                    </Modal>
                </div>
                <div style={styles}>
                    <Modal open={openUser} onClose={this.onCloseModalUser} center={true}>
                        {fullUser !== [] ?
                            <div className='user'>
                                <div>
                                    <img src={fullUser.picture} />
                                </div>
                                <div>
                                    <h2>{`${fullUser.firstName} ${fullUser.lastName} `}</h2>
                                    <p><b>Gender:</b> {fullUser.gender}</p>
                                    <p><b>Date of Bith:</b> {fullUser.dateOfBirth}</p>
                                    <p><b>Email:</b> {fullUser.email}</p>
                                    <p><b>Phone:</b> {fullUser.phone}</p>
                                </div>
                            </div>
                            :
                            <p></p>
                        }
                    </Modal>
                </div>
            </div>

        );
    }

}
export default Home;