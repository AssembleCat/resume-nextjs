import profile from './profile';
import experience from './experience';
import project from './project';
import education from './education';
import etc from './etc';

import { _global } from './_global';

import { IProfile, IExperience, IProject, IEducation, IEtc, IGlobal } from './types';

const Payload: Payload = {
  profile,
  experience,
  project,
  education,
  etc,

  _global,
};

export interface Payload {
  profile: IProfile.Payload;
  experience: IExperience.Payload;
  project: IProject.Payload;
  education: IEducation.Payload;
  etc: IEtc.Payload;

  _global: IGlobal.Payload;
}

export default Payload;
