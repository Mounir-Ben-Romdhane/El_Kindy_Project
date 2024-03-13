import { log } from "console";
import ChatModel from "../models/chatModel.js";

export const createChat = async (req, res) => {
  console.log("createChat", req.body);
  const { senderId, receiverId } = req.body;
  if (!senderId || !receiverId) {
    return res.status(400).json({ error: 'Both senderId and receiverId are required' });
  }

  try {
    // Vérifiez si un chat existe déjà entre l'expéditeur et le destinataire
    const existingChat = await ChatModel.findOne({
      members: { $all: [senderId, receiverId] }
    });

    if (existingChat) {
      // Le chat existe déjà, renvoyer un message approprié
      console.log("Chat already exists between sender and receiver");
      return res.status(200).json({ error: 'Chat already exists between sender and receiver' });
    }

    // Le chat n'existe pas encore, créer un nouveau chat
    const newChat = new ChatModel({
      members: [senderId, receiverId],
    });console.log("newChat",newChat);
    const result = await newChat.save();
    res.status(201).json(result);
    console.log("result", result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chats = await ChatModel.find({
      members: { $elemMatch: { $eq: userId } },
    });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
};



export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
    console.log("chat", chat);
  } catch (error) {
    res.status(500).json(error)
  }
};