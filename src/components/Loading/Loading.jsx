import { Spinner, Text } from '@chakra-ui/react';
import { useIsFetching } from 'react-query';

const Loading = () => {
  const isFetching = useIsFetching();
  const display = isFetching ? 'inherit' : 'none';

  return (
    <Spinner
      speed="0.65s"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={display}
    >
      <Text display="none">Loading...</Text>
    </Spinner>
  );
}

export default Loading;
