export interface Book {
  fileId: number;
  fileNo: string;
  fileTitle: string;
  fileAbstract: string;
  fileType: string;
  fileTag: string;
  previewPicture: string;
  previewRealObject: string;
  fileReadTimes: number;
  fileLikeTimes: number;
  fileCollectTimes: number;
  fileAuthor: string;
  fileIsbn: string;
  filePress: string;
  fileComingTime: string;
  filePageSize: number;
  userCollectStatus: boolean;
  userScore: number;
  fileHiddenScore: number;
}
