export interface DataType {
  
  isAdmin: boolean;
  suggestCount: number;
  topics:Topic[],
  isLoading:boolean;
  topicActied:string
}

export interface VideoType {
  videoId: string;
  title?: string;
  url: string;
  downloadedCounting: number;
  source: string;
  keyword: string;
  topics: Topic[];
  createdAt: Date;
}

export interface Topic {
  topicId: string;
  name: string;
  videos: VideoType[];
  createdAt: Date;
}

export interface Suggest{
    suggestId:string;
    link:string
    email?:string;
    createdAt:Date 
}
// Request

export interface CreateSuggest{
    link:string;
    email?:string;
    error?:string
}

export interface CreateVideo{
  title?:string;
  url:string;
  source?:string;
  keyword:string;
  topicList:Topic[]
}


// Response



export interface IResponse {
    success:boolean;
    message:string
}

export interface GetAllTopicResponse extends IResponse{
    topics?:Topic[]
}

export interface AdminLoginResponse extends IResponse{
  token?:string;
  suggestCount?:number;
}

export interface GetAllVideoResponse extends IResponse{
  videos?:VideoType[];
  totalCount?:number;
  hasMore?:boolean

}

export interface GetVideoResponse extends IResponse{
  video?:VideoType;

}

export interface GetAllSuggestResponse extends IResponse{
  suggestList?:Suggest[]
}
