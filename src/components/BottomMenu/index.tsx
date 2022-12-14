import React from "react";

import { Container, Notification,Quantity,Title } from "./style";

type Props = {
  title: string;
  color: string;
  notifications?: string | undefined;
}

export function BottomMenu({title, color, notifications} : Props) {
  const noNotifications = notifications === '0';

  return (
    <Container>
      <Title color={color}>
          {title}
      </Title>

      {
        notifications && (
          <Notification noNotifications={noNotifications}>
            <Quantity Notifications={noNotifications}>{notifications}</Quantity>
          </Notification>
        )

      }
    </Container>
  )
}