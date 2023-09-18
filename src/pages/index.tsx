import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { trpc } from '../utils/trpc';


export default function Home() {
  const hello = trpc.hello.useQuery({ text: 'client' });
  // const hello = trpc.hello.useQuery({ text: "mom" });
  // trpc.userList.useQuery("pinaz");
  const mutation = trpc.userCreate.useMutation({

  });
  React.useEffect(() => {
    mutation.mutateAsync("sadiq");
  }, []);



  if (!mutation.data) {
    return <div>{mutation.data} ???</div>;
  } else {
    console.log(mutation);
    return JSON.stringify(mutation);
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {hello.data?.greeting}
        </Typography>
      </Box>
    </Container>
  );
}
