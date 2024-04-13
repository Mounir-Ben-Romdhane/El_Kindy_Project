import { axiosPrivate, axiosPublic } from "api/axios";

export const getAdmins = async (role) => {
    const reponse = await axiosPublic.get(`/auth/getAllUserByRole/${role}`);
    return reponse;
}

// Remove a user
export const removeUser = async (userId) => {
    try {
        const response = await axiosPublic.delete(`/auth/removeUser/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing user:', error);
        throw error;
    }
};

// Add a new user
export const addAdmin = async (userData) => {
    try {
        const response = await axiosPublic.post(`/auth/addAdmin`, userData);
        return response;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

// Update an existing user
export const updateAdmin = async (userId, userData) => {
    try {
        const response = await axiosPublic.put(`/auth/updateUser/${userId}`, userData);
        return response;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Block a user
export const blockUser = async (userId) => {
    try {
      const response = await axiosPublic.put(`/auth/blockUser/${userId}`);
      return response;
    } catch (error) {
      console.error('Error blocking user:', error);
      throw error;
    }
  };
  
  // Unblock a user
  export const unblockUser = async (userId) => {
    try {
      const response = await axiosPublic.put(`/auth/unblockUser/${userId}`);
      return response;
    } catch (error) {
      console.error('Error unblocking user:', error);
      throw error;
    }
  };
  