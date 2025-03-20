export interface RegistryCorpusInfo {
  name: string;
  title: string;
  repository: string;
  description: string;
  status: 'draft' | 'proposed' | 'published';
  license?: {
    name: string;
    url: string;
  };
}
declare const corpora: RegistryCorpusInfo[];
export default corpora;
