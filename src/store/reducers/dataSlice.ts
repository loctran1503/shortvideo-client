import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AdminLoginResponse, DataType, GetAllTopicResponse } from "../../utils/type";
import { ADMIN_LOGIN, GET_ALL_TOPIC } from "../../utils/url";
import { RootState } from "../store";

const initialState : DataType = {
  
    isAdmin:false,
    suggestCount:0,
    topics:[],
    isLoading:true,
    topicActied:'Tất cả'
}

export const getAllTopic = createAsyncThunk('getAllTopic',async () =>{
    try {
      const result = await axios.post<GetAllTopicResponse>(GET_ALL_TOPIC);
  
    return result.data
  
    } catch (error) {
      return {
        success:false,
        message:JSON.stringify(error)
      }
    }
})

export const adminLoginAPI = createAsyncThunk('adminLoginAPI',async (account:string) =>{
  try {
    const result = await axios.post<AdminLoginResponse>(ADMIN_LOGIN,{
      account
    })

  return result.data

  } catch (error) {
    return {
      success:false,
      message:JSON.stringify(error)
    }
  }
})

const dataSlice = createSlice({
    name:'dataSlice',
    initialState,
    reducers:{
      setSuggestCount(state, action: PayloadAction<number>) {
        const temp = state.suggestCount-1;
        state.suggestCount = temp;
      },
      setTopicActived(state, action: PayloadAction<string>) {
        state.topicActied = action.payload;
      },
    },
    extraReducers:(builder) =>{
      // Get All Topic
      builder.addCase(getAllTopic.pending,(state) =>{
        state.isLoading = true
      });
      builder.addCase(getAllTopic.fulfilled,(state,action ) =>{
        const data : GetAllTopicResponse = action.payload as unknown as GetAllTopicResponse
        state.isLoading = false
        if(data.topics && data.topics.length>0) {
          state.topics = data.topics  
        }
        if(!data.success){
          console.error(data.message)
        }
      });
       // Admin login
       builder.addCase(adminLoginAPI.pending,(state) =>{
        state.isLoading = true
       
        
      });
      builder.addCase(adminLoginAPI.fulfilled,(state,action ) =>{
        const data : AdminLoginResponse = action.payload as unknown as AdminLoginResponse
        if(data.success ) {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${data.token}`;
          state.isAdmin = true;
          state.suggestCount = data.suggestCount || 0
        }
        if(!data.success){
          console.error(data.message);
        }
        state.isLoading = false
      })
    }
})

const dataReducer = dataSlice.reducer;
export const dataSelector = (state: RootState) => state.data;
export const { setSuggestCount,setTopicActived} =
  dataSlice.actions;

export default dataReducer;