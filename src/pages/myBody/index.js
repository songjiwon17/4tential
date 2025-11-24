import MyBodyContentsBox from './MyBodyContentsBox';
import MyBodyCurrentStatus from './component/MyBodyCurrentStatus';
import MyBodyPredictedChanges from './component/MyBodyPredictedChanges';
import MyBodyTypeTimeline from './component/MyBodyTypeTimeline';
import { Box } from '@chakra-ui/react';

const MyBody = () => {
  return (
    <Box p={6}>
      <MyBodyPredictedChanges />
    </Box>
  );
};

export default MyBody;
