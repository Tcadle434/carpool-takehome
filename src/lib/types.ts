export type TransferDataType = {
  treeAuthority: string;
  transferCount: number;
};

export type InstructionDataType = {
  txSignature: string;
  slot: number;
  name: string;
  args: { [key: string]: any };
  logs: any[];
  timestamp: number;
  cpi_invoker: null;
  ixAccounts: { [key: string]: any };
};
