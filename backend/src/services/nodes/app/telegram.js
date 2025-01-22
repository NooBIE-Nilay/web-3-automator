import axios from "axios";

const TOKEN = "7153928713:AAEN56U7R7qtVDa2lsXJ1yX9Cl_pAzLPf_g";
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

async function fetchUserId(username) {
  try {
    // get latest chats info

    let response = await axios.get(`${TELEGRAM_API}/getUpdates`);

    let userId = null;
    if (response.data.ok) {
      let filterdObj = response.data.result?.filter(
        (el) => el.message.from.username === username
      );

      userId = filterdObj?.length > 0 ? filterdObj?.[0].message.from.id : null;
    } else {
      console.log("faild to fetch chats ");
    }

    return userId;
  } catch (error) {
    console.log("fetchUserId failed ", error);
    return null;
  }
}

async function sendNotification(userId, message) {
  try {
    // get latest chats info

    if (!userId) {
      console.log("invalid user id ");
      return;
    }

    await axios.post(
      `${TELEGRAM_API}/sendMessage?chat_id=${userId}&text=${message}`
    );

    console.log("message sent");
  } catch (error) {
    console.log("sendNotification failed ", error);
  }
}

export async function executeTelegramNotification(workflow, node, inputs) {
  const nextNodeId = workflow.edges.find((edge) => edge.source === node.id).target;
  const userId = await fetchUserId(node.data.config.username);
  await sendNotification(userId, node.data.config.message);
  return [null, nextNodeId];
}