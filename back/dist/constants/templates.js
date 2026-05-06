export const supportedTemplateNames = [
    "navsegda",
    "pinkVibe",
    "minimalism",
    "nezhnost",
    "red_velvet",
    "test",
];
const supportedTemplateNameSet = new Set(supportedTemplateNames);
export const isSupportedTemplateName = (templateName) => supportedTemplateNameSet.has(templateName);
