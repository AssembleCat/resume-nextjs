import packageInfo from '../package.json';

import { IFooter } from '../component/footer/IFooter';

const footer: IFooter.Payload = {
  disable: true,
  version: packageInfo.version,
  github: packageInfo.homepage,
};

export default footer;
