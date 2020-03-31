import React from "react";
import { Typography } from "@material-ui/core";

export interface WidgetCardTitleProps {
  readonly title: string;
  readonly className?: string;
}

const WidgetCardTitle: React.FC<WidgetCardTitleProps> = ({
  title,
  className,
}) => {
  return (
    <Typography variant="h5" className={className}>
      {title}
    </Typography>
  );
};

export default WidgetCardTitle;
