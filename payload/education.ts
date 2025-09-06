import { IEducation } from '../component/education/IEducation';

const education: IEducation.Payload = {
  disable: false,

  list: [
    {
      title: '한신대학교',
      subTitle: '컴퓨터공학부 재학(4.16/4.5) / 성적장학금 4회',
      startedAt: '2020-03',
      // endedAt: '',
    },
    {
      title: '경기 이우고등학교',
      subTitle: '',
      startedAt: '2016-03',
      endedAt: '2018-02',
    },
  ],
};

export default education;
