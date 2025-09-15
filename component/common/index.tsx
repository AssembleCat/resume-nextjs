import { Row, Col } from 'reactstrap';
import { PropsWithChildren } from 'react';

export function EmptyRowCol<T = {}>({ children }: PropsWithChildren<T>) {
  return (
    <Row>
      <Col>{children}</Col>
    </Row>
  );
}

export function HrefTargetBlank({
  url,
  text,
  download,
}: PropsWithChildren<{ url: string; text?: string; download?: boolean }>) {
  return (
    <a href={url} target="_blank" rel="noreferrer noopener" download={download}>
      {text || url}
    </a>
  );
}
