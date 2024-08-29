export type AttachmentProps = {
  entityId: string;
  entityType: string;
  base64File: string | null;
};

export type AttachmentInnerProps = {
  entityId: string;
  entityType: string;
  name?: string;
  id?: string;
  fileName?: string;
};
