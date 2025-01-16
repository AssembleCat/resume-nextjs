import { Col, Row } from 'reactstrap';
import { EmptyRowCol, HrefTargetBlank } from '../common';

import { Style } from '../common/Style';

export const Footer = {
  Component,
};

function Component() {
  return (
    <Row>
      <Col style={Style.footerCover}>
        <div style={Style.footer} className="text-center mt-4">
          <EmptyRowCol>
            <small>
              <HrefTargetBlank url="https://github.com/uyu423/resume-nextjs" text="Made from" />
            </small>
          </EmptyRowCol>
        </div>
      </Col>
    </Row>
  );
}
