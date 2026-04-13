import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY || "ta244544414ezkjfezjk5555",
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || "mt1",
  forceTLS: false,
  disableStats: true,
});

export default echo;