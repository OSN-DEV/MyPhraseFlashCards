import React from 'react'

type HeaderType = {
  id: number,
  displayName: string,
  currentIndex: number
  totalCount: number,
}
const Header = (props: HeaderType) => {
  const {id, displayName, currentIndex, totalCount} = props;
  return(
    <header className="flex p-2 bg-cyan-500 text-white">
      <div className="grow">{displayName} - {id}</div>
      <div>{`${currentIndex}/${totalCount}`}</div>
    </header>
  )
}

export default Header;
