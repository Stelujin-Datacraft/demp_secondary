const express = require("express");
const router = express.Router();

const { firebaseApp } = require("../main");

const db1 = firebaseApp.firestore();

router.delete("/logout", async (req, res) => {
  //send token id from frontend
  const id = req.query.id;
  try {
    const collectionRef = db1.collection("OTP");
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "Document has not found" });
    }
    snapshot.docs.forEach(async (doc) => {
      await db1.collection("OTP").doc(doc.id).delete();
    });

    const user = db1.collection("token");
    const getUser = await user.get();
    if (!getUser.exists) {
      return res.status(404).json({ error: "Document not found" });
    }
    await user.doc(id).delete();
    res.send({ message: "Deleted successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
