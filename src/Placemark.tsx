import { type FC, memo } from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Placemark, useYMaps } from '@pbe/react-yandex-maps'
import { type YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing'

import { MarkerString } from './markerString'

type Props = {
  color: string
  geometry: number[]
  id?: string
  mapInstanceRef?: YMapsApi
  onClick: (el: any) => void
}

const PinComponent: FC<Props> = memo(({ color, geometry, id }) => {
  function replacePlaceholdersInMarkerString(markerString: string, fillColor: string) {
    return markerString.replace('{{fillColor}}', fillColor).replace('{{fillColor}}', fillColor)
  }
  const ymaps = useYMaps()

  const markerStringWithColors = replacePlaceholdersInMarkerString(MarkerString, color)

  const layout = ymaps?.templateLayoutFactory.createClass(
    `
${markerStringWithColors}
<div class="pin-container" id=${id}>  
<div class="placemark-description">          
  <p class="placemark-description__title">
    ${1}
    </p>          
   <p class="placemark-description__subtitle">              
    ${1}              
      <span class="placemark-description__price">
      ${1}
      </span>              
      ${2}          
    </p>      
  </div>          
  <div class="pin-container__pin">          
    <div class="placemark__background"></div>      
  </div>
</div>`,
    {
      build() {
        layout?.superclass?.build.call(this)

        const pinContainer = this.getParentElement().getElementsByClassName('pin-container')[0]

        this?.getData()?.options.set('shape', {
          coordinates: [0, 0],
          radius: 20,
          type: 'Circle',
        })

        this.getData().geoObject.events.add(
          'click',
          () => {
            pinContainer?.classList.contains('active')
              ? pinContainer?.classList.remove('active')
              : pinContainer?.classList.add('active')

            console.log(pinContainer)
          },
          this
        )

        this.getData().geoObject.events.add(
          'mouseenter',
          () => {
            // убрать класс видимости с тултипу
          },
          this
        )

        this.getData().geoObject.events.add(
          'mouseleave',
          () => {
            // убрать класс видимости с тултипа
          },
          this
        )
      },
    }
  )

  return (
    <Placemark
      geometry={geometry}
      options={{
        iconLayout: layout,
      }}
    />
  )
})

PinComponent.displayName = 'Pin'

export const Pin = PinComponent
