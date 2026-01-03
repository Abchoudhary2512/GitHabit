import { nanoid } from "nanoid";

export function getDeviceId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("device_id");
  if (!id) {
    id = nanoid();
    localStorage.setItem("device_id", id);
  }
  return id;
}
