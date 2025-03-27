interface BlockUser {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    isBlocked: boolean;
  };
}

interface UnblockUser {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    isBlocked: boolean;
  };
}

interface DeleteUser {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
}

interface ApproveProduct {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    isApproved: boolean;
  };
}
interface ApproveSeller {
  status: string;
  error: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    status: string;
  };
}

export { BlockUser, UnblockUser, DeleteUser, ApproveProduct, ApproveSeller };
