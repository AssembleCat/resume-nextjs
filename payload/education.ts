import { IEducation } from '../component/education/IEducation';

const education: IEducation.Payload = {
  disable: false,

  list: [
    {
      title: '한신대학교',
      subTitle: '컴퓨터공학부 재학',
      startedAt: '2020-03',
      descriptions: [
        {content: '학점 4.15/4.5'},
        {content: '성적 장학금 4회'}
      ]
    },
    {
      title: '경기 이우고등학교',
      subTitle: '이공계열 졸업',
      startedAt: '2016-03',
      endedAt: '2018-02',
    },
  ],
};

export default education;
