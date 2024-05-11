interface MarkersLegendsProps {
  blueIcon: L.Icon
  redIcon: L.Icon
  goldIcon: L.Icon
}

export const MarkersLegends = ({
  blueIcon,
  redIcon,
  goldIcon,
}: MarkersLegendsProps) => {
  return (
    <div
      id="legend"
      className="mb-50 absolute bottom-24 right-0 z-[999] m-10 rounded-lg bg-background p-3 text-foreground shadow-md"
    >
      <ul>
        <li className="flex items-center pb-1 font-semibold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blueIcon.options.iconUrl}
            alt="Blue Icon"
            className="mr-2 h-4 w-3"
          />
          Arrecadação
        </li>
        <li className="flex items-center pb-1 font-semibold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={redIcon.options.iconUrl}
            alt="Gold Icon"
            className="mr-2 h-4 w-3"
          />
          Abrigo
        </li>
        <li className="flex items-center pb-1 font-semibold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={goldIcon.options.iconUrl}
            alt="Red Icon"
            className="mr-2 h-4 w-3"
          />
          Ponto de voluntarização
        </li>
      </ul>
    </div>
  )
}
