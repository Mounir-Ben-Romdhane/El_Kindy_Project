import React, { useEffect, useState, useRef } from 'react';
import NavBar from "components/NavBar";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import SideBarTeacher from 'components/SideBarTeacher';
import TopBarTeacherTeacher from 'components/TopBarTeacherStudent';
import ChatBox from "../../../components/ChatBox/ChatBox";
import Backdrop from "@mui/material/Backdrop";
import GridLoader from "react-spinners/GridLoader";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { createChat, findChat } from '../../../api/ChatRequests';
import Footer from 'components/Footer';
function Index() {
  const accessToken = useSelector((state) => state.accessToken);
  const refreshTokenState = useSelector((state) => state.refreshToken);
  const [users, setUsers] = useState([]);
  const [existingChat, setExistingChat] = useState([]);
  const [showChatBox, setShowChatBox] = useState(false);
  const [createdChatId, setCreatedChatId] = useState(null);
  const [reciveeeeeerId, setReciveeeeeerId] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();
  const [receiverData, setReceiverData] = useState(null);
  let [color, setColor] = useState("#399ebf");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = accessToken ? jwtDecode(accessToken).id : "";
  //the other user of the chat
  const [receiverId, setReceiverId] = useState(null);


  //get the list of student taught by a teachher
  useEffect(() => {
    const controller = new AbortController();
    const getAllStudents = async () => {
      try {
        setOpen(true);
        const response = await axiosPrivate.get(`/auth/getStudentsTaughtByTeacher/${userId}`, {
          signal: controller.signal
        });
        setReceiverData(response.data);
        setOpen(false);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error(err);
          setOpen(false);
        }
      }
    }

    getAllStudents();
    return () => {
      controller.abort();
    }
  }, [receiverId, axiosPrivate]);
  // Dans votre composant Index

  useEffect(() => {
    if (createdChatId) {
      setShowChatBox(true);
    }
  }, [createdChatId]);


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosPrivate.get(`/chat/getChats/${userId}`);
        setUsers(response.data); // Supposons que chaque objet de chat inclut maintenant `otherUser`
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, [userId, axiosPrivate]);


  // Dans votre composant Index
  const handleContact = async (id) => {
    try {
      const response = await axiosPrivate.get(`/chat/find/${userId}/${id}`);

      if (response.status === 200 && response.data) {
        setCreatedChatId(response.data._id);
        const otherUserId = response.data.members.find(member => member !== userId);
        setReciveeeeeerId(otherUserId); // Id de l'autre membre du chat
        setReceiverId(otherUserId); // Mise à jour pour déclencher la récupération des données de l'utilisateur
      } else {
        alert("Une erreur s'est produite lors de la recherche du chat.");
        return;
      }
    } catch (error) {
      console.error("Erreur lors de la recherche ou de la création du chat :", error);
      alert("Une erreur s'est produite lors de la recherche du chat.");
      return;
    }
  };

  const handleCloseChatBox = () => {
    setShowChatBox(false);
    setCreatedChatId(null);
    setReciveeeeeerId("");
    setReceivedMessage(null);
    // Reset any other relevant state here
  };

  return (
    <div>
      <NavBar />
      <TopBarTeacherTeacher />
  
      <div className='container'>
        <div className="row">
          <SideBarTeacher />
          <div className="col-xl-9">
            {open ? (
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
              >
                <GridLoader color={color} loading={loading} size={20} />
              </Backdrop>
            ) : error ? (
              <h2>Error: {error}</h2>
            ) : (
              <>
                {/* Backdrop with GridLoader */}
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open2}
                >
                  <GridLoader color={color} loading={loading} size={20} />
                </Backdrop>
                <div className="card border-2 bg-transparent rounded-3">
                  <div className="row">
                    {users.filter(chat => chat.otherUser).map((chat) => (
                      <div className="col-lg-6" key={chat._id}>
                        <div className="card shadow p-2 m-2">
                          <div className="row g-0">
                            <div className="col-md-4">
                              <img src={chat.otherUser?.picturePath ? chat.otherUser.picturePath : "/assets/images/element/02.jpg"} className="rounded-3" alt="user" style={{ width: "130px", height: "auto", borderRadius: "10%" }} />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body">
                                <h5 className="card-title mb-0">{chat.otherUser?.firstName} {chat.otherUser?.lastName}</h5>
  
                              </div>
                              <div className="d-sm-flex me-5 justify-content-sm-end align-items-center">
                                <ul className="list-inline mb-0 mt-3 mt-sm-0">
                                  <button onClick={() => handleContact(chat.otherUser?._id)} className="btn btn-primary-soft">Contacter</button>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
  
                {showChatBox && ( // Render the ChatBox only if showChatBox is true
                  <div className="ChatBox-container" >
                    <ChatBox
                      keyy={createdChatId}
                      chat={createdChatId}
                      currentUser={userId}
                      receiverId={reciveeeeeerId}
                      receivedMessage={receivedMessage}
                      onClose={handleCloseChatBox}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
  <br></br>
      <Footer />
    </div>
  );
  
}

export default Index;
