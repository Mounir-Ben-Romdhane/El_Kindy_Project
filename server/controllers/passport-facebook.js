import fetch from 'node-fetch';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const facebooklogin = async (req, res) => {
    try {
        const { userID, accessToken } = req.body; // Include accessToken in the destructuring assignment
        
        console.log(accessToken);
        let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

        const response = await fetch(urlGraphFacebook, {
            method: "GET"
        });

        const data = await response.json();
        const { email, name, id } = data;

        const user = await User.findOne({ email }).exec();

        if (user) {
            const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
            const accessToken = jwt.sign({ id: user._id, fullName: user.firstName + " " + user.lastName }, process.env.JWT_SECRET, { expiresIn: "2m" });

            const { _id, name, email } = user;

            res.json({
                refreshToken,
                accessToken,
                user: { _id, name, email }
            });
        } else {
            // Nouvel utilisateur, créer un compte
            const newUser = new User({
                firstName: name,
                lastName: "",
                email,
                password: "", // Vous pouvez générer un mot de passe aléatoire si nécessaire
                facebookId: id // Ajouter le champ facebookId
            });

            const savedUser = await newUser.save();

            // Générer un nouveau token à chaque connexion
            const newAccessToken = jwt.sign({ id: savedUser._id, fullName: savedUser.firstName }, process.env.JWT_SECRET, { expiresIn: "7d" });
            const newRefreshToken = jwt.sign({ id: savedUser._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

            savedUser.refreshToken = newRefreshToken;
            savedUser.accessToken = newAccessToken;

            await savedUser.save();

            res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken, user: savedUser });
        }
    } catch (err) {
        console.error('Error fetching Facebook data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { facebooklogin };
