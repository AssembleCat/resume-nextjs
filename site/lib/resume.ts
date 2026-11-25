import type { Payload } from '../../payload';

/** 화면과 인쇄가 공유하는 모델. 별도 프로젝트 허용 목록이나 복제된 본문을 두지 않는다. */
export function buildResumeModel(resume: Payload) {
  const projects = resume.project.disable ? [] : resume.project.list;
  const companies = resume.experience.disable ? [] : resume.experience.list;
  const companyIds = new Set(companies.map((company) => company.id).filter(Boolean));
  return {
    profile: resume.profile,
    companies: companies.map((company) => ({
      ...company,
      projects: projects.filter((project) => company.id && project.companyId === company.id),
    })),
    // 경력을 숨기거나 삭제하더라도 프로젝트 자체를 명시적으로 숨기기 전에는 누락하지 않는다.
    independentProjects: projects.filter(
      (project) => !project.companyId || !companyIds.has(project.companyId),
    ),
    education: resume.education.disable ? [] : resume.education.list,
    records: resume.etc.disable ? [] : resume.etc.list,
  };
}
