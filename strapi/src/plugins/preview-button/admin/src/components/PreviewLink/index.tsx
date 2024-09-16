import React from "react";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import Eye from "@strapi/icons/Eye";
import { LinkButton } from "@strapi/design-system/LinkButton";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";

const PreviewLink = () => {
  const { initialData } = useCMEditViewDataManager();
  if (!initialData.id) {
    return null;
  }

  return (
    <LinkButton
      size="S"
      startIcon={<Eye />}
      style={{ width: "100%" }}
      href={`http://localhost:3000/api/preview?secret=testtesttest&slug=${initialData.id}`}
      variant="secondary"
      target="_blank"
      rel="noopener noreferrer"
      title="page preview"
    >
      Preview
    </LinkButton>
  );
};

export default PreviewLink;
