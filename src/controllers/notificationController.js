// function notifyClients(req, res) {
//   const wss = req.app.get("wss");
//   const notification = {
//     type: "notification",
//     message: "You have a new message!",
//   };

//   wss.clients.forEach((client) => {
//     if (client.readyState === 1) {
//       // 1 = OPEN
//       client.send(JSON.stringify(notification));
//     }
//   });

//   res.json({ success: true });
// }

// module.exports = { notifyClients };
