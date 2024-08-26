import { generate } from "random-words";
export default function AvatarGenerator(text?: string) {
  // TODO: implement random text generator here for random avatar
  return `https://api.multiavatar.com/${text || generate()}.png`;
}
