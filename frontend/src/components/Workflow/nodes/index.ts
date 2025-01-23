import TaskNode from "./Task/TaskNode";
import StartNode from "./Start/StartNode";
import ReplaceNode from "./Replace/ReplaceNode";
import ConditionalNode from "./Conditional/ConditionalNode";
import LoopNode from "./Loop/LoopNode";
import DelayNode from "./Delay/DelayNode";
import FilterNode from "./Filter/FilterNode";
import CodeNode from "./Code/CodeNode";
import WebhookNode from "./Webhook/WebhookNode";
import HttpRequestNode from "./HttpRequest/HttpRequestNode";
import EmailNode from "./Email/EmailNode";
import PrivateKeyNode from "./PrivateKey/PrivateKeyNode";
import EventListenerNode from "./EventListener/EventListenerNode";
import SelectDataNode from "./SelectData/SelectDataNode";
import TelegramNode from "./Telegram/TelegramNode";
import MoralisNode from "./Moralis/MoralisNode";
import CoinbaseNode from "./Coinbase/CoinbaseNode";

export const nodeTypes = {
  task: TaskNode,
  start: StartNode,
  replace: ReplaceNode,
  process: TaskNode,
  action: TaskNode,
  conditional: ConditionalNode,
  filter: FilterNode,
  code: CodeNode,
  loop: LoopNode,
  selectData: SelectDataNode,
  delay: DelayNode,
  webhook: WebhookNode,
  http: HttpRequestNode,
  email: EmailNode,
  privatekey: PrivateKeyNode,
  eventListener: EventListenerNode,
  telegram: TelegramNode,
  moralis: MoralisNode,
  coinbase: CoinbaseNode,
};
