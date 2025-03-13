import {createSlice} from '@reduxjs/toolkit';
import sampleData from '../assets/data/sampleData.json';

const processedData = sampleData.map(item => ({
  ...item,
  profile_img: require('../assets/icons/profile-user.png'), // Convert image path to require()
  data: require('../assets/video/dev_sample_video_1280x720_1mb.mp4'), // Convert video path to require()
}));

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: processedData,
  },
  reducers: {
    updateItem: (state, action) => {
      const index = state.items.findIndex(
        item => item.id === action.payload?.id,
      );
      if (index !== -1) {
        state.items[index] = {...state.items[index], ...action.payload};
      }
    },
  },
});

export const {updateItem} = dataSlice.actions;
export default dataSlice.reducer;
