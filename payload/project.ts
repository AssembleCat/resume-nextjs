import { IProject } from '../component/project/IProject';

const project: IProject.Payload = {
  disable: false,
  list: [
    {
      title: 'Analyze the Spire 전투 예측 모델',
      startedAt: '2024-12',
      descriptions: [
        {
          content:
            '턴제 카드 게임 Slay the Spire에서 플레이어가 전투 중 받을 것으로 예상되는 피해량을 예측하는 딥러닝 기반 시스텝입니다. 약 4억개의 전투 데이터를 활용하여 효과적인 전투계획을 돕는것을 목표로 했습니다.',
        },
        {
          content:
            '덱, 아이템, 적 유형, 난이도, 체력 등을 포함한 데이터를 기반으로 이번 전투에 받을 가능성이 높은 데미지 구간을 제시합니다.',
        },
      ],
    },
  ],
};

export default project;
