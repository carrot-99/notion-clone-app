import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React from 'react'
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const createMemo = () => {};

  return (
    <Box sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}>
      <LoadingButton 
        variant='outlined' 
        color="primary" 
        onClick={() => createMemo} 
        loading={loading}
      >
        最初のメモを作成
      </LoadingButton>
    </Box>
  )
}
