export const supportedTemplateNames = [
  "navsegda",
  "pinkVibe",
  "minimalism",
  "nezhnost",
  "red_velvet",
  "test",
] as const;

export type SupportedTemplateName = (typeof supportedTemplateNames)[number];

const supportedTemplateNameSet = new Set<string>(supportedTemplateNames);

export const isSupportedTemplateName = (templateName: string): boolean =>
  supportedTemplateNameSet.has(templateName);
