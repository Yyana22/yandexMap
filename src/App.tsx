import { WithYmaps } from './YsMap'
import { YMaps } from '@pbe/react-yandex-maps'
import { Box } from '@mui/material'
function App() {
  const data = [
    { pointName: 'One', pointX: 37.573, pointY: 55.751 },
    { pointName: 'Two', pointX: 37.57, pointY: 55.76 },
  ]
  return (
    <>
      <Box>
        <YMaps query={{ apikey: '8bb5cdf6-83a2-449c-ab22-ab2b1e60ca13' }}>
          <WithYmaps data={data} />
        </YMaps>
      </Box>
    </>
  )
}

export default App
