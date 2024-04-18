import User from "../models/User.js"; // Import the User model
import bcrypt from "bcrypt";
import { sendEmail } from '../utils/sendMailer.js';
import jwt from "jsonwebtoken";

const addTeacher = async (req, res) => {
  try {
      // Extract required and optional teacher details from the request body
      const { 
          firstName, 
          lastName, 
          email, 
          password, 
          coursesTaught, 
          classesTeaching, // Updated field name
          dateOfBirth, 
          address, 
          gender, 
          phoneNumber1, 
          phoneNumber2, 
          disponibilite, 
          qualifications, 
          experienceYears 
      } = req.body;

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(password, salt);

      // Create a new user with the role of 'teacher' and provided details
      const newTeacher = new User({
          firstName,
          lastName,
          email,
          password: passwordHash,
          passwordDecoded: password,
          roles: ['teacher'],
          dateOfBirth,
          address,
          gender,
          phoneNumber1,
          phoneNumber2,
          disponibilite,
          teacherInfo: {
              coursesTaught,
              classesTeaching, // Updated field name
              qualifications,
              experienceYears
          }
      });

      // Save the new teacher to the database
      await newTeacher.save();

      // Send success response
      res.status(201).json({ message: 'Teacher added successfully', teacher: newTeacher });
  } catch (error) {
      // If an error occurs, send error response
      console.error('Error adding teacher:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};



// Define the route handler to add a student and their parent
const addStudentAndParent = async (req, res) => {
    try {
        // Extract student and parent details from the request body
        const { 
            firstName, 
            lastName, 
            email, 
            password, 
            dateOfBirth, 
            address, 
            gender, 
            phoneNumber1, 
            phoneNumber2,
            disponibilite,
            classLevel,
            coursesEnrolled,
            parentName,
            parentEmail,
            parentPhone
        } = req.body;

         // Check if all required fields are provided
         if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create a new user document for the student
        const student = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            passwordDecoded: password,
            dateOfBirth,
            address,
            gender,
            phoneNumber1,
            phoneNumber2,
            disponibilite,
            roles: ['student'], // Set role to student
            studentInfo: {
                classLevel,
                coursesEnrolled,
                parentName,
                parentEmail,
                parentPhone
                
            }
        });

        

        // Save the student document
        await student.save();

        // Send success response
        res.status(201).json({ message: 'Student and parent added successfully' });
    } catch (error) {
        // If an error occurs, send error response
        console.error('Error adding student and parent:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Define the addAdmin function
const addAdmin = async (req, res) => {
    try {
        // Extract admin details from the request body
        const { 
            firstName, 
            lastName, 
            email, 
            password, 
            picturePath, 
            verified, 
            refreshToken, 
            authSource, 
            dateOfBirth, 
            address, 
            gender, 
            phoneNumber1, 
            phoneNumber2, 
            disponibilite 
            // Add any additional fields here as needed
        } = req.body;

        // Check if all required fields are provided
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create a new user with the role of 'admin' and provided details
        const newAdmin = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            passwordDecoded: password,
            picturePath: picturePath || "",
            verified: verified || false,
            refreshToken: refreshToken || "",
            authSource: authSource || "local",
            roles: ['admin'],
            dateOfBirth: dateOfBirth || null,
            address: address || "",
            gender: gender || "",
            phoneNumber1: phoneNumber1 || "",
            phoneNumber2: phoneNumber2 || "",
            disponibilite: disponibilite || []
            // Add any additional fields here as needed
        });

        // Save the new admin to the database
        const savedUser = await newAdmin.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {expiresIn:"1d"});
        const url = `http://localhost:3000/verify-account/${savedUser._id}/verify/${token}`;
        const body =`<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to Elkindy</title>
              <style>
                @keyframes fadeIn {
                  0% { opacity: 0; }
                  100% { opacity: 1; }
                }
                body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f7f7f7;
                  margin: 0;
                  padding: 0;
                }
                .email-container {
                  max-width: 600px;
                  margin: auto;
                  background: #ffffff;
                  border: 1px solid #cccccc;
                  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
                }
                .header {
                  background-color: #4e8098; /* A calming blue-grey */
                  color: #ffffff;
                  padding: 20px;
                  text-align: center;
                }
                .content img {
                  max-width: 100%;
                  height: auto;
                  border-bottom: 5px solid #4e8098; /* Matching the header */
                  display: block;
                  margin-bottom: 30px;
                }
                .content {
                  padding: 20px;
                  color: #333333;
                  text-align: center;
                }
                .content h2 {
                  color: #4e8098;
                  margin-bottom: 20px;
                }
                .content p {
                  line-height: 1.6;
                  margin-bottom: 15px;
                }
                .login-details {
                  background-color: #e8e8e8; /* A light grey for contrast */
                  border-left: 3px solid #4e8098;
                  padding: 15px;
                  margin: 25px 0;
                  display: inline-block;
                  transition: box-shadow 0.3s ease;

                }
                .login-details:hover {
                  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
                }
                .footer {
                  background-color: #4e8098;
                  color: #ffffff;
                  text-align: center;
                  padding: 10px;
                  font-size: 12px;
                }
                /* Additional styles if necessary */
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="content">
                  <!-- Replace 'your-image-url.jpg' with the actual URL of your image -->
                  <img class="image-with-border" src="https://i.imgur.com/4qQS8E2.jpeg" alt="Conservatory Scene">
            
                  <p>Dear ${savedUser.firstName + " " + savedUser.lastName},</p>
                  <p>We are thrilled to welcome you to Elkindy, your new home for musical excellence. At Elkindy, we embrace the diversity of age, experience, and nationality, providing a vibrant community where music education is both accessible and exceptional.</p>
                  <div class="login-details" style="width: 90%;">
                    <h4><strong>Please verify your email:</strong></h4>
                    <a href="${url}" style="display: inline-block; background-color: #4e8098; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
                  </div>
                  <p>We encourage you to log in promptly and start exploring the various resources available to you. Remember, the realm of music is vast, and every lesson is a step towards mastery. We are excited to see where this musical voyage will take you.</p>
                  <p>Welcome aboard,</p>
                  <p><strong>The Elkindy Team</strong></p>
                </div>
                <div class="footer">
                  © 2024 Elkindy. All rights reserved.
                </div>
              </div>
            </body>
        </html>`;
            await sendEmail(email,"Verify your emaill", body); // sends verification link to user's email

        // Send success response
        res.status(201).json({ message: 'Admin added successfully', admin: newAdmin });
    } catch (error) {
        // If an error occurs, send error response
        console.error('Error adding admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const removeUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Logic to remove the user from the database (e.g., using Mongoose)
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User removed successfully" });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const userData = req.body;

  try {
    // Check if password is provided
    if (userData.password) {
      // If password is provided, hash it
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(userData.password, salt);
      // Set hashed password and decoded password in user data
      userData.passwordDecoded = userData.password; // Update decoded password
      userData.password = passwordHash;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update teacher
const updateTeacher = async (req, res) => {
  const teacherId = req.params.teacherId;
  const teacherData = req.body;

  try {
    // Check if password is provided
    if (teacherData.password) {
      // If password is provided, hash it
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(teacherData.password, salt);
      // Set hashed password and decoded password in teacher data
      teacherData.passwordDecoded = teacherData.password; // Update decoded password
      teacherData.password = passwordHash;
    }
    
    // Update user fields
    const updatedTeacher = await User.findByIdAndUpdate(
      teacherId,
      {
        $set: {
          'firstName': teacherData.firstName,
          'lastName': teacherData.lastName,
          'email': teacherData.email,
          'password': teacherData.password,
          'passwordDecoded': teacherData.passwordDecoded,
          'dateOfBirth': teacherData.dateOfBirth,
          'address': teacherData.address,
          'gender': teacherData.gender,
          'phoneNumber1': teacherData.phoneNumber1,
          'phoneNumber2': teacherData.phoneNumber2,
          'disponibilite': teacherData.disponibilite,
          'teacherInfo.coursesTaught': teacherData.coursesTaught,
          'teacherInfo.classesTeaching': teacherData.classesTeaching,
          'teacherInfo.qualifications': teacherData.qualifications,
          'teacherInfo.experienceYears': teacherData.experienceYears
        }
      },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher updated successfully", teacher: updatedTeacher });
  } catch (error) {
    console.error("Error updating teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateStudent = async (req, res) => {
  const studentId = req.params.studentId;
  const studentData = req.body;

  try {
      // Check if password is provided
      if (studentData.password) {
          // If password is provided, hash it
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
          const passwordHash = await bcrypt.hash(studentData.password, salt);
          // Set hashed password and decoded password in student data
          studentData.passwordDecoded = studentData.password; // Update decoded password
          studentData.password = passwordHash;
      }

      // Update user fields
      const updatedStudent = await User.findByIdAndUpdate(
          studentId,
          {
              $set: {
                  'firstName': studentData.firstName,
                  'lastName': studentData.lastName,
                  'email': studentData.email,
                  'password': studentData.password,
                  'passwordDecoded': studentData.passwordDecoded,
                  'dateOfBirth': studentData.dateOfBirth,
                  'address': studentData.address,
                  'gender': studentData.gender,
                  'phoneNumber1': studentData.phoneNumber1,
                  'phoneNumber2': studentData.phoneNumber2,
                  'disponibilite': studentData.disponibilite,
                  'studentInfo.classLevel': studentData.classLevel,
                  'studentInfo.coursesEnrolled': studentData.coursesEnrolled,
                  'studentInfo.parentName': studentData.parentName,
                  'studentInfo.parentEmail': studentData.parentEmail,
                  'studentInfo.parentPhone': studentData.parentPhone
              }
          },
          { new: true }
      );

      if (!updatedStudent) {
          return res.status(404).json({ message: "Student not found" });
      }

      res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};






// Define the blockUser function
const blockUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Logic to update user data to mark as blocked in the database
    // Example:
    const blockedUser = await User.findByIdAndUpdate(userId, { blocked: true }, { new: true });
    
    if (!blockedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User blocked successfully", user: blockedUser });
  } catch (error) {
    console.error("Error blocking user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Define the unblockUser function
const unblockUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Logic to update user data to mark as unblocked in the database
    // Example:
    const unblockedUser = await User.findByIdAndUpdate(userId, { blocked: false }, { new: true });
    
    if (!unblockedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User unblocked successfully", user: unblockedUser });
  } catch (error) {
    console.error("Error unblocking user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





// Export the route handler
export { addStudentAndParent, addTeacher, addAdmin, removeUser, updateUser, updateTeacher, updateStudent,  blockUser, unblockUser };

