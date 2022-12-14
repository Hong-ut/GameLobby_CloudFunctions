// const cors = require('cors')({origin: true});
const functions = require("firebase-functions");
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.postColor = functions.https.onRequest(async (req, res) => {
        // Grab the text parameter.
        // original = "5qsdr5xIQRgFscpwOPvf,0,blue"
        res.set('Access-Control-Allow-Origin', '*');
        res.set("Access-Control-Allow-Methods", "GET");
        const original = req.query.text;
        // docId = originals[0], ind = parseInt(originals[1]), updatedColor = originals[2]
        const originals = original.split(",");
        const docId = originals[0];
        const ind = parseInt(originals[1]);
        const updatedColor = originals[2];
        // const currentColors = ["white", "white", "white", "white"]

        const currentColors = (await admin.firestore().collection('users').doc(docId).get()).data().player_colors
        console.log(currentColors);

        const first = currentColors.slice(0, ind);
        const second = currentColors.slice(ind + 1, currentColors.length);
        const total = first.concat([updatedColor], second);

        // Push the new message into Firestore using the Firebase Admin SDK.
        const writeResult = await admin.firestore().collection('users').doc(docId).update({
            player_colors: total
        });
        // Send back a message that we've successfully written the message
        res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

// return current playerColors on firestore
exports.getColor = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET");

    const original = req.query.text;
    // docId = originals[0], ind = parseInt(originals[1]), updatedColor = originals[2]
    const originals = original.split(",");
    const docId = originals[0];
    const currentColors = (await admin.firestore().collection('users').doc(docId).get()).data().player_colors
    res.json({ result: currentColors });
});