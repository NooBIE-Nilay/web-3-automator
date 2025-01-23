export const nodeCategory = [
  {
    name: "Type",
    nodes: [
      {
        type: "conditional",
        label: "If Condition",
        icon: GitBranch,
        description: "Branch workflow based on condition",
      },
      {
        type: "loop",
        label: "Loop",
        icon: RefreshCw,
        description: "Loop over items",
      },
      {
        type: "selectData",
        label: "SelectData",
        icon: Filter,
        description: "Set input parameter",
      },
      {
        type: "switch",
        label: "Switch",
        icon: GitBranch,
        description: "Multiple conditional branches",
      },
      {
        type: "delay",
        label: "Time Delay",
        icon: TimerReset,
        description: "Add delay between steps",
      },
    ],
  },
  {
    name: "Moralis",
    nodes: [
      {
        type: "moralis",
        label: "Token transfers by wallet",
        icon: Wallet,
        description: "Get ERC20 token transfers by wallet",
      },
      {
        type: "moralis-transfer",
        label: "Token transfers by contract",
        icon: Wallet,
        description: "Get ERC20 token transfers by contract",
      },
      {
        type: "moralis-swap",
        label: "Swaps by token address",
        icon: Wallet,
        description: "Get Swaps by Token Address",
      },
    ],
  },
  {
    name: "Coinbase",
    nodes: [
      {
        type: "coinbase",
        label: "Swap tokens",
        icon: Wallet,
        description: "Trade tokens on the go",
      },
      {
        type: "coinbase-liquidity",
        label: "Add Liquidity",
        icon: Wallet,
        description: "Add liquidity in the pool",
      },
    ],
  },
  {
    name: "Telegram",
    nodes: [
      {
        type: "telegram",
        label: "Get notifications",
        icon: MessageCircleHeart,
        description: "Get notifications on Telegram",
      },
      {
        type: "telegram-message",
        label: "Send Message",
        icon: MessageCircleHeart,
        description: "Message any telegram user",
      },
    ],
  },

  {
    name: "App",
    nodes: [
      {
        type: "googlesheets",
        label: "Google Sheets",
        icon: Table,
        description: "Interact with Google Sheets",
      },
      {
        type: "uniswap",
        label: "Uniswap",
        icon: ArrowRightLeft,
        description: "Interact with Uniswap protocol",
      },
      {
        type: "textscreener",
        label: "Text Screener",
        icon: FileText,
        description: "Screen and analyze text content",
      },
    ],
  },
  {
    name: "Transformation",
    nodes: [
      {
        type: "filter",
        label: "Filter",
        icon: Filter,
        description: "Filter data based on conditions",
      },
      {
        type: "code",
        label: "Code",
        icon: Code,
        description: "Execute custom code",
      },
      {
        type: "summarize",
        label: "Summarize",
        icon: FileText,
        description: "Summarize data or text",
      },
    ],
  },
  {
    name: "Web3",
    nodes: [
      {
        type: "eventListener",
        label: "Event Listener",
        icon: Wallet,
        description: "Watch wallet events",
      },

      {
        type: "privatekey",
        label: "Private Key",
        icon: Wallet,
        description: "Manage private keys",
      },
      {
        type: "contract-events",
        label: "Contract Events",
        icon: Blocks,
        description: "Listen to contract events",
      },
      {
        type: "contract-transactions",
        label: "Contract Transactions",
        icon: Blocks,
        description: "Monitor contract transactions",
      },
      {
        type: "contract-function",
        label: "Contract Function",
        icon: FileCode,
        description: "Execute contract functions",
      },
    ],
  },
  {
    name: "Core",
    nodes: [
      {
        type: "webhook",
        label: "Webhook",
        icon: Webhook,
        description: "Handle HTTP webhooks",
      },
      {
        type: "http",
        label: "HTTP Request",
        icon: Globe,
        description: "Make HTTP requests",
      },
      {
        type: "code",
        label: "Code",
        icon: Code,
        description: "Execute custom code",
      },
      {
        type: "email",
        label: "Email",
        icon: Mail,
        description: "Send email notifications",
      },
    ],
  },
];