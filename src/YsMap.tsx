import { type FC } from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Map, ZoomControl, withYMaps } from '@pbe/react-yandex-maps'

import './index.css'
import { Pin } from './Placemark'

type MapWindowProps = {
  data: { pointName: string; pointX: number; pointY: number }[]
}

const MapWindowComponent: FC<MapWindowProps> = ({ data }) => {
  enum MainColorsDiagram {
    LIGHT_BLUE = '#39b4db',
    GREEN = '#57a145',
    PURPLE = '#B069BB',
    ORANGE = '#e6963b',
    RED = '#da6e53',
    GREY = '#a5a6a6',
    LIGHT_WHITE = '#FBFBFB',
  }

  const colorsMap = [
    MainColorsDiagram.GREEN,
    MainColorsDiagram.ORANGE,
    MainColorsDiagram.PURPLE,
    MainColorsDiagram.LIGHT_BLUE,
    MainColorsDiagram.RED,
    MainColorsDiagram.GREY,
  ]

  const defaultState = {
    center: [data[0].pointY, data[0].pointX],
    zoom: 10,
  }

  const pointNameToColorMap: Record<string, MainColorsDiagram> = {
    'В работе': colorsMap[0],
    Завершено: colorsMap[4],
    Приостановлено: colorsMap[1],
    Проектирование: colorsMap[5],
    Реконструкция: colorsMap[2],
    Строительство: colorsMap[3],
  }

  return (
    <Map defaultState={defaultState} height='90%' width='100%'>
      {data.map(point => (
        <Pin
          key={point.pointName}
          color={pointNameToColorMap[point.pointName]}
          geometry={[point.pointY, point.pointX]}
          id={point.pointName}
          onClick={() => {}}
        />
      ))}
      <ZoomControl
        options={{
          position: { left: 20, top: 200 },
        }}
      />
    </Map>
  )
}

export const WithYmaps = withYMaps(MapWindowComponent, true, ['templateLayoutFactory'])
