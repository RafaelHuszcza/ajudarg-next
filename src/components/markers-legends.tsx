interface MarkersLegendsProps {
  blueIcon: L.Icon
  redIcon: L.Icon
  goldIcon: L.Icon
  renderRisks: boolean
  renderZones: boolean
}

export const MarkersLegends = ({
  blueIcon,
  redIcon,
  goldIcon,
  renderRisks,
  renderZones,
}: MarkersLegendsProps) => {
  return (
    <div
      id="legend"
      className="mb-50 absolute bottom-0 right-0 z-[999] m-10 rounded-lg bg-background p-3 text-foreground shadow-md"
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
            src={goldIcon.options.iconUrl}
            alt="Gold Icon"
            className="mr-2 h-4 w-3"
          />
          Abrigo
        </li>
        <li className="flex items-center pb-1 font-semibold">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={redIcon.options.iconUrl}
            alt="Red Icon"
            className="mr-2 h-4 w-3"
          />
          Ponto de voluntarização
        </li>
        {renderRisks && (
          <li className="flex items-center font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="mr-1 h-5 w-4"
            >
              <path
                fill="#f05151"
                d="M20 2H4c-1.1 0-2 .9-2 2v16a2 2 0 0 0 2 2h16c1.11 0 2-.89 2-2V4a2 2 0 0 0-2-2M4 6l2-2h4.9L4 10.9zm0 7.7L13.7 4h4.9L4 18.6zM20 18l-2 2h-4.9l6.9-6.9zm0-7.7L10.3 20H5.4L20 5.4z"
              />
            </svg>
            Zona de risco (dados prefeitura)
          </li>
        )}

        {renderZones && (
          <>
            <li className="flex items-center font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="mr-1 h-5 w-4"
              >
                <path
                  fill="#87a5fa"
                  d="M20 2H4c-1.1 0-2 .9-2 2v16a2 2 0 0 0 2 2h16c1.11 0 2-.89 2-2V4a2 2 0 0 0-2-2M4 6l2-2h4.9L4 10.9zm0 7.7L13.7 4h4.9L4 18.6zM20 18l-2 2h-4.9l6.9-6.9zm0-7.7L10.3 20H5.4L20 5.4z"
                />
              </svg>
              Zona de baixo impacto (dados Furg)
            </li>
            <li className="flex items-center font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="mr-1 h-5 w-4"
              >
                <path
                  fill="#ffd57b"
                  d="M20 2H4c-1.1 0-2 .9-2 2v16a2 2 0 0 0 2 2h16c1.11 0 2-.89 2-2V4a2 2 0 0 0-2-2M4 6l2-2h4.9L4 10.9zm0 7.7L13.7 4h4.9L4 18.6zM20 18l-2 2h-4.9l6.9-6.9zm0-7.7L10.3 20H5.4L20 5.4z"
                />
              </svg>
              Zona de médio impacto (dados Furg)
            </li>
            <li className="flex items-center font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="mr-1 h-5 w-4"
              >
                <path
                  fill="#ff8000"
                  d="M20 2H4c-1.1 0-2 .9-2 2v16a2 2 0 0 0 2 2h16c1.11 0 2-.89 2-2V4a2 2 0 0 0-2-2M4 6l2-2h4.9L4 10.9zm0 7.7L13.7 4h4.9L4 18.6zM20 18l-2 2h-4.9l6.9-6.9zm0-7.7L10.3 20H5.4L20 5.4z"
                />
              </svg>
              Zona de alto impacto (dados Furg)
            </li>
          </>
        )}
      </ul>
    </div>
  )
}
