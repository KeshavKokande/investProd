import { Box, Spinner } from "@chakra-ui/react";
const Loading = () => {
  return (
    <Box
      position='absolute'
      top='30%'
      left='50%'
    >
      <Spinner thickness='5px'
        style={{ width: '100px', height: '100px' }}
        color='green' />
    </Box>
  );
};

export default Loading;
