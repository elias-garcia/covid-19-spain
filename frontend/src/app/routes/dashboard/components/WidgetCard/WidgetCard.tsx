import React from "react";
import { Card, CardContent, Divider } from "@material-ui/core";

import useStyles from "./styles";
import WidgetCardTitle from "../WidgetCardTitle/WidgetCardTitle";
import WidgetCardTitleWithInlineFilter, {
  WidgetCardTitleWithInlineFilterStateProps,
  WidgetCardTitleWithInlineFilterHandlerProps,
} from "../WidgetCardTitleWithInlineFilter/WidgetCardTitleWithInlineFilter";

interface WidgetCardWithoutTitleProps {
  readonly className?: string;
}

interface WidgetCardWithTitleWithoutFilterProps
  extends WidgetCardWithoutTitleProps {
  readonly title: string;
}

interface WidgetCardWithTitleAndFilterProps
  extends WidgetCardWithoutTitleProps {
  readonly title: WidgetCardTitleWithInlineFilterStateProps;
  readonly onFilterChange: WidgetCardTitleWithInlineFilterHandlerProps["onFilterChange"];
}

type WidgetCardProps =
  | WidgetCardWithoutTitleProps
  | WidgetCardWithTitleWithoutFilterProps
  | WidgetCardWithTitleAndFilterProps;

const WidgetCard: React.FC<WidgetCardProps> = (props) => {
  const { className, children } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={className}>
        {(() => {
          if (!("title" in props)) {
            return <></>;
          }
          if ("onFilterChange" in props) {
            return (
              <div>
                <WidgetCardTitleWithInlineFilter
                  {...props.title}
                  onFilterChange={props.onFilterChange}
                />
                <Divider className={classes.divider} />
              </div>
            );
          }

          return (
            <div>
              <WidgetCardTitle title={props.title} />
              <Divider className={classes.divider} />
            </div>
          );
        })()}
        {children}
      </CardContent>
    </Card>
  );
};

export default WidgetCard;
